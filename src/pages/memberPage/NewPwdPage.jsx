import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoImage from '../../assets/images/logo_big.svg';
import styled from 'styled-components';
import InpText from './input/InpText';
import InpTextNon from './input/InpTextNon';
import Loading from '../../component/common/Loading';

const baseURL = process.env.REACT_APP_API_URL;

const StyledNewPwdPageDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f5f5f5;

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
                background-color: var(--red-color);
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
            }
        }
        & .otherLink {
            display: flex;
            flex-direction: column;
            font-size: 13px;
            color: #666;
            margin-top: 20px;
            & span a {
                color: var(--red-color);
                margin-left: 5px;
                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
`;

const NewPwdPage = () => {

    const [formVo, setFormVo] = useState({});
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    
    const handleNewPwd = (e) => {
        e.preventDefault();
        
        setLoading(true); // 로딩중 화면 표시
        fetch(`${baseURL}/resetPassword`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formVo),
        })
        .then(resp => resp.json())
        .then(data => {
            if (data.msg === 'good') {
                alert('비밀번호 변경이 완료되었습니다.');
                navigate('/');
            } else {
                throw new Error(data.badMsg);
            }
        })
        .catch(error => {
            alert(error.message);
        })
        .finally(() => {
            setLoading(false); // 로딩중 화면 끝
        })
        ;
    }

    // 토큰 FormVo에 저장
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        setFormVo({
            ...formVo,
            'email': token,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // formVo 저장
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormVo({
            ...formVo,
            [name]: value
        });
    }

    return (
        <StyledNewPwdPageDiv>
            <div className='wrap'>
                <div className='title'>
                    <Link to='/'><h1>로고</h1></Link>
                    <h2>비밀번호 재설정</h2>
                </div>
                <form onSubmit={handleNewPwd}>
                    <InpText name='pwd' text='새 비밀번호' type='password' label='새 비밀번호를 입력해주세요.' onChange={handleInputChange}/>
                    <InpTextNon name='confirmPwd' type='password' text='새 비밀번호를 다시 입력해주세요.' onChange={handleInputChange}/>
                    <button>비밀번호 재설정 완료</button>
                </form>
                <div className="otherLink">
                    <span>아직 게임파운드 계정이 없으신가요? <Link to='/join'>회원가입</Link></span>
                    <span>이미 게임파운드 계정이 있으신가요? <Link to='/login'>기존계정으로 로그인하기</Link></span>
                </div>
            </div>
            {loading ? <Loading /> : ''}
        </StyledNewPwdPageDiv>
    );
};

export default NewPwdPage;