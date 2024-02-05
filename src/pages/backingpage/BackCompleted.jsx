import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const baseURL = process.env.REACT_APP_API_URL;

const StyledBackCompletedDiv = styled.div`
    height: 400px;
    font-size: 32px;
    display: flex; 
    flex-direction: column;
    align-items: center;
    margin-top: 100px;

    & > div {

        & > span {
            color: var(--red-color);
            font-weight: 500;
        }
    }
`;

const BackCompleted = () => {

    const {no} = useParams();

    // 유효성 체크 TODO
    // 후원하기를 거치지 않고 들어왔을 때 알람 띄우고 navigate


    const [nthBacker, setNthBacker] = useState('');

    useEffect(()=>{
        fetch(`${baseURL}/back/completed?no=` + no)
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            setNthBacker(data);
        });
        
    }, [])


    return (
        <StyledBackCompletedDiv>
            <div>축하합니다. <span>{nthBacker}</span> 번째</div>
            <div>공식후원자가 되셨습니다!</div>
        </StyledBackCompletedDiv>
    );
};

export default BackCompleted;