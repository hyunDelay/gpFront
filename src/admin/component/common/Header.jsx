import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledHeader = styled.header`
    display: flex;
    position: sticky;
    top: 0;
    left: 0;
    background-color: #fff;
    justify-content: flex-end;
    align-items: center;
    gap: 20px;
    box-shadow: 0 .15rem 1.75rem 0 rgba(58,59,69,.15);
    padding: 10px 20px;
    box-sizing: border-box;
    z-index: 10;
    & .txt {
        display: flex;
        font-size: 14px;
        & span {
            font-weight: 600;
            margin-right: 3px;
        }
    }
    & button {
        font-size: 13px;
    }
`;

const Header = () => {

    const navigate = useNavigate();
    const [adminMember, setAdminMember] = useState();

    useEffect(() => {
        // 로그인 체크
        if(!sessionStorage.getItem('adminMember')){
            alert('로그인 후 이용하실 수 있습니다.');
            navigate('/admin');
        }
        setAdminMember(JSON.parse(sessionStorage.getItem('adminMember')));
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem('adminMember');
        navigate('/admin');
    }

    return (
        <StyledHeader>
            <div className="txt">
                <span>{adminMember ? adminMember.name : ''}</span>님 환영합니다.
            </div>
            <Button variant="secondary" onClick={handleLogout}>로그아웃</Button>
        </StyledHeader>
    );
};

export default Header;