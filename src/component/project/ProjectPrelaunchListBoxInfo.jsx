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

    & > .status {
        display: flex;
        justify-content: space-between;
        & > div:last-child{
            color: var(--red-color);
        }

    }
`;

const ProjectPrelaunchListBoxInfo = ({project}) => {
    
    const navigate = useNavigate();

    const handleBoxClick= () => {
        navigate("/project/detail/prelaunch/story/" + project.no);
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
            <div className='title' key={project.no}>
                {project.title}
            </div>
            <div className='status'>
                <div>공개 예정</div>
                <div>{project.startDateStr}</div>
            </div>
        </StyledProjectBoxInfoDiv>
    );
};

export default ProjectPrelaunchListBoxInfo;