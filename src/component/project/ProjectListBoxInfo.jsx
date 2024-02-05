import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledProjectBoxInfoDiv = styled.div`
    width: calc(100% / 4 - 30px);
    cursor: pointer;
    margin-right: 25px;
    margin-bottom: 40px;

    & > div:first-child {
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        width: 100%;
        height: 200px;
        
        & > img{
            max-width: 100%;
            min-height: 100%;
        }
    }

    & > .category {
        padding-top: 10px;
        font-size: 12px;
        
        & > span {
            opacity: 0.95;
            padding-right: 10px;
            & > span{
                padding-left: 5px;
                padding-right: 5px;
                color: #adadad;
            }
        }
        & > div{
            margin-top: 5px;
            margin-bottom: 5px;
            font-weight: 500;
        }
    }

    & > .title {
        width: 100%;
        height: 40px;
        line-height: 30px;
        font-size: 16px;
        overflow: hidden;
        line-height: 20px;
        display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        margin-bottom: 10px;
    }

    & > .projectStatus {
        display: flex;
        justify-content: space-between;

        & > .achievement {

            & > #achievement_rate {
                font-size: 15px;
                font-weight: 900;
                padding-right: 5px;
                color: var(--red-color);
            }

            & > #achievement_amnt {
                font-size: 12px;
            }
        }

        & > .status {
            font-size: 13px;
        }
    }
`;

const ProjectListBoxInfo = ({project}) => {
    
    const navigate = useNavigate();

    const handleBoxClick= () => {
        navigate("/project/detail/story/" + project.no);
    }

    return (
        <StyledProjectBoxInfoDiv onClick={handleBoxClick}>
            <div>
                <img src={project.imageUrl} alt="프로젝트 대표 이미지"></img>
            </div>
            <div className='category'>
                <span>{project.mainCategory}<span>|</span>{project.subCategory}</span>
                <div>{project.memberName}</div>
            </div>
            <div className='title'>
                {project.title}
            </div>
            <div className='projectStatus'>
                <div className='achievement'>
                    <span id='achievement_rate'>{project.achievementRate}%</span>
                    <span id='achievement_amnt'>{project.currentAmount}원</span>
                </div>
                {project.remainingPeriod === "펀딩 종료" ? <div className='status'>{project.remainingPeriod}</div>:<div className='status'>{project.remainingPeriod}일 남음</div>}
                
            </div>
        </StyledProjectBoxInfoDiv>
    );
};

export default ProjectListBoxInfo;