import React, { useState } from 'react';
import styled from 'styled-components';
import { useBackingMemory } from '../context/BackingContext';

const StyledEnrollCardDiv = styled.div`
    width: 780px;
    height: 300px;
    border: 1px solid #3d3d3d22;
    border-radius: 5px;
    padding: 30px;
    padding-left: 50px;
    font-size: 14px; 
    
    & > .card_number {
        width: 500px;
        
        & > div {
            margin-bottom: 10px;
        }
        
        & > input {
            text-align: center;
            width: 50px;
            height: 30px;
            border: 1px solid #3d3d3d66;
            border-radius: 5px;
            margin-right: 10px;
        }
    }

    & > .avail_period {
        padding-top: 30px;
        width: 500px;
        
        & > :nth-child(2) {
            text-align: center;
            width: 30px;
            height: 30px;
            margin-top: 10px;
            margin-right: 10px;
            border: 1px solid #3d3d3d66;
            border-radius: 5px;
        }

        & > :nth-child(3) {
            text-align: center;
            width: 30px;
            height: 30px;
            margin-top: 10px;
            margin-left: 10px;
            border: 1px solid #3d3d3d66;
            border-radius: 5px;
        }
    }

    & > .owner_info {
        padding-top: 30px;
        width: 500px;
        display: flex;

        & > :nth-child(1), :nth-child(2) {
            width: 200px;
            margin-right: 60px;
            border-radius: 5px;
            
            & > input {
                padding-left: 5px;
                height: 30px;
                margin-top: 10px;
                border: 1px solid #3d3d3d66;
                border-radius: 5px;
            }
        }
    }
`;

const EnrollCard = () => {

    const dataSet = useBackingMemory();
    let back = dataSet.dataVo;

    const inputs = document.querySelectorAll("input");
    const inputRegex = /^\d+$/;
    for(const input of inputs) {
        if(!inputRegex.test(input.value)) {
            input.value = input.value.slice(0, input.value.length-1);
        }
    }

    // 카드번호 input maxLength: 2
    const cardNums = document.querySelectorAll(".card_input");
    for (const cardNum of cardNums) {
        if (cardNum !== undefined && cardNum.value.length > 4) {
            cardNum.value = cardNum.value.slice(0, 4);
        }
    }

    // 카드 유효기간 input maxLength: 2
    const validThrus = document.querySelectorAll(".validThru");
    for(const validThru of validThrus) {
        if (validThru !== undefined && validThru.value.length > 2) {
            validThru.value = validThru.value.slice(0, 2);
        }
    }
    
    // 카드 비밀번호 앞 2자리 input maxLength: 2
    const cardPwd = document.querySelector("input[name=cardPwd]");
    if (cardPwd !== undefined && cardPwd !== null && cardPwd.value.length > 2) {
        cardPwd.value = cardPwd.value.slice(0, 2);
    }

    // 카드 번호 inputs useState
    const [cardInputs, setCardInputs]= useState({
        "cardNo1": "",
        "cardNo2": "",
        "cardNo3": "",
        "cardNo4": "",
    });
    
    // 유효기간 inputs useState
    const [validThruInputs, setValidThruInputs] = useState({
        "validThru1": "",
        "validThru2": "",
    })
    
    // 그 외 정보 inputs useState
    const [ownerInfoInputs, setOwnerInfoInputs] = useState({
        "cardPwd": "",
        "birthDate": ""
    })

    // 카드번호 onChange
    const handleCardNoInputsChange = (event) => {
        const {name, value} = event.target;

        setCardInputs({
            ...cardInputs,
            [name]: value
        }
        )
        
        back = {
            ...back,
            [name]: value
        }
        
        dataSet.setDataVo(back);
    }
    
    // 유효기간 onChange
    const handleValidThruInputsChange = (event) => {
        const {name, value} = event.target;

        setValidThruInputs({
            ...validThruInputs,
            [name]: value
        })

        back = {
            ...back,
            [name]: value
        }
        
        dataSet.setDataVo(back);
    }

    // 그 외 정보 onChange
    const handleOwnerInfoInputsChange = (event) => {
        const {name, value} = event.target;

        setOwnerInfoInputs({
            ...ownerInfoInputs,
            [name]: value
        })

        back = {
            ...back,
            [name]: value
        }
        
        dataSet.setDataVo(back);
    }
    

    return (
        <StyledEnrollCardDiv>
            <div className='card_number'>
                <div>카드번호</div>
                {
                    (Object.keys(cardInputs)).map((inputName) => {
                        return <input
                            className='card_input'
                            name={inputName}
                            key={inputName}
                            type='text'
                            onChange={handleCardNoInputsChange}
                        />                        
                    })
                }
                
            </div>
            <div className='avail_period'>
                <div>카드 유효기간</div>
                <input type='text' className='validThru' name='validThru1' onKeyUp={handleValidThruInputsChange}/> / 
                <input type='text' className='validThru' name='validThru2' onKeyUp={handleValidThruInputsChange}/>
            </div>
            <div className='owner_info'>
                <div className='pwd'>
                    <div>카드 비밀번호 앞 2자리</div>
                    <input type='text' name='cardPwd' onKeyUp={handleOwnerInfoInputsChange}/>
                </div>
                <div className='birth_date'>
                    <div>생년월일 6자리</div>
                    <input type='text' name='birthDate' onKeyUp={handleOwnerInfoInputsChange}/>
                </div>
            </div>
        </StyledEnrollCardDiv>
    );
};

export default EnrollCard;