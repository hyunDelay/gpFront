import React, { useState } from 'react';
import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import styled from 'styled-components';
import logoImage from '../../assets/images/logo_big.svg';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../../../component/common/Loading';

const baseURL = process.env.REACT_APP_API_URL;

const StyledAdminLoginDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #333;

    & .wrap {
        display: flex;
        flex-direction: column;
        width: 400px;
        
        & form {
            display: flex;
            flex-direction: column;
            gap: 10px;
            & button {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 50px;
                border-radius: 5px;
                border: none;
                font-size: 16px;
                font-weight: 500;
                color: #fff;
                cursor: pointer;
                margin-top: 40px;
            }
        }
        & .title {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 40px;
            & h1 {
                background: url(${logoImage}) no-repeat center;
                text-indent: -9999em;
                width: 195px;
                height: 71px;
                padding: 20px;
            }
            & h2 {
                font-size: 20px;
                font-weight: 500;
                margin-top: 20px;
                color: #fff;
            }
        }
    }
`;

const AdminLogin = () => {

    const [formData, setFormData] = useState({}); // form데이터
    const [loading, setLoading] = useState(false); // 로딩중
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    }

    const handleLogin = (e) => {
        e.preventDefault();

        // 빈값 검증
        if(!formData.id || formData.id === ''){
            alert('아이디를 입력해주세요.');
            return;
        }
        if(!formData.pwd || formData.pwd === ''){
            alert('비밀번호를 입력해주세요.');
            return;
        }

        setLoading(true); // 로딩중 화면 표시
        fetch(`${baseURL}/admin/login`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
        })
        .then(resp => {
            if (!resp.ok) {
                throw new Error('로그인에 실패했습니다.');
            }
            return resp.json();
        })
        .then(data => {
            if (data === null) {
                throw new Error('로그인에 실패했습니다.');
            }
            sessionStorage.setItem('adminMember', JSON.stringify(data));
            navigate('category');
        })
        .catch((e) => {
            alert(e.message);
        })
        .finally(() => {
            setLoading(false); // 로딩 끝
        });
        ;
    }

    return (
        <StyledAdminLoginDiv>
            <div className='wrap'>
                <div className='title'>
                    <Link to=''><h1>로고</h1></Link>
                    <h2>관리자 로그인</h2>
                </div>
                <Form onSubmit={handleLogin}>

                    <FloatingLabel label="Id" className="mb-1">
                        <Form.Control type="Id" name='id' placeholder="Id" onChange={handleInputChange} />
                    </FloatingLabel>
                    <FloatingLabel label="Password">
                        <Form.Control type="password" name='pwd' placeholder="Password" onChange={handleInputChange}  />
                    </FloatingLabel>
                    <Button type="submit" variant="primary">로그인</Button>
                </Form>
            </div>
            {loading ? <Loading/> : ''}
        </StyledAdminLoginDiv>
    );
};

export default AdminLogin;