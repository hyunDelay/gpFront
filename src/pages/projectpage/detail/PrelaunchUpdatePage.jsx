import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const baseURL = process.env.REACT_APP_API_URL;

const StyledAllDiv = styled.div`
    width: 100%;
`;
const StyledUpdateDiv = styled.div`
    height: 700px;
    margin-top: 20px;

    //업데이트 없을때
    .communityNull{
        border: none;
        height: 400px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        & > div:first-child{
            background-color: #e6e6e6;
            width: 70px;
            height: 70px;
            border-radius: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            & > svg{
                width: 40px;
                height: 40px;
                filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(288deg) brightness(102%) contrast(102%);
            }
        }
        & > div:last-child{
            color: #e6e6e6;
            margin-top: 10px;
        }
    }

    & > div{
        border-bottom: 1px solid #ebebeb;
        padding-top: 40px;
        margin: 15px;
        & > ul{
            margin-right: 20px;
            & > li:nth-child(1){
                display: flex;
                margin-bottom: 20px;
                & > div:nth-child(1){
                    width: 40px;
                    height: 40px;
                    font-size: 5px;
                    margin-right: 20px;
                    & > img{
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        border-radius: 50px;
                    }
                }
            }
        }
    }
`;
/////////////////////////////////////////////////////////////////////////////
const PrelaunchUpdatePage = () => {

    const {no} = useParams();

    const [detailPrelaunchUpdateVoList, setDetailPrelaunchUpdateVoList] = useState([]);
    const [detailCntVo, setDetailCntVo] = useState([]);

    useEffect(()=>{
        fetch(`${baseURL}/project/detail/prelaunch/update?no=` + no)
        .then((resp)=>{return resp.json()})
        .then((data)=>{
            setDetailPrelaunchUpdateVoList(data.voList);
            setDetailCntVo(data.detailCntVo);
        })
        .catch((e)=>{console.log("오류 : " + e);})
        ;
    }, [no]);

    return (
        <StyledAllDiv>
            <StyledUpdateDiv>
                {
                    detailPrelaunchUpdateVoList.length === 0
                    ?
                    <div className='communityNull'>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
                                <path d="m22.75,9.693c.806.914,1.25,2.088,1.25,3.307v5c0,2.757-2.243,5-5,5H5c-2.757,0-5-2.243-5-5v-5c0-2.757,2.243-5,5-5h4c.553,0,1,.448,1,1s-.447,1-1,1h-4c-1.654,0-3,1.346-3,3v5c0,1.654,1.346,3,3,3h14c1.654,0,3-1.346,3-3v-5c0-.731-.267-1.436-.75-1.984-.365-.414-.326-1.046.089-1.412.413-.364,1.045-.326,1.411.088ZM5,15.5c0,.828.672,1.5,1.5,1.5s1.5-.672,1.5-1.5-.672-1.5-1.5-1.5-1.5.672-1.5,1.5Zm6.5,1.5c.828,0,1.5-.672,1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5,1.5.672,1.5,1.5,1.5Zm.5-6v-1.586c0-1.068.416-2.073,1.172-2.828L18.879.879c1.17-1.17,3.072-1.17,4.242,0,.566.566.879,1.32.879,2.121s-.313,1.555-.879,2.122l-5.707,5.707c-.755.755-1.76,1.172-2.828,1.172h-1.586c-.553,0-1-.448-1-1Zm2-1h.586c.534,0,1.036-.208,1.414-.586l5.707-5.707c.189-.189.293-.44.293-.707s-.104-.518-.293-.707c-.391-.391-1.023-.39-1.414,0l-5.707,5.707c-.372.373-.586.888-.586,1.414v.586Z"/>
                            </svg>
                        </div>
                        <div>
                        게시글이 없습니다.
                        </div>
                    </div>
                    :
                    detailPrelaunchUpdateVoList.map((vo)=>{
                        return (
                        <div key={vo.no}>
                            <ul>
                                <li>
                                    <div>
                                        <img src={vo.memberPic} alt="프로필 이미지" />
                                    </div>
                                    <div>
                                        <div>{vo.memberName}</div>
                                        <div>{vo.enrollDate}</div>
                                    </div>
                                </li>
                                <li>
                                    <div>{vo.content}</div>
                                </li>
                            </ul>
                        </div>
                        );
                    })
                }
            </StyledUpdateDiv>
        </StyledAllDiv>
    );
};

export default PrelaunchUpdatePage;