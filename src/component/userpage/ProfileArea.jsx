import React from 'react';
import styled from 'styled-components';
import {useUserPageContext} from '../context/UserPageContext';
import { useNavigate } from 'react-router-dom';

const StyledProfileAreaDiv = styled.div`
    width: 1200px;
    height: 80px;
    display: flex;
    align-items: center;
    padding-top: 10px;
    padding-left: 30px;
    padding-bottom: 20px;

    & > img {
        width: 80px;
        height: 80px;
        border-radius: 80px;
        object-fit: cover;
    } 

    & > .nick_area {
        padding-left: 20px;

        & > #nick {
            font-size: 20px;
        }

        & > button {
            padding: 5px 8px;
            margin-top: 8px;
            cursor: pointer;
            border-radius: 5px;
            border: 1px solid var(--red-color);
            background-color: white;
            color: var(--red-color);
        }
    }
`;

const ProfileArea = () => {

    const {profileVo} = useUserPageContext();
    const navigate = useNavigate();

    // 계정관리로 페이지 이동
    const handleBtnClick = () => {
        navigate('/settings');
    }


    return (
        <StyledProfileAreaDiv>
            {
                profileVo !== undefined && profileVo !== null
                ?
                <>
                <img src={profileVo.pic} alt="Profile" />
                <div className='nick_area'>
                    <div id='nick'>{profileVo.name}</div>
                    <button onClick={handleBtnClick}>계정 관리</button>
                </div>
                </>
                :
                <></>
            }
        </StyledProfileAreaDiv>
    );    
    
};

export default ProfileArea;