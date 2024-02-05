import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const baseURL = process.env.REACT_APP_API_URL;

const StyledReviewBoxDiv = styled.div`
    width: 760px;
    color: var(--black-color);
    border-bottom: 1px solid rgb(0, 0, 0, 0.1);
    margin-left: 150px;
    
    & > .writer {
        display: flex;
        justify-content: start;
        padding-top: 15px;
        padding-bottom: 20px;


        & > #profile_img {
            width: 36px; 
            height: 36px;
            border-radius: 36px;
        }

        & > #nick {
            font-size: 14px;
            line-height: 36px;
            padding-left: 20px;
        }
    }

    & > .rating {
        padding-left: 20px;
        & > span {
            font-size: 14px;
            opacity: 0.95;
        }

        & > :nth-child(2) {
            background-color: var(--red-color);
            color: white;
            padding: 1px 7px;
            margin-left: 20px;
            border-radius: 5px;
            opacity: 1.0;
        }
    }

    & .content {
        padding-left: 20px;
        margin: 7.5px 0px 20px;
        
        & > span {
            font-size: 14px;
            opacity: 0.95;
        }
        
        & > :nth-child(2) {
            font-size: 16px;
            padding: 1px 7px;
            margin-left: 23px;
            border-radius: 5px;
            opacity: 1.0;
        }
    }
    
    & .reviewImg {
        margin-left: 20px;
        margin-bottom: 20px;

        & > img {
            width: 100px;
            height: 100px;
            object-fit: contain;
            
            /* &:hover {
                width: 100%;
                height: 100%;
            } */
        }
        
    }

    & .project {
        border-radius: 10px;
        background-color: #F0F0F080;
        height: 40px;
        cursor: pointer;
        display: flex;
        align-items: center;
        padding-left: 20px;

        & :hover {
            opacity: 0.7;
        }
        
        & > img {
            width: 25px;
            height: 25px;
            border-radius: 25px;
            background-color: bisque;
        }

        & > div {
            font-size: 14px;
            padding-left: 7.5px;
        }
    }

    & > .enroll_date {
        display: block;
        text-align: right;
        padding-top: 20px;
        font-size: 13px;
        padding-bottom: 30px;
    }
`;

const ReviewBox = ({item}) => {

    const navigate = useNavigate();

    const [clicked, setClicked] = useState(false);

    const handleImgClick = (e) => {
        if(clicked===false) {
            e.target.style.width='100%';
            e.target.style.height='80%';

            setClicked(true);
        } else {
            e.target.style.width='';
            e.target.style.height='';

            setClicked(false);
        }
    }

    const handleProjectClick = () => {
        navigate(`../project/detail/story/${item.projectNo}`);
    }
    

    return (
        <StyledReviewBoxDiv>
            <div className='writer'>
                <img id='profile_img' src={item.profileImg} alt='프로필이미지'></img>
                <div id='nick'>{item.memberName}</div>
            </div>
            <div className='rating'>
                <span>만족도</span>
                <span>{item.rating}</span>
            </div>
            <div className='content' key={item.reviewNo}>
                <span>후기</span>
                <span>{item.reviewContent}</span>
            </div>
            <div className='reviewImg'>
                {
                    item.reviewImg !== `${baseURL}/resources/images/reviewImg/null`
                    ?
                    <img id='img' src={item.reviewImg} onClick={handleImgClick} alt='리뷰이미지'></img>
                    :
                    <></>
                }
            </div>
            <div className='project' onClick={handleProjectClick}>
                <img src={item.projectImg} alt='프로젝트이미지'></img>
                <div>{item.projectTitle}</div>
            </div>
            <div className='enroll_date'>
                {item.enrollDate}
            </div>
        </StyledReviewBoxDiv>
    );
};

export default ReviewBox;