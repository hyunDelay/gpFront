import React, { useState } from 'react';
import styled from 'styled-components';
import EnrollCard from '../../../component/payment/EnrollCard';
import { useBackingMemory } from '../../../component/context/BackingContext';

const StyledBackingDetailsDiv = styled.div`
    width: 800px;
    display: flex;
    align-items: start;
    flex-direction: column;

    & > .detail_box {
        width: 780px;
        padding-top: 20px;
        padding-bottom: 20px;

        & > .title {
            font-size: 16px;
            padding: 5px;
            padding-bottom: 15px;
            font-weight: 500;
        }

        & > .detail {
            border: 1px solid #3d3d3d22;
            border-radius: 5px;
            padding: 5px;

            & > .detail_1 {
                font-size: 14px; 
                padding-left: 12px;
                padding-top: 15px;
                padding-bottom: 15px;
                display: flex;
                
                & > :nth-child(1) {
                    width: 120px;
                    display: block;

                }
            }
            
            & > .detail_2 {
                font-size: 14px;                
                padding-left: 12px;
                padding-top: 15px;
                padding-bottom: 15px;
                display: flex;

                & > :nth-child(1) {
                    width: 120px;
                    display: block;
                    
                }
            }

            & > #email_guide {
                font-size: 14px;                
                padding-left: 12px;
                padding-top: 15px;
                padding-bottom: 15px;
                width: 350px;
            }
        }

        & > .paymentType {
            border: 1px solid #3d3d3d22;
            border-radius: 5px;
            height: 56px;
            display: flex;
            align-items: center;

            & > label {
                margin-left: 30px;
                cursor: pointer;

                & > input {
                    margin-right: 7.5px;
                }
            }
        }
    }


`;

const BackingDetails = () => {
    // useContext
    const dataSet = useBackingMemory();
    let back = dataSet.dataVo;

    // 카드 정보 입력 toggle
    const [showCard, setShowCard] = useState(false);

    // 서버에 전송할 데이터에 paymentType 정보 추가(카드), 카드 정보 입력 toggle 열기
    const handleCardClick = (event) => {
        const {name, value} = event.target;

        back = {
            ...back,
            [name]: value
        }

        dataSet.setDataVo(back);
        setShowCard(true);
    }

    // 서버에 전송할 데이터에 paymentType 정보 추가(카카오페이)
    const handleKakaoPayClick = (event) => {
        const {name, value} = event.target;

        back = {
            ...back,
            [name]: value
        }

        dataSet.setDataVo(back);
        setShowCard(false);
    }



    return (
        <StyledBackingDetailsDiv>
            <div className='detail_box' id='reward_info'>
                <div className='title'>선물 정보</div>
                <div className='detail'>
                    <div className='detail_1'>
                        <span>선물 구성</span>
                        <span>{back.rewardName}</span>
                    </div>
                    <div className='detail_2'>
                        <span>선물 금액</span>
                        <span>{back.rewardAmount} 원</span>
                    </div>
                </div>
            </div>
            <div className='detail_box' id='backer_info'>
                <div className='title'>후원자 정보</div>
                <div className='detail'>
                    <div className='detail_1'>
                        <span>이메일</span>
                        <span>{back.memberEmail}</span>
                    </div>
                    <div id="email_guide">
                        <p>* 위 이메일로 후원 관련 소식이 전달됩니다.<br />
                           * 이메일은 가입 시 등록한 이메일로 자동 설정됩니다.</p>
                    </div>
                </div>
            </div>
            <div className='detail_box' id='paymentType_info'>
                <div className='title'>결제 수단</div>
                <div className='paymentType'>
                    <label><input type='radio' name='paymentType' value='card' onClick={handleCardClick} />카드 결제</label>
                    <label><input type='radio' name='paymentType' value='kakaopay' onClick={handleKakaoPayClick} />카카오페이</label>
                </div>
                {
                    showCard===true
                    ?
                    <EnrollCard />
                    :
                    <div></div>
                }
            </div>
        </StyledBackingDetailsDiv>
    );
};

export default BackingDetails;