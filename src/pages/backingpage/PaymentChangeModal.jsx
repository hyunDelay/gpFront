import React, { useState } from 'react';
import styled from 'styled-components';
import EnrollCard from '../../component/payment/EnrollCard';

const baseURL = process.env.REACT_APP_API_URL;

const StyledPaymentChangeDiv = styled.div`
    width: 250px;
    height: 400px;

    & > form {
            & > .cardNo {
            
            & > div {
                font-size: 14px;
                margin-bottom: 8px;
            }

            & > input{
                width: 40px;
                border: 1px solid #333;
                height: 30px;
                border-radius: 5px;
                margin-right: 5px;
            }
        }

        & > .validThru {
            margin-top: 20px;
            & > div {
                font-size: 14px;
                margin-bottom: 8px;
            }

            & > input {
                width: 40px;
                border: 1px solid #333;
                height: 30px;
                border-radius: 5px;
                margin-right: 5px;
            }
        }
        
        & > .cardPwd {
            margin-top: 20px;
            & > div {
                font-size: 14px;
                margin-bottom: 8px;
            }

            & > input {
                width: 40px;
                border: 1px solid #333;
                height: 30px;
                border-radius: 5px;
                margin-right: 5px;
            }
        }

        & > .birthDate {
            margin-top: 20px;

            & > div {
                font-size: 14px;
                margin-bottom: 8px;
            }

            & > input {
                width: 40px;
                border: 1px solid #333;
                height: 30px;
                border-radius: 5px;
                margin-right: 5px;
            }
        }

        & > button {
            margin-top: 20px;
            height: 30px;
            width: 60px;
            border: 1px solid var(--red-color);
            border-radius: 5px;
            background-color: white;
            color: var(--red-color);
            cursor: pointer;
        }
    }
`;


const PaymentChangeModal = () => {
    
    const [cardData, setCardData] = useState({});

    const handleCardInputsChange = (e) => {
        const {name, value} = e.target;

        setCardData({
            ...cardData,
            [name]: value
        });

        console.log(cardData);
    }

    const handleBtnClick = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('cardNo1', cardData.cardNo1);
        formData.append('cardNo2', cardData.cardNo2);
        formData.append('cardNo3', cardData.cardNo3);
        formData.append('cardNo4', cardData.cardNo4);
        formData.append('validThru1', cardData.validThru1);
        formData.append('validThru2', cardData.validThru2);
        formData.append('cardPwd', cardData.cardPwd);
        formData.append('birthDate', cardData.birthDate);

        fetch(`${baseURL}/change/payment`, {
            method: "post",
            body: formData
        })
        .then(resp => resp.json())
        .then(data => {

        })
    }

    return (
        <StyledPaymentChangeDiv>
            <form>
                <div className='cardNo'>
                    <div>카드 번호</div>
                    <input type='text' className='cardInput' name='cardNo1' onKeyUp={handleCardInputsChange}/> 
                    <input type='text' className='cardInput' name='cardNo2' onKeyUp={handleCardInputsChange}/>
                    <input type='text' className='cardInput' name='cardNo3' onKeyUp={handleCardInputsChange}/>
                    <input type='text' className='cardInput' name='cardNo4' onKeyUp={handleCardInputsChange}/> 
                </div>
                <div className='validThru'>
                    <div>유효 기간</div>
                    <input type='text' className='validThru' name='validThru1' onKeyUp={handleCardInputsChange}/> 
                    <input type='text' className='validThru' name='validThru2' onKeyUp={handleCardInputsChange}/> 
                </div>
                <div className='cardPwd'>
                    <div>카드 비밀번호</div>
                    <input type='text' className='cardPwd' name='cardPwd' onKeyUp={handleCardInputsChange}/> 
                </div>
                <div className='birthDate'>
                    <div>생년월일 6자리</div>
                    <input type='text' className='birthDate' name='birthDate' onKeyUp={handleCardInputsChange}/> 
                </div>
                <button onClick={handleBtnClick}>변경</button>
            </form>
        </StyledPaymentChangeDiv>
    );
};

export default PaymentChangeModal;