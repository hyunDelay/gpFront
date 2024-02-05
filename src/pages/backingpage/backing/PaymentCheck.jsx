import React from 'react';
import styled from 'styled-components';
import { useBackingMemory } from '../../../component/context/BackingContext';
import {useNavigate} from 'react-router-dom';
import { useUserMemory } from '../../../component/context/UserContext';

const StyledPaymentCheckDiv = styled.div`
    width: 380px;
    height: 350px;
    margin-top: 20px;
    padding-bottom: 20px;
    
    & > .final_amount {
        height: 60px;
        border: 1px solid var(--red-color);
        border-radius: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        & > span {
            color: var(--red-color);
            padding-left: 20px;
            padding-right: 20px;
            font-weight: 400;
        }
    }

    & > .payment_due {
        font-size: 13px;
        padding: 10px;

        & > span {
            font-weight: 600;
            color: var(--red-color);
        }
    }

    & > .checkbox_area {
        padding: 10px;

        & > label {

            & > input {
                margin-right: 10px;
            }

        }
    }

    & > button {
        height: 60px;
        width: 100%;
        border-radius: 5px;
        margin-top: 20px;
        background-color: var(--red-color);
        font-size: 16px;
        color: white;
        font-weight: 400;
        letter-spacing: 0.4px;
        cursor: pointer;
    }
`;

const baseURL = process.env.REACT_APP_API_URL;

const PaymentCheck = () => {

    let customerUid = "default";

    // useNavigate
    const navigate = useNavigate();

    // useContext(로그인유저)
    const {loginMemberVo} = useUserMemory();

    // useContext(프로젝트 정보)
    const dataSet = useBackingMemory();
    const back = dataSet.dataVo;
    
    // 체크박스 동의여부 확인 함수
    const checkCheckInput = () => {
        const checkbox = document.querySelector('input[name=check_yn]');
        let is_checked = false;
        if(checkbox.checked) {
            is_checked = true;
        }

        return is_checked;
    }

    // 카드 정보 입력값 유효성 체크
    const checkCardInput = () => {

        const isValidLength = (value, length) => value.length === length;

        if(!back.cardNo1 || !back.cardNo2 || !back.cardNo3 || !back.cardNo4 || !back.validThru1 || !back.validThru2 || !back.cardPwd || !back.birthDate) {
            return false;
        }

        if(!isValidLength(back.cardNo1, 4) || !isValidLength(back.cardNo2, 4) || !isValidLength(back.cardNo3, 4) || !isValidLength(back.cardNo4, 4) ||
        !isValidLength(back.validThru1, 2) || !isValidLength(back.validThru2, 2) || !isValidLength(back.cardPwd, 2) || !isValidLength(back.birthDate, 6)) {
            return false;
        }
    
        return true;

    }

    // 카카오페이 결제등록창 연동
    const getKakaoPayApi = async() => {

        let { IMP } = window;
        IMP.init('imp44278700');

        if(typeof IMP === 'undefined') {
            alert("not loaded");
            return;
        }
        
        const paymentData = {
            pg: 'kakaopay',
            merchant_uid: 'back_' + loginMemberVo.no + new Date().getTime(),
            name: '최초인증결제',
            amount: 0,
            name: back.projectName + '_' + back.rewardName,
            customer_uid: loginMemberVo.email + '_' + new Date().getTime(),
            m_redirect_url: '/back/completed/' + back.projectNo
        }

        try {
            const result = await new Promise((resolve, reject) => {
                IMP.request_pay(paymentData, ({ success, error_msg }) => {
                    if (success) {
                        customerUid = paymentData.customer_uid;
                        resolve("success");
                    } else {
                        alert(error_msg);
                        reject("fail");
                    }
                });
            });
            return result;
        } catch (error) {
            console.error("카카오페이 API 호출 중 오류 발생:", error);
            return "fail";
        }
    }


    // 후원하기 버튼 Click
    const handleBackBtnClick = async (e) => {

        e.preventDefault();
        
        // TODO: 이미 후원한 프로젝트는 또 후원 못하게 유효성 체크
        // TODO: 로그인 유저 본인이 올린 프로젝트는 후원 불가능하게
        

        // 체크박스 체크 여부 확인
        const checkboxOk = checkCheckInput();
        if(!checkboxOk) {
            alert("필수 동의사항을 체크해주세요");
            return;
        }
        

        // 결제수단 선택 여부 확인
        if(!back.paymentType) {
            alert("후원 정보가 빠진 곳 없이 작성되었는지 확인해주세요.");
            return;
        }
        
        let sendVo = {};
        if(back.paymentType==='kakaopay') { // 결제방식: 카카오페이일 때 sendVo 세팅
            const response = await getKakaoPayApi();

            if(!customerUid || response !== "success") {
                alert("결제 오류. 다시 시도해주세요");
                return;
            }

            sendVo = {
                ...back,
                "customerUid": customerUid
            }

        } else { // 결제방식: 카드일 때 sendVo 세팅

            // 카드정보 유효성 체크
            const cardInfoOk = checkCardInput();
            console.log(cardInfoOk);
            if(!cardInfoOk) {
                alert("후원 정보가 빠진 곳 없이 작성되었는지 확인해주세요.");
                return;
            } 
            
            sendVo = {
                ...back
            }
            
        }

        // fetch 작업 실행
        fetch(`${baseURL}/back/process`, {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(sendVo)
            })
            .then(resp => resp.json())
            .then(data => {
                if(data.result==="success") {
                        navigate("/back/completed/" + back.projectNo);
                }
        })
        
    }

    

    return (
        <StyledPaymentCheckDiv>
            <div className="final_amount">
                <span>최종 후원 금액</span>
                <span>{back.rewardAmount} 원</span>
            </div>

            <div className="payment_due">프로젝트 성공 시, 결제는 <span>{back.paymentDueDate}</span> 에 진행됩니다.<br/> 
                프로젝트가 무산 또는 중단된 경우, 예약된 결제는 자동으로 취소됩니다.
            </div>
            
            <div className="checkbox_area">
                <label><input type="checkbox" name='check_yn' />개인정보 제3자 제공 동의</label>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
            </div>
            
            <button onClick={handleBackBtnClick}>후원하기</button>
        </StyledPaymentCheckDiv>
    );
};

export default PaymentCheck;