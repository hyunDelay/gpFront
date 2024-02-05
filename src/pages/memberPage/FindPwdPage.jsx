import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import logoImage from '../../assets/images/logo_big.svg';
import InpText from './input/InpText';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../../component/common/Loading';

const baseURL = process.env.REACT_APP_API_URL;

const StyledFindPwdPageDiv = styled.div`
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
        
        & .msg {
            font-size: 13px;
            &.complete {
                color: #4EB56B;
            }
            &.error {
                color: #F05A5A;
            }
        }
    }
`;

const FindPwdPage = () => {

    const navigate = useNavigate();
    const [formVo, setFormVo] = useState({});
    const [isValidEmail, setIsValidEmail] = useState(true); // 이메일 검증 상태
    const [loading, setLoading] = useState(false); // 로딩중표시

    // 비밀번호 확인 메일 보내기
    const handleFindPwd = (e) => {
        e.preventDefault();

        if(!isValidEmail){
            alert('이메일 형식이 맞지 않습니다.');
        }

        setLoading(true); // 로딩중 화면 표시
        fetch(`${baseURL}/confirmPassword`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formVo),
        })
        .then(resp => resp.json())
        .then(data => {
            if(data.msg === 'good'){
                alert('새 비밀번호 관리 메일이 발송되었습니다.');
                navigate('/');
            } else {
                throw new Error();
            }
        })
        .catch(() => {
            alert('오류가 발생했습니다.');
        })
        .finally(() => {
            setLoading(false); // 로딩중 화면 끝
        })
        ;
    }

    // 이메일 검사
    useEffect(() => {
        if (formVo.email) {
            // 이메일 정규식 검사
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const isValid = emailRegex.test(formVo.email);

            // 결과에 따라 메시지 업데이트
            setIsValidEmail(isValid);
            const msg = document.querySelector('.msg');
            if(!isValid){
                msg.innerHTML = '이메일 형식이 맞지 않습니다.';
            } else {
                msg.innerHTML = '';
            }
        }
        
    }, [formVo.email]);

    // formVo 저장
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormVo({
            ...formVo,
            [name]: value
        });
    }

    return (
        <StyledFindPwdPageDiv>
            <div className='wrap'>
                <div className='title'>
                    <Link to='/'><h1>로고</h1></Link>
                    <h2>비밀번호 찾기</h2>
                </div>
                <form onSubmit={handleFindPwd}>
                    <InpText name='email' text='이메일 주소' type='text' label='이메일 주소를 입력해주세요.' onChange={handleInputChange}/>
                    <div className={`msg ${isValidEmail ? '' : 'error'}`}></div>
                    <button>비밀번호 설정 링크 이메일로 받기</button>
                </form>
                <div className="otherLink">
                    <span>아직 게임파운드 계정이 없으신가요? <Link to='/join'>회원가입</Link></span>
                    <span>이미 게임파운드 계정이 있으신가요? <Link to='/login'>기존계정으로 로그인하기</Link></span>
                </div>
            </div>
            {loading ? <Loading /> : ''}
        </StyledFindPwdPageDiv>
    );
};

export default FindPwdPage;