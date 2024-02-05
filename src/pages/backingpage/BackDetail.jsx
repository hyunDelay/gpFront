import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProjectBriefInfo from '../../component/project/ProjectBriefInfo';
import BackInfo from './BackInfo';
import { useParams } from 'react-router-dom';

const baseURL = process.env.REACT_APP_API_URL;

const StyledBackDetailDiv = styled.div`
    width: 1200px;
    margin: auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
`;

const BackDetail = () => {

    const {no} = useParams();
    const [backDetailVo, setBackDetailVo] = useState([]);

    useEffect(()=>{
        fetch(`${baseURL}/back/detail?no=` + no)
        .then(resp => resp.json())
        .then(data => {
            setBackDetailVo(data);
        })
    }, [])

    return (
        <StyledBackDetailDiv>
            <ProjectBriefInfo ProjectBriefInfo={backDetailVo}/>
            <BackInfo BackInfo={backDetailVo}/>
        </StyledBackDetailDiv>
    );
};

export default BackDetail;