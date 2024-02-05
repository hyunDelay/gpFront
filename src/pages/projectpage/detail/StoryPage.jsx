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
        & > li:nth-child(2n+1){
            font-size: 19px;
            font-weight: 500;
            padding-top: 60px;
            padding-bottom: 60px;
        }
        & > li:last-child{
            padding-bottom: 100px;
        }
    }
`;

const StoryPage = () => {

    const { no }= useParams();

    const [detailStoryVo, setDetailStoryVo] = useState([]);


    useEffect(()=>{
        fetch(`${baseURL}/project/detail/story?no=` + no)
        .then((resp)=>{return resp.json()})
        .then((data)=>{
            setDetailStoryVo(data);
        })
        .catch((e)=>{console.log("오류 : " + e);})
        ;
    }, [no]);

    useEffect(()=>{
        const txtDescriptionArea = document.querySelector(".txtDescriptionArea");
        const txtBudgetArea = document.querySelector(".txtBudgetArea");
        const txtScheduleArea = document.querySelector(".txtScheduleArea");
        const txtTeamArea = document.querySelector(".txtTeamArea");
        const txtItemArea = document.querySelector(".txtItemArea");
        txtDescriptionArea.innerHTML = detailStoryVo.txtDescription;
        txtBudgetArea.innerHTML = detailStoryVo.txtBudget;
        txtScheduleArea.innerHTML = detailStoryVo.txtSchedule;
        txtTeamArea.innerHTML = detailStoryVo.txtTeam;
        txtItemArea.innerHTML = detailStoryVo.txtItem;
    }, [detailStoryVo]);


    return (
        <StyledAllDiv>
            <StyledStoryDiv>
                <ul>
                    <li>| 프로젝트 소개</li>
                    <li className='txtDescriptionArea'></li>
                    <li>| 프로젝트 예산</li>
                    <li className='txtBudgetArea'></li>
                    <li>| 프로젝트 일정</li>
                    <li className='txtScheduleArea'></li>
                    <li>| 팀 소개</li>
                    <li className='txtTeamArea'></li>
                    <li>| 선물 설명</li>
                    <li className='txtItemArea'></li>
                </ul>
            </StyledStoryDiv>
        </StyledAllDiv>
    );
};

export default StoryPage;