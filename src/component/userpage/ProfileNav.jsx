import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import styled from 'styled-components';

const StyledProfileNavDiv = styled.div`
    width: 1200px;
    height: 56px;
    display: flex;
    margin-left: 20px;
    padding-top: 10px;
    gap: 40px;

    & > a {
        font-size: 18px;
        cursor: pointer;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        border-bottom: 2px solid transparent;

        &.active span {
            font-weight: 500;
            height: 56px;
            line-height: 56px;
            color: var(--black-color);
            border-bottom: 2px solid var(--red-color);
        }
    }
`;

const ProfileNav = () => {

    const {no} = useParams();
    const loginMemberVo = JSON.parse(sessionStorage.getItem('loginMemberVo'));

    return (
        <StyledProfileNavDiv>
            <NavLink to={`/userpage/profile/${no}`}><span>프로필 소개</span></NavLink>
            <NavLink to={`/userpage/created/${no}`}><span>올린 프로젝트</span></NavLink>
            {
                no === loginMemberVo?.no
                ?
                <NavLink to={`/userpage/backed/${no}`}><span>후원한 프로젝트</span></NavLink>
                :
                <></>
            }
            <NavLink to={`/userpage/review/${no}`}><span>프로젝트 후기</span></NavLink>
        </StyledProfileNavDiv>
    );
};

export default ProfileNav;