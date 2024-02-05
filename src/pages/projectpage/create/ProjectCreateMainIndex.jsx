import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { NavLink, useParams } from 'react-router-dom';
import ProjectBasicCreate from './ProjectBasicCreate';
import ProjectDateplanCreate from './ProjectDateplanCreate';
import ProjectRewardCreate from './ProjectRewardCreate';
import ProjectUserinfoCreate from './ProjectUserinfoCreate';
import ProjectPlanCreate from './ProjectPlanCreate';
import { useHeaderMemory } from '../../../component/context/HeaderContext';
import { useProjectCreateMemory } from '../../../component/context/ProjectCreateContext';

const baseURL = process.env.REACT_APP_API_URL;

const StyledCreateBasicIndexDiv = styled.div`
    box-sizing: border-box;
    min-height: calc(100vh - 202px);
    background-color: #f5f5f5;
    & .createMainHeader {
        width: 100%;
        background-color: #fff;
        & .inner {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            width: 1200px;
            margin: 0 auto;
            gap: 0 40px;
            & .titleBox {
                width: 100%;
                & .title {
                    padding: 0 0 20px;
                    font-size: 28px;
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
            & .linkList {
                display: flex;
                gap: 10px;
                & * {
                    display: flex;
                    padding: 20px 10px;
                    border-bottom: 2px solid transparent;
                    font-size: 14px;
                    font-weight: 500;
                    color: #333;
                    &.active {
                        border-color: #333;
                    }
                }
            }
        }
    }
`;

const ProjectCreateMainIndex = () => {
    const { updatePageType } = useHeaderMemory();
    const { projectNo, temp } = useParams();
    const [projectTitle, setProjectTitle] = useState();
    const { IsProjectInputChange, setIsProjectInputChange, setHeaderFormVo } = useProjectCreateMemory(); // 컨텍스트 데이터

    // header type
    useEffect(() => {
        updatePageType('createMain');
    }, [updatePageType]);

    // 데이터 불러오기
    useEffect(() => {
        fetch(`${baseURL}/project/create/main?no=${projectNo}`)
        .then(resp => resp.json())
        .then(data => {
            setProjectTitle(data.mainVo.title);
        })
        ;
    }, []);

    // NavLink를 클릭할 때 호출되는 함수
    const handleNavLinkClick = (e) => {

        // 작성 중인 내용이 있다면 경고창 띄우기
        if (IsProjectInputChange) {
            const confirmResult = window.confirm('작성 중인 내용이 있습니다. 정말로 이동하시겠습니까?');
            // 사용자가 확인을 선택한 경우에만 페이지 이동
            if (confirmResult) {
                setIsProjectInputChange(false); // 이동 시 false로 바꿔줌
            } else {
                // 사용자가 취소를 선택한 경우, 페이지 이동을 취소
                e.preventDefault();
                return;
            }
        }
        
        setHeaderFormVo({}); // headerFormVo 초기화
    };

    return (
        <StyledCreateBasicIndexDiv>
            <div className="createMainHeader">
                <div className="inner">
                    <div className="titleBox">
                        <div className="title">{projectTitle ? projectTitle : ''}</div>
                    </div>
                    <div className="linkList">
                        <NavLink to={`../main/index/basic/${projectNo}`} onClick={handleNavLinkClick}>기본정보</NavLink>
                        <NavLink to={`../main/index/plan/${projectNo}`} onClick={handleNavLinkClick}>펀딩 계획</NavLink>
                        <NavLink to={`../main/index/reward/${projectNo}`} onClick={handleNavLinkClick}>선물 구성</NavLink>
                        <NavLink to={`../main/index/dateplan/${projectNo}`} onClick={handleNavLinkClick}>프로젝트 계획</NavLink>
                        <NavLink to={`../main/index/userinfo/${projectNo}`} onClick={handleNavLinkClick}>창작자 정보</NavLink>
                    </div>
                </div>
            </div>
            {temp === 'basic' ? <ProjectBasicCreate /> : null}
            {temp === 'plan' ? <ProjectPlanCreate /> : null}
            {temp === 'reward' ? <ProjectRewardCreate /> : null}
            {temp === 'dateplan' ? <ProjectDateplanCreate /> : null}
            {temp === 'userinfo' ? <ProjectUserinfoCreate /> : null}
        </StyledCreateBasicIndexDiv>
    );
};

export default ProjectCreateMainIndex;