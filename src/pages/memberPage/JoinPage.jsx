import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import logoImage from '../../assets/images/logo_big.svg';
import { Link, useNavigate } from 'react-router-dom';
import InpText from './input/InpText';
import InpTextNon from './input/InpTextNon';
import Loading from './../../component/common/Loading';

const baseURL = process.env.REACT_APP_API_URL;

const StyledJoinPageDiv = styled.div`
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
            gap: 5px;
            & > button {
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
            & div + div label {
                margin-top: 10px;
            }
            & .inpBtnGroup {
                display: flex;
                flex-direction: column;
                & label {
                    display: flex;
                    font-size: 13px;
                    padding: 3px 0;
                }
                & span {
                    display: flex;
                    justify-content: space-between;
                    & input {
                        display: flex;
                        width: calc(100% - 130px);
                        padding: 8px 15px;
                        font-size: 14px;
                        box-sizing: border-box;
                        border-radius: 5px;
                        border: 1px solid #ddd;
                        &::placeholder {
                            color: #999;
                        }
                        &:hover,
                        &:focus {
                            border-color: #333;
                            outline: none;
                        }
                    }
                    & button {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 120px;
                        height: 40px;
                        border-radius: 5px;
                        background-color: #333;
                        font-size: 14px;
                        font-weight: 500;
                        color: #fff;
                        cursor: pointer;
                        &:disabled {
                            background-color: #ddd;
                            color: #aaa;
                            cursor: default;
                        }
                    }
                    & button.send {
                        display: none;
                    }
                    &.active button.send {
                        display: flex;
                    }
                    &.active button.same {
                        display: none;
                    }
                }
            }
            & .inpBtnGroup + .inpBtnGroup {
                margin-top: 5px;
            }
            & .pwdBox div + div {
                margin-top: 5px;
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

const JoinPage = () => {

    const [formVo, setFormVo] = useState({});
    const [isValidEmail, setIsValidEmail] = useState(true); // 이메일 검증 상태
    const [isValidPwd, setIsValidPwd] = useState(true); // 비밀번호 검증 상태
    const [isValidConfirmPwd, setIsValidConfirmPwd] = useState(true); // 비밀번호 확인 검증 상태
    const [isValidName, setIsValidName] = useState(true); // 이름 검증 상태
    const [isSendEmail, setIsSendEmail] = useState(false); // 인증메일 보내기 상태
    const [isAuthentication, setIsAuthentication] = useState(false); // 인증번호 인증 상태
    const [userCode, setUserCode] = useState({}); // 인증번호Vo
    const [loading, setLoading] = useState(false); // 로딩중 표시

    const navigate = useNavigate();

    // 가입하기
    const handleJoin = (e) => {
        e.preventDefault();
        // 검증로직
        if(!isAuthentication){ // 인증완료 안할시
            alert('이메일 인증을 완료해주세요.');
            return false;
        }
        if(!isValidPwd){ // 비밀번호 검증 안할 시
            alert('비밀번호가 유효하지 않습니다.');
            return false;
        }
        if(!isValidConfirmPwd){ // 비밀번호 확인 검증 안할시
            alert('비밀번호가 일치하지 않습니다.');
            return false;
        }
    
        // 가입진행
        setLoading(true); // 로딩중 화면 표시
        fetch(`${baseURL}/join`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formVo),
        })
        .then(resp => resp.json())
        .then(data => {
            if(data.msg === 'good'){
                alert('가입 완료되었습니다.');
                navigate('/login')
            }
        })
        .catch(() => {
            alert('가입 실패되었습니다. 입력하신 정보를 확인해주세요.');
        })
        .finally(() => {
            setLoading(false); // 로딩중 화면 끝
        })
        ;
    }

    // 중복확인
    const handleSameEmail = () => {

        // 검증
        if(!isValidEmail){
            alert('유효하지 않은 이메일 주소입니다.');
            return;
        }
        if(formVo.email === '' || formVo.email === null || formVo.email === undefined){
            alert('이메일 주소를 입력해주세요.');
            return;
        }
        
        // 중복확인
        setLoading(true); // 로딩중 화면 표시
        fetch(`${baseURL}/emailUnique`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formVo),
        })
        .then(resp => resp.json())
        .then(data => {
            if(data.msg === 'good'){
                alert('이 이메일로 가입하실 수 있습니다.');
                const sendBtn = document.querySelector('.send');
                sendBtn.parentNode.classList.add('active');
                const emailInput = document.querySelector('input[name=email]');
                emailInput.disabled = true;
            } else {
                throw new Error();
            }
        })
        .catch(() => {
            alert('이미 가입된 이메일 입니다.');
        })
        .finally(() => {
            setLoading(false); // 로딩중 화면 끝
        })
        ;
        
    }

    // 인증메일 보내기
    const handleSendEmail = () => {
        if(!isSendEmail){

            setLoading(true); // 로딩중 화면 표시
            fetch(`${baseURL}/mailCheck`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formVo),
            })
            .then(resp => resp.json())
            .then(data => {
                if(data.msg === 'good'){
                    alert('인증메일이 전송되었습니다.');
                }
                //console.log(data.verificationCode); // 인증번호 확인용
            })
            .catch(() => {
                alert('인증번호 전송에 실패했습니다.');
            })
            .finally(() => {
                setLoading(false); // 로딩중 화면 끝
                setIsSendEmail(true); // 이메일 보내기 완료
            })
            ;
        }
    }

    // 인증하기
    const handleCodeComplete = () => {
        setLoading(true); // 로딩중 화면 표시
        fetch(`${baseURL}/mailauthCheck`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userCode),
        })
        .then(resp => resp.json())
        .then(data => {
            const authenticationBtn = document.querySelector('.authentication');
            const sendBtn = document.querySelector('.send');
            const msg = document.querySelector('.email.msg');

            if (data.msg === 'good') {
                alert('인증이 성공했습니다.');
                authenticationBtn.disabled = true;
                authenticationBtn.innerHTML = '인증완료';
                setIsAuthentication(true);
                sendBtn.disabled = true;
                msg.innerHTML = '인증완료 되었습니다.';
            } else {
                sendBtn.innerHTML = '다시보내기';
                sendBtn.disabled = false;
                msg.innerHTML = '인증실패하였습니다.';
                throw new Error();
            }
        })
        .catch(() => {
            alert('인증번호가 틀렸습니다.');
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
        }
    }, [formVo.email]);

    // 이름검사
    useEffect(() => {
        if (formVo.name) {
            // 이름 검증
            const nameRegex = /^[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9\x20()_[\]]{2,14}$/;
            const isValid = nameRegex.test(formVo.name);

            // 결과에 따라 메시지 업데이트
            setIsValidName(isValid);
            const msg = document.querySelector('.name.msg');
            if(!isValid){
                msg.innerHTML = '이름이 유효하지 않습니다. (2자 이상 14자 이하)';
            } else {
                msg.innerHTML = '';
            }
        }
    }, [formVo.name]);

    // 비밀번호 검사
    useEffect(() => {
        if (formVo.pwd) {
            // 비밀번호 검증
            const pwdRegex = /^.{4,}$/;
            const isValid = pwdRegex.test(formVo.pwd);

            // 결과에 따라 메시지 업데이트
            setIsValidPwd(isValid);
            const msg = document.querySelector('.pwd.msg');
            if(!isValid){
                msg.innerHTML = '비밀번호가 유효하지 않습니다. (4자 이상 32자 이하)';
            } else {
                msg.innerHTML = '';
            }
        }
    }, [formVo.pwd]);
    useEffect(() => {
        if (formVo.confirmPwd) {
            
            const msg = document.querySelector('.confirmPwd.msg');
            if(formVo.confirmPwd === formVo.pwd){
                setIsValidConfirmPwd(true);
                msg.innerHTML = '';
            } else {
                setIsValidConfirmPwd(false);
                msg.innerHTML = '비밀번호와 일치하지 않습니다.';
            }
            
        }
    }, [formVo.confirmPwd, formVo.pwd]);

    // formVo에 값 저장
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormVo({
            ...formVo,
            [name]: value
        });
    };

    // 인증번호 저장
    const handleUserCodeChange = (e) => {
        const {name, value} = e.target;
        setUserCode({
            [name]: value,
        });
    }
    
    return (
        <StyledJoinPageDiv>
            <div className='wrap'>
                <div className='title'>
                    <Link to='/'><h1>로고</h1></Link>
                    <h2>이메일로 가입하기</h2>
                </div>
                <form>
                    <div className="nameBox">
                        <InpText name='name' text='이름' label='사용하실 이름을 입력해주세요.' type='text' onChange={handleInputChange}/>
                        <div className={`name msg ${isValidName ? 'complete' : 'error'}`}></div>
                    </div>

                    <div className="emailBox">
                        <div className='inpBtnGroup'>
                            <label htmlFor="email">이메일 주소</label>
                            <span>
                                <input type="text" name="email" id="email" placeholder='이메일 주소를 입력해주세요.' onChange={handleInputChange}/>
                                <button type='button' className='same' onClick={handleSameEmail}>중복확인</button>
                                <button type='button' className='send' onClick={handleSendEmail}>인증메일 보내기</button>
                            </span>
                            <div className={`msg ${isValidEmail ? '' : 'error'}`}>{isValidEmail ? '' : '유효하지 않은 이메일 주소입니다.'}</div>
                        </div>
                        {
                            isSendEmail ? 
                            <div className='inpBtnGroup'>
                                <span>
                                    <input type="text" name="userCode" onChange={handleUserCodeChange}/>
                                    <button type='button' className='authentication' onClick={handleCodeComplete}>인증</button>
                                </span>
                                <div className={`email msg ${isAuthentication ? 'complete' : 'error'}`}></div>
                            </div>
                            :
                            ''
                        }
                    </div>

                    <div className="pwdBox">
                        <InpText name='pwd' text='비밀번호' label='비밀번호를 입력해주세요.' type='password' onChange={handleInputChange}/>
                        <div className={`pwd msg ${isValidPwd ? 'complete' : 'error'}`}></div>
                        <InpTextNon name='confirmPwd' text='비밀번호를 다시 입력해주세요.' type='password' onChange={handleInputChange}/>
                        <div className={`confirmPwd msg ${isValidConfirmPwd ? 'complete' : 'error'}`}></div>
                    </div>

                    <button onClick={handleJoin}>가입하기</button>
                </form>
                <div className="otherLink">
                    <span>이미 게임파운드 계정이 있으신가요? <Link to='/login'>기존계정으로 로그인하기</Link></span>
                </div>
            </div>

            {loading ? <Loading /> : ''}
        </StyledJoinPageDiv>
    );
};

export default JoinPage;