import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const baseURL = process.env.REACT_APP_API_URL;

const StyledUserProfileDiv = styled.div`
    padding-left: 20px;

    & > div {
        height: 300px;
        display: flex;
        padding-top: 30px;
        font-size: 16px;
    }
`;

const UserProfile = () => {

    const {no} = useParams();

    const [profile, setProfile] = useState();

    useEffect(()=>{
        fetch(`${baseURL}/userpage?user=` + no)
        .then(resp => resp.text())
        .then(data => {
            console.log(data);
            setProfile(data);
        })
    }, [])

    return (
        <StyledUserProfileDiv>
            <div>{profile}</div>
        </StyledUserProfileDiv>
    );
};

export default UserProfile;