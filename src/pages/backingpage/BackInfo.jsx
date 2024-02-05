import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const baseURL = process.env.REACT_APP_API_URL;

const StyledBackInfoDiv = styled.div`

    & > .retractYn {
        background-color: #f5f5f5;
        color: var(--red-color);
        height: 70px;
        border-radius: 5px;
        padding-left: 20px;
        display: flex;
        align-items: center;
    }

    & > .detail_box {
        width: 1200px;
        padding-top: 20px;
        padding-bottom: 20px;

        & > .title {
            font-size: 16px;
            color: #3d3d3d;
            padding: 5px;
            padding-bottom: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            & > button {
                width: 60px; 
                height: 35px;
                background-color: white;
                color: var(--red-color);
                border: 1px solid var(--red-color);
                border-radius: 10px;
                cursor: pointer;
            }
        }

        & > .detail {
            border: 1px solid #3d3d3d22;
            border-radius: 5px;
            padding: 5px;

            & > .detail_1 {
                font-size: 14px; 
                color: #3d3d3d;
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
                color: #3d3d3d;               
                padding-left: 12px;
                padding-top: 15px;
                padding-bottom: 15px;
                display: flex;
                
                & > :nth-child(1) {
                    width: 120px;
                    display: block;
                }
            }
        }

        & > .paymentType {
            border: 1px solid #3d3d3d;
        }

        
    }
    
    & > .cancel_area {
        padding-top: 30px;
        padding-bottom: 30px;
        text-align: center;
        font-size: 12px;
        color: var(--black-color);
        opacity: 0.7;
        

        & > div {
            cursor: pointer;
        }
        
    }
`;

const BackInfo = ({BackInfo}) => {

    const navigate = useNavigate();
    const handleCancelClick = () => {
        fetch(`${baseURL}/back/canceled`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({backNo: BackInfo.backNo})
        })
        .then(resp => resp.json())
        .then(data => {
            if(data.msg === "canceled") {
                navigate("/back/canceled/" + BackInfo.backNo);
            } else {
                alert("후원 취소 실패. 다시 시도해주세요.");
            }
        })
        .catch(error => {
            console.error("네트워크 요청 실패:", error);
        })
    }

    return (
        <StyledBackInfoDiv>
            {
                BackInfo.retractYn === 'Y'
                ?
                <div className='retractYn'>
                    취소된 후원내역입니다!
                </div>
                :
                <></>
            }
            <div className='detail_box' id='reward_info'>
                <div className='title'>
                    후원 정보
                </div>
                <div className='detail'>
                    <div className='detail_1'>
                        <span>펀딩 상태</span>
                        <span>{BackInfo.rewardName}</span>
                    </div>
                    <div className='detail_2'>
                        <span>후원 날짜</span>
                        <span>{BackInfo.backingDate}</span>
                    </div>
                    <div className='detail_2'>
                        <span>펀딩 마감일</span>
                        <span>{BackInfo.endDate}</span>
                    </div>
                </div>
            </div>
            <div className='detail_box' id='reward_info'>
                <div className='title'>
                    <span>선물 정보</span>
                </div>
                <div className='detail'>
                    <div className='detail_1'>
                        <span>선물 구성</span>
                        <span>{BackInfo.rewardName}</span>
                    </div>
                    <div className='detail_2'>
                        <span>선물 금액</span>
                        <span>{BackInfo.rewardAmount} 원</span>
                    </div>
                </div>
            </div>
            <div className='detail_box' id='reward_info'>
                <div className='title'>
                    <span>결제 정보</span>
                </div>
                <div className='detail'>
                    <div className='detail_1'>
                        <span>결제 수단</span>
                        <span>{BackInfo.paymentType}</span>
                    </div>
                    <div className='detail_2'>
                        <span>결제 금액</span>
                        <span>{BackInfo.paymentAmount} 원</span>
                    </div>
                </div>
            </div>

            {
                BackInfo.retractYn === 'N'
                ?
                <div className='cancel_area'>
                    <div onClick={handleCancelClick}>
                    후원을 취소하시겠습니까?
                    </div>
                </div>
                :
                <></>
            }
        </StyledBackInfoDiv>
    );
};

export default BackInfo;