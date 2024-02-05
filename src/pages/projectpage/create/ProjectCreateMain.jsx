import React, { useEffect, useState } from 'react';
import { useHeaderMemory } from '../../../component/context/HeaderContext';
import styled from 'styled-components';
import { NavLink, Route, Routes, useParams } from 'react-router-dom';
import ProjectBasicCreate from './ProjectBasicCreate';
import ProjectPlanCreate from './ProjectPlanCreate';
import ProjectRewardCreate from './ProjectRewardCreate';
import ProjectDateplanCreate from './ProjectDateplanCreate';
import ProjectUserinfoCreate from './ProjectUserinfoCreate';
import { useProjectCreateMemory } from '../../../component/context/ProjectCreateContext';

const baseURL = process.env.REACT_APP_API_URL;

const StyledCreateMainDiv = styled.div`
    box-sizing: border-box;
    min-height: calc(100vh - 202px);
    background-color: #f5f5f5;
    & .createMainHeader {
        width: 100%;
        background-color: #fff;
        padding: 10px 0 40px;
        z-index: 9;
        & .inner {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            width: 1200px;
            margin: 0 auto;
            gap: 0 40px;
            & .img {
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;
                width: 200px;
                height: 133px;
                background-color: #ddd;
                & img {
                    max-width: 100%;
                    min-width: 100%;
                    min-height: 100%;
                }
            }
            & .titleBox {
                & .title {
                    font-size: 32px;
                    font-weight: 500;
                    color: #333;
                }
                & .category {
                    display: flex;
                    & * {
                        font-size: 14px;
                    }
                    & *:nth-child(1)::after {
                        content: "·";
                        margin: 0 5px;
                        color: #333;
                    }
                }
            }
        }
    }
    
    & .linkList {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        padding: 30px 0;
        gap: 10px;
        & > * {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: calc((100% / 5) - 40px);
            padding: 20px;
            box-sizing: border-box;
            background-color: #fff;
            border-radius: 5px;
            border: 1px solid transparent;
            font-size: 15px;
            font-weight: 500;
            color: #333;
            &:hover {
                border-color: #333;
            }
            & span {
                font-size: 13px;
                color: #999;
            }
        }
    }
`;

const ProjectCreateMain = () => {

    const { updatePageType } = useHeaderMemory();
    const { projectNo } = useParams();
    const [dataVo, setDataVo] = useState(); // 프로젝트 정보
    const {projectCreateData, setProjectCreateData} = useProjectCreateMemory(); // 컨텍스트 데이터

    // header type
    useEffect(() => {
        updatePageType('createMain');
    }, [updatePageType]);

    // 컨텍스트 데이터에 프로젝트 넘버 전달
    useEffect(() => {
        setProjectCreateData({
            ...projectCreateData,
            'mainVo': {
                'no': projectNo,
            },
        })
    }, []);

    useEffect(() => {
        // 데이터 불러오기
        fetch(`${baseURL}/project/create/main?no=${projectNo}`)
        .then(resp => resp.json())
        .then(data => {
            setDataVo(data);
        })
        ;
    }, []);

    return (
        <StyledCreateMainDiv>

            <div className="createMainHeader">
                <div className="inner">
                    <span className="img">
                        {dataVo? <img src={dataVo.mainVo.imageUrl} alt="프로젝트이미지" /> : ''}
                    </span>
                    <div className="titleBox">
                        <div className="title">
                            {dataVo ? dataVo.mainVo.title : ''}
                        </div>
                        <div className="category">
                            <span>{dataVo ? dataVo.mainVo.mainCategory : ''}</span>
                            <span>{dataVo ? dataVo.mainVo.subCategory : ''}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="linkList">
                <NavLink to={`../main/index/basic/${projectNo}`}>
                    기본정보
                    <span>{projectCreateData ? projectCreateData.basicPercent : 0}% 작성 완료</span>
                </NavLink>
                <NavLink to={`../main/index/plan/${projectNo}`}>
                    펀딩 계획
                    <span>{projectCreateData ? projectCreateData.planPercent : 0}% 작성 완료</span>
                </NavLink>
                <NavLink to={`../main/index/reward/${projectNo}`}>
                    선물 구성
                    <span>{projectCreateData ? projectCreateData.rewardPercent : 0}% 작성 완료</span>
                </NavLink>
                <NavLink to={`../main/index/dateplan/${projectNo}`}>
                    프로젝트 계획
                    <span>{projectCreateData ? projectCreateData.dateplanPercent : 0}% 작성 완료</span>
                </NavLink>
                <NavLink to={`../main/index/userinfo/${projectNo}`}>
                    창작자 정보
                    <span>{projectCreateData ? projectCreateData.userinfoPercent : 0}% 작성 완료</span>
                </NavLink>
            </div>
            <Routes>
                <Route path='../main/index/basic/:projectNo' element={<ProjectBasicCreate />} />
                <Route path='../main/index/plan/:projectNo' element={<ProjectPlanCreate />} />
                <Route path='../main/index/reward/:projectNo' element={<ProjectRewardCreate />} />
                <Route path='../main/index/dateplan/:projectNo' element={<ProjectDateplanCreate />} />
                <Route path='../main/index/userinfo/:projectNo' element={<ProjectUserinfoCreate />} />
            </Routes>
        </StyledCreateMainDiv>
        
    );
};

export default ProjectCreateMain;