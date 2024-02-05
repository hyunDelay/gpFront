import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const baseURL = process.env.REACT_APP_API_URL;

const StyledAllDiv = styled.div`
    width: 100%;
`;
const StyledStoryDiv = styled.div`
    width: 100%;
    & > ul{
        & > li:nth-child(2n){
            font-size: 19px;
            font-weight: 500;
            padding-top: 60px;
            padding-bottom: 60px;
        }
        & > li:last-child{
            padding-bottom: 100px;
        }
        & > li:nth-child(1){
            background-color: #4eb56b2b;
            padding: 20px;
            width: fit-content;
            margin-top: 40px;
            margin-bottom: 40px;
        }
    }
`;

const PrelaunchStoryPage = () => {

    const {no} = useParams();
    
    const [detailPrelaunchStoryVo, setDetailPrelaunchStoryVo] = useState([]);


    useEffect(()=>{
        fetch(`${baseURL}/project/detail/prelaunch/story?no=` + no)
        .then((resp)=>{return resp.json()})
        .then((data)=>{
            setDetailPrelaunchStoryVo(data);
        })
        .catch((e)=>{console.log("오류 : " + e);})
        ;
    }, [no]);

    useEffect(()=>{
        const txtDescriptionArea = document.querySelector(".txtDescriptionArea");
        const txtTeamArea = document.querySelector(".txtTeamArea");
        const txtItemArea = document.querySelector(".txtItemArea");
        txtDescriptionArea.innerHTML = detailPrelaunchStoryVo.txtDescription;
        txtTeamArea.innerHTML = detailPrelaunchStoryVo.txtTeam;
        txtItemArea.innerHTML = detailPrelaunchStoryVo.txtItem;
    }, [detailPrelaunchStoryVo]);

    return (
        <StyledAllDiv>
            <StyledStoryDiv>
                <ul>
                    <li>❗ 해당 프로젝트 정보는 미리 보기 용으로 상세 내용은 펀딩 시작 전 변경될 수 있습니다.</li>
                    <li>| 프로젝트 소개</li>
                    <li className='txtDescriptionArea'>{detailPrelaunchStoryVo.txtDescription}</li>
                    <li>| 팀 소개</li>
                    <li className='txtTeamArea'>{detailPrelaunchStoryVo.txtTeam}</li>
                    <li>| 선물 설명</li>
                    <li className='txtItemArea'>{detailPrelaunchStoryVo.txtItem}</li>
                </ul>
            </StyledStoryDiv>
        </StyledAllDiv>
    );
};

export default PrelaunchStoryPage;