import React, { useEffect, useState } from 'react';
import CommunityPage from "./CommunityPage";
import StoryPage from "./StoryPage";
import UpdatePage from "./UpdatePage";
import { Link, NavLink, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useUserMemory } from '../../../component/context/UserContext';
import UpdateCreatePage from './UpdateCreatePage';

const baseURL = process.env.REACT_APP_API_URL;

const StyledAllDiv = styled.div`
    width: 100%;
    .inner {
        width: 1200px;
        margin: 0 auto;
    }
`;
const StyledProjectDetailDiv = styled.div`
    display: flex;
    flex-direction: column;
    height: auto;
    margin-bottom: 40px;
    & .inner div:nth-child(1){
        width: 100%;
        margin-top: 10px;
        & > div{
            display: flex;
            justify-content: center;
            align-items: center;
            & > div{
                width: auto;
                background-color: #a1a1a115;
                border: 0.5px solid #8888886a;
                border-radius: 4px;
                padding: 7px;
                font-size: 14px;
            }
        }
        & > h1{
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 20px;
        }
    }
    & .inner div:nth-child(2){
        padding-top: 50px;
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 3fr 2fr;
        grid-template-rows: 1fr;
        & > span{
            width: 100%;
            height: 100%;
            background-color: var(--red-color);
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
            & > li:nth-child(2n){
                font-size: 40px;
                margin-bottom: 25px;
                margin-top: 5px;
                & > span{
                    font-size: 16px;
                }
                & > span:nth-child(2){
                    font-size: 20px;
                    margin-left: 13px;
                }
                
            }
            & > li > table{
                margin-top: 25px;
                width: 100%;
                border-top: 1px solid #ececec;
                
                & > tbody > tr > td:nth-child(2){
                    padding-left: 25px;
                    padding-top: 8px;
                }
                & > tbody > tr:nth-child(2){
                    & > td > span{
                        border-radius: 5px;
                        background-color: #f05a5a1a;
                        padding-left: 5px;
                        padding-right: 5px;
                        margin-left: 5px;
                        color: var(--red-color);
                    }
                }
            }
            & > li button{
                width: 100%;
                height: 60px;
                font-size: 18px;
                color: white;
                background-color: var(--red-color);
                font-weight: 500;
                border-radius: 5px;
                margin-top: 40px;
                cursor: pointer;
            }
            & > li:last-child{
                margin: 0px;
            }
        }
    }
`;
const StyledProjectDetailNaviDiv = styled.div`
    width: 100%;
    border-top: 1px solid #ececec;
    border-bottom: 1px solid #ececec;
    height: 40px;
    display: flex;
    align-items: center;
    position: sticky;
    top: 126px;
    z-index: 8;
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
const StyledProjectSelectDiv = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    height: 2200px;
    & > div{
        width: 1200px;
        display: grid;
        grid-template-rows: 1fr;
        grid-template-columns: 7fr 3fr;
        & > div:first-child{
            height: 1200px;
        }
        & > div:last-child{
            width: 100%;
            height: auto;
            & > div:first-child{
                // 창작자 소개 상자
                border: 1px solid #d6d6d6;
                border-radius: 5px;
                padding: 25px;
                margin-top: 60px;
                height: fit-content;
                margin-bottom: 20px;
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
                            border-radius: 50px;
                        }
                    }
                    & > span{
                        font-weight: 500;
                        margin-left: 40px;
                    }
                }
            }
            & > div:last-child{
                //리워드 공간
                width: 100%;
                
                & > button{
                    background-color: white;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    //리워드 박스
                    border: 1px solid #d6d6d6;
                    border-radius: 5px;
                    padding: 25px;
                    margin-bottom: 10px;
                    cursor: pointer;
                    & > div:first-child{
                        //가격부분
                        font-size: 23px;
                        font-weight: 500;
                        margin-bottom: 7px;
                    }
                    & > div:nth-child(2) {
                        text-align: left;
                        word-break: keep-all;
                    }
                }
                .select{
                    border: 1px solid var(--red-color);
                    border-radius: 5px;
                    color: var(--red-color);
                }
            }
        }
    }
`;


const DetailMain = () => {

    //회원번호
    const {loginMemberVo} = useUserMemory();

    const {temp, no} = useParams();
    const [detailVo, setDetailVo] = useState([]);
    const [rewardVoList, setRewardVoList] = useState([]);
    const [selectReward, setSelectReward] = useState();
    const [detailCntVo, setDetailCntVo] = useState([]);    
    const [loginMemberRewardList, setLoginMemberRewardList] = useState();

    
    useEffect(()=>{
        fetch(`${baseURL}/project/detail?no=` + no)
        .then((resp)=>{return resp.json()})
        .then((data)=>{
            setDetailCntVo(data.detailCntVo);
            setDetailVo(data.detailVo);
            setRewardVoList(data.detailVo.rewardVoList);
            console.log(data.detailVo);
        })
        .catch((e)=>{console.log("오류1 : " + e);})
    }, [no, temp]);

    useEffect(()=>{
        if(loginMemberVo){
            fetch(`${baseURL}/project/detail/check?no=` + loginMemberVo.no)
            .then(resp=>resp.json())
            .then(data=>{
                console.log(data.rewardVoList);
                for (let index = 0; index < data.rewardVoList.length; index++) {
                    if(data.rewardVoList[index].projectNo === detailVo.no){
                        setLoginMemberRewardList(true);
                        console.log(index);
                    }

                }
                console.log(loginMemberRewardList);
            })
        }
    }, [loginMemberVo, detailVo])


    //선택한 선물 색변경
    const handleRewardClick = (rewardNo, e)=>{
        setSelectReward(rewardNo);
        const rewardList= document.querySelectorAll(".reward");
        rewardList.forEach((e)=>{
            e.classList.remove("select");
        })
        e.currentTarget.classList.add("select");
    }
    
    const handleSupport = ()=>{
        return '/back/process/' + no + '/' + selectReward;
    }

    return (
        <StyledAllDiv>
            <StyledProjectDetailDiv>
                <div className="inner">
                    <div>
                        <div><div><Link to={`/project/list/category/${detailVo.categoryNo}`}>{detailVo.subCategory}</Link></div></div>
                        <h1>{detailVo.title}</h1>
                    </div>            
                    <div>
                        <span><img src={detailVo.imageUrl} alt="프로젝트 대표 이미지" /></span>
                        <ul>
                            <li>모인금액</li>
                            <li>{detailVo.currentAmount} <span>원</span><span>{detailVo.achievementRate}%</span></li>
                            <li>남은시간</li>
                            {detailVo.remainingPeriod === "펀딩 종료" ? <li>{detailVo.remainingPeriod}</li> : <li>{detailVo.remainingPeriod} <span>일</span></li>}
                            <li>후원자</li>
                            <li>{detailVo.totalBackerNo} <span>명</span></li>
                            <li>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>목표금액</td>
                                            <td>{detailVo.goalAmount}원</td>
                                        </tr>
                                        <tr>
                                            <td>펀딩 기간</td>
                                            <td>{detailVo.startDateStr} ~ {detailVo.endDateStr} {detailVo.remainingPeriod === "펀딩 종료" ? <span>{detailVo.remainingPeriod}</span>:<span>{detailVo.remainingPeriod}일남음</span>}</td>
                                        </tr>
                                        <tr>
                                            <td>결제</td>
                                            <td>목표금액 달성시 {detailVo.calDate}에 결제 진행</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </li>
                            <li>
                                {
                                detailVo.remainingPeriod === "펀딩 종료"
                                ?
                                <button>후원 종료</button>
                                :
                                !loginMemberVo
                                ?
                                <Link to='/login'><button>로그인 후 이용 가능</button></Link>
                                :
                                loginMemberVo.no ===  detailVo.memberNo
                                ?
                                null
                                :
                                loginMemberRewardList
                                ?
                                <button>이미 후원한 프로젝트입니다.</button>
                                :
                                selectReward
                                ?
                                <Link to={handleSupport()}><button>이 프로젝트 후원하기</button></Link>
                                :
                                <button>이 프로젝트 후원하기</button>
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            </StyledProjectDetailDiv>
            <StyledProjectDetailNaviDiv>
                <div className="inner">
                    <div>
                        <span><NavLink to={`/project/detail/story/${no}`}>프로젝트 계획</NavLink></span>
                        <span><NavLink to={`/project/detail/update/${no}`}>업데이트<span className='cnt'>{detailCntVo.updateCnt==="0"?null:detailCntVo.updateCnt}</span></NavLink></span>
                        <span><NavLink to={`/project/detail/community/${no}`}>커뮤니티<span className='cnt'>{detailCntVo.communityCnt==="0"?null:detailCntVo.communityCnt}</span></NavLink></span>
                    </div>
                </div>
            </StyledProjectDetailNaviDiv>
            <StyledProjectSelectDiv>
                <div>
                    {temp === 'story' ? <StoryPage/> : null}
                    {temp === 'update' ? <UpdatePage/> : null}
                    {temp === 'community' ? <CommunityPage/> : null}
                    {temp === 'createUpdate' ? <UpdateCreatePage/>:null}
                    <div>
                        <div>
                            <div>창작자 소개</div>
                            <div>
                                <div><Link to={`/userpage/created/${detailVo.memberNo}`}><img src={detailVo.memberPic} alt="창작자 프로필 이미지" /></Link></div>
                                <span><Link to={`/userpage/created/${detailVo.memberNo}`}>{detailVo.memberName}</Link></span>
                            </div>
                            <div>
                                {detailVo.memberIntro}
                            </div>
                        </div>
                        <div>
                        {
                            detailVo.remainingPeriod === "펀딩 종료"
                            ?
                            null
                            :
                            rewardVoList.map((vo)=>{
                                return(
                                    <button key={vo.no} onClick={
                                        !loginMemberVo
                                        ?
                                        null
                                        :
                                        loginMemberVo.no === detailVo.memberNo
                                        ?
                                        null
                                        :
                                        loginMemberRewardList
                                        ?
                                        null
                                        :
                                        (e)=>{handleRewardClick(vo.no, e)}
                                        } className='reward'>
                                        <div>{vo.amount}원 + </div>
                                        <div>{vo.name}</div>
                                    </button>
                                );
                            })
                        }
                        </div>
                    </div>
                </div>
            </StyledProjectSelectDiv>
        </StyledAllDiv> 
    );
};

export default DetailMain;