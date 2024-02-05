import React, { useEffect, useState } from 'react';
import ProjectBoxInfo from '../../component/project/ProjectBoxInfo';
import styled from 'styled-components';
import {useUserMemory} from '../../component/context/UserContext';
import { useParams } from 'react-router-dom';

const baseURL = process.env.REACT_APP_API_URL;

const StyledUserCreatedDiv = styled.div`
        padding-left: 20px;

        & > #cnt {
            height: 80px;
            line-height: 80px;
            color: var(--black-color);
            
            & > span {
                color: var(--red-color);
                font-weight: 500;
                margin-right: 3px;
                margin-left: 3px;
            }
        }

        & > #project_items {
            width: 1050px;
            display: flex;
            flex-wrap: wrap;
        }
`;

const UserCreated = () => {

    const {loginMemberVo} = useUserMemory();

    const [projectsCnt, setProjectsCnt] = useState(0);
    const [myProjectsList, setMyProjectsList] = useState([]);
    const {no} = useParams();

    useEffect(()=>{
        let matchYn;

        loginMemberVo?.no === no ? matchYn = 'y' : matchYn = 'n';

        fetch(`${baseURL}/userpage/created?user=` + no + "&yn=" + matchYn)
        .then(resp => resp.json())
        .then(data => {
            setMyProjectsList(data.myProjectsList);
            setProjectsCnt(data.projectsCnt);
        });    
    }, [projectsCnt])

    return (
        <StyledUserCreatedDiv>
            {
                projectsCnt === 0
                ?
                <></>
                :
                <>
                    <div id="cnt">프로젝트가 <span>{projectsCnt}</span>개 있습니다.</div>
                    <div id="project_items">
                        {
                            myProjectsList.map((vo) => {
                                return <ProjectBoxInfo key={vo.projectNo} no={3} project={vo}/>
                            })
                        }
                    </div>
                </>
                
            }
            
        </StyledUserCreatedDiv>
    );
};

export default UserCreated;