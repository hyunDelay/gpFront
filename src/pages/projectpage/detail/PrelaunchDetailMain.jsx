import React, { useEffect, useState } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import PrelaunchStoryPage from "./PrelaunchStoryPage";
import PrelaunchUpdatePage from "./PrelaunchUpdatePage";
import styled from 'styled-components';

const baseURL = process.env.REACT_APP_API_URL;

//////////////////////////////////////////////////
const PrelaunchStyledAllDiv = styled.div`
    width: 100%;
    .inner {
        width: 1200px;
        margin: 0 auto;
    }
`;
const PrelaunchStyledProjectDetailDiv = styled.div`
    display: flex;
    flex-direction: column;
    height: auto;
    margin-bottom: 40px;
    & .inner div:nth-child(1){
        padding-top: 50px;
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 3fr 2fr;
        grid-template-rows: 1fr;
        & > span {
            width: 100%;
            height: 100%;
            & > img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        & > ul{
            width: 100%;
            height: 550px;
            margin-left: 30px;
            & > li:nth-child(2){
                font-size: 35px;
                font-weight: 500;
                margin-bottom: 20px;
            }
            & > li > table{
                width: 100%;
                & > tbody > tr > td:nth-child(1){
                    width: 80px;
                }
                & > tbody > tr > td:nth-child(2){
                    padding-top: 8px;
                }
            }
            & > li:last-child{
                margin: 0px;
            }
        }
    }
`;
const PrelaunchStyledProjectDetailNaviDiv = styled.div`
    width: 100%;
    border-top: 1px solid #ececec;
    border-bottom: 1px solid #ececec;
    height: 50px;
    display: flex;
    align-items: center;
    position: sticky;
    top: 126px;
    z-index: 9;
    background-color: #fff;
    & > div {
        & > div{
            width: 100%;
            display: flex;
            place-items: left center;
            font-size: 16px;
            & > span{
                padding-left: 5px;
                padding-right: 25px;
                & > a{
                    color: lightgray;
                    &.active{
                        font-weight: 500;
                        color: #333;
                    }
                }
            }

        }
    }
    .cnt{
        margin-left: 5px;
        font-size: 12px;
        vertical-align: top;
    }
`;
const PrelaunchStyledProjectSelectDiv = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    & > div{
        width: 1200px;
        display: grid;
        grid-template-rows: 1fr;
        grid-template-columns: 7fr 3fr;
        & > div:last-child{
            border: 1px solid #d6d6d6;
            border-radius: 5px;
            padding: 25px;
            margin-top: 60px;
            height: fit-content;
            & > div:first-child{
                font-size: 18px;
                font-weight: 500;
                margin-bottom: 20px;
            }
            & > div:nth-child(2){
                display: flex;
                align-items: center;
                margin-bottom: 10px;
                & > div{
                    width: 40px;
                    height: 40px;
                    font-size: 5px;
                    &  img{
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }
                & > span{
                    font-weight: 500;
                    margin-left: 40px;
                }
            }
        }
    }
`;
//////////////////////////////////////////////////

const PrelaunchDetailMain = () => {
    const {temp, no} = useParams();

    const [detailPrelaunchVo, setDetailPrelaunchVo] = useState([]);
    const [detailCntVo, setDetailCntVo] = useState([]);


    useEffect(()=>{
        fetch(`${baseURL}/project/detail/prelaunch?no=`+no)
        .then((resp)=>{return resp.json()})
        .then((data)=>{
            setDetailPrelaunchVo(data.detailVo);
            setDetailCntVo(data.detailCntVo);
        })
        .catch((e)=>{console.log("오류 : " + e);})
        ;
    }, [no]);






    return (
        <PrelaunchStyledAllDiv>
            <PrelaunchStyledProjectDetailDiv>
                <div className="inner">
                    
                    <div>
                        <span>
                            <img src={detailPrelaunchVo.imageUrl} alt="프로젝트 대표 이미지" />
                        </span>
                        <ul>
                            <li>{detailPrelaunchVo.subCategory}</li>
                            <li>{detailPrelaunchVo.title}</li>
                            <li>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>목표금액</td>
                                            <td>{detailPrelaunchVo.goalAmount}원</td>
                                        </tr>
                                        <tr>
                                            <td>공개예정</td>
                                            <td>{detailPrelaunchVo.startDate}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </li>
                        </ul>
                    </div>
                </div>
            </PrelaunchStyledProjectDetailDiv>
            <PrelaunchStyledProjectDetailNaviDiv>
                <div className="inner">
                    <div>
                        <span><NavLink to={`/project/detail/prelaunch/story/${no}`}>프로젝트 계획</NavLink></span>
                        <span><NavLink to={`/project/detail/prelaunch/update/${no}`}>업데이트<span className='cnt'>{detailCntVo.updateCnt === "0"?null:detailCntVo.updateCnt}</span></NavLink></span>
                    </div>
                </div>
            </PrelaunchStyledProjectDetailNaviDiv>
            <PrelaunchStyledProjectSelectDiv>
                <div>
                    {temp === 'story' ? <PrelaunchStoryPage/> : null}
                    {temp === 'update' ? <PrelaunchUpdatePage/> : null}
                    <div>
                        <div>창작자 소개</div>
                        <div>
                            <div><Link to={`/userpage/created/${detailPrelaunchVo.memberNo}`}><img src={detailPrelaunchVo.memberPic} alt="창작자 프로필 이미지" /></Link></div>
                            <span><Link to={`/userpage/created/${detailPrelaunchVo.memberNo}`}>{detailPrelaunchVo.memberName}</Link></span>
                        </div>
                        <div>
                            {detailPrelaunchVo.memberIntro}
                        </div>
                    </div>
                </div>
            </PrelaunchStyledProjectSelectDiv>
        </PrelaunchStyledAllDiv>
    );
};

export default PrelaunchDetailMain;