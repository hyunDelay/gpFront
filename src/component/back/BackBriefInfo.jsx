import React, { useState } from 'react';
import styled from 'styled-components';
import ReviewWrite from '../../pages/userpage/ReviewWrite';
import { useNavigate, useParams } from 'react-router-dom';
import ReviewBox from '../../pages/userpage/ReviewBox';
import { useUserMemory } from '../context/UserContext';

const baseURL = process.env.REACT_APP_API_URL;

const StyledBackBriefInfoDiv = styled.div`
    width: 1100px;
    padding: 20px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;

    & > .back_item {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        cursor: pointer;
        
        & > img {
            width: 155px;
            height: 120px;
            margin: 0px 20px 0px 0px;
            border: none;
        }

        & > .back_info {
            color: var(--black-color);

            & > #back_date {
               font-size: 12px; 
               opacity: 0.9;
            }

            & > #title {
                font-size: 16px;
                padding-bottom: 20px;
                font-weight: 400;
            }

            & > #reward {
                font-size: 13px;
            }

            & > #payment_status {
                padding-top: 10px;
                font-size: 13px;
                font-weight: 400;
                letter-spacing: 0.4px;
                color: var(--red-color);
            }
        }
    }

    & > button {
        width: 150px;
        height: 46px;
        border: 1px solid var(--red-color);
        background-color: white;
        color: var(--red-color);
        cursor: pointer;
    }
`;

const BackBriefInfo = ({item}) => {

    const {loginMemberVo} = useUserMemory();
    const {no} = useParams();

    let matchYn;
    loginMemberVo?.no === no ? matchYn = 'true' : matchYn = 'false';

    const navigate = useNavigate();
    const [reviewWrite, setReviewWrite] = useState(false);
    const [reviewView, setReviewView] = useState(false);

    const handleReviewWriteBtnClick = () => {
        if(reviewWrite===false) {
            setReviewWrite(true);
        } else {
            setReviewWrite(false);
        }
    }

    const [reviewVo, setReviewVo] = useState([]);
    const handleReviewViewBtnClick = () => {
        if(reviewView === false) {
            setReviewView(true);

            fetch(`${baseURL}/userpage/backed/review?reviewNo=` + item.reviewNo)
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                if(data !== null) {
                    console.log(data);
                    setReviewVo(data);
                } else {
                    alert("작성한 리뷰가 없습니다.");
                    setReviewView(false);
                }
            });

        } else {
            setReviewView(false);
        }
    }

    const handleBoxClick = () => {
        navigate("/back/detail/" + item.backNo);
    }

    return (
        <StyledBackBriefInfoDiv>
            <div className='back_item' key={item.backNo} onClick={handleBoxClick}>
                <img src={item.projectImg}></img>
                <div className='back_info'>
                    <div id='back_date'>{item.backingDate}</div>
                    <div id='title'>{item.projectTitle}</div>
                    <div id='reward'>{item.rewardName}</div>
                    <div id='payment_status'>{item.paymentStatus}</div>
                </div>
            </div>
            {
                matchYn === 'false' || item.retractYn === 'Y' || item.projectStatus === '펀딩 무산' || item.paymentStatus === '결제예약취소' || item.paymentStatus === '결제대기'
                ?
                <></>
                :
                <>
                    {item.reviewNo === null
                    ? 
                    <button onClick={handleReviewWriteBtnClick}>
                        후기 작성
                    </button>
                    :
                    <button onClick={handleReviewViewBtnClick}>
                        내가 남긴 후기
                    </button>}                
                </>
            }
            {
                reviewWrite===true
                ?
                <ReviewWrite item={item}/>
                :
                <></>
            }
            {
                reviewView===true
                ?
                <ReviewBox item={reviewVo} />
                :
                <></>
            }
        </StyledBackBriefInfoDiv>
    );
};

export default BackBriefInfo;