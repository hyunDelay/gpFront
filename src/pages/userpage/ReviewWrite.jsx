import React, { useState } from 'react';
import styled from 'styled-components';
import {useUserMemory} from '../../component/context/UserContext';

const baseURL = process.env.REACT_APP_API_URL;

const StyledReviewWriteDiv = styled.div`
    width: 1200px;
    height: 450px;
    margin: auto;
    margin-top: 30px;
    padding: 30px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);

    & > form {

        & > #title {
            color: var(--red-color);
            font-size: 16px;
        }

        & > .writer_area {
            height: 60px;
            display: flex;
            align-items: center;

            & > img {
                width: 25px;
                height: 25px;
                border-radius: 25px;
                margin-right: 10px;
                background-color: aliceblue;
            }

            & > span {
                font-size: 14px;
            }
        }

        & > .rating_area {
            height: 40px;
            font-size: 14px;
            color: var(--black-color);
            
            & > :nth-child(1) {
                margin-left: 20px;
                
            }

            & > .ratings {
                width: 40px;
                height: 25px;
                border: 1px solid var(--red-color);
                border-radius: 5px;
                margin-right: 10px;
                background-color: white;
                color: var(--red-color);
                cursor: pointer;

                &:hover {
                    background-color: var(--red-color);
                    color: white;
                }

                &:active {
                    background-color: var(--red-color);
                    color: white;
                }
            }
        }

        & > .content {
            width: 1000px;

            & > textarea {
                width: 700px;
                height: 100px;
                border: 1px solid var(--black-color);
                resize: none;
                border-radius: 5px;
            }
        }

        & > .upload {
            width: 700px;
            padding-top: 10px;
            display: flex;
            
            & > #upload_area {
                font-size: 14px;
                display: flex;
                flex-direction: column;

                & > label {
                    margin-top: 10px;
                    width: 70px;
                    height: 30px;
                    border-radius: 5px;
                    background-color: var(--black-color);
                    color: white;
                    cursor: pointer;
                    text-align: center;
                    line-height: 30px;
            }
            }

            & > #img_preview {
                    width: 200px;
                    height: 133px;
                    margin-left: 40px;
                    object-fit: contain;
            }

            
        }

        & > button {
            width: 70px;
            height: 30px;
            background-color: white;
            color: var(--red-color);
            border: 1px solid var(--red-color);
            border-radius: 5px;
            margin-left: 630px;
            cursor: pointer;

            &:hover {
                background-color: var(--red-color);
                color: white;
            }
        }
    }
`;

const ReviewWrite = ({item}) => {

    const {loginMemberVo} = useUserMemory();
    const [reviewVo, setReviewVo] = useState({
        memberNo: loginMemberVo.no,
        backNo: item.backNo
    });

    const [imgObj, setImgObj] = useState();

    console.log(reviewVo);

    const handleInputChange = (event) => {
        const {name, value} = event.target;

        setReviewVo({
            ...reviewVo,
            [name]: value
        });
    }

    // 미리보기 기능
    const handleFileChange = (e) => {

        setImgObj(e.target.files[0]);

        const fileTag = document.querySelector("#inputImg");
        const previewTag = document.querySelector("#img_preview");

        const fr = new FileReader();
        fr.addEventListener('load', (event) => {
            previewTag.src= event.target.result;
        });

        fr.readAsDataURL(fileTag.files[0]);
        
    }
    
    // rating
    const handleRatingClick = (e) => {
        e.preventDefault();
        
        const value = e.target.innerText;
        
        setReviewVo({
            ...reviewVo,
            "rating": value
        })

        const ratingBtns = document.querySelectorAll('.ratings');
        
        for(const btn of ratingBtns) {
            btn.style.backgroundColor='white';
            btn.style.color='var(--red-color)';
        }

        e.target.style.backgroundColor='var(--red-color)';
        e.target.style.color='white';
    }
    
    
    // fetch 리뷰 등록
    const handleReviewSubmit = (e) => {
        e.preventDefault();
        
        // TODO: 만족도 선택 안되어있으면 안됨

        const formData = new FormData();
        formData.append('memberNo', reviewVo.memberNo);
        formData.append('projectNo', reviewVo.projectNo);
        formData.append('backNo', reviewVo.backNo);
        formData.append('reviewContent', reviewVo.reviewContent);
        formData.append('reviewImg', imgObj);
        formData.append('rating', reviewVo.rating);

        fetch(`${baseURL}/userpage/review/write`, {
            method: "post",
            body: formData
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            alert("리뷰 작성이 완료되었습니다.");
            window.location.reload();
        });
    }

    return (
        <StyledReviewWriteDiv>
            <form>
                <div id='title'>
                    후기 작성
                </div>
                <div className='writer_area'>
                    <img src={loginMemberVo.pic} alt='프로필사진' />
                    <span>{loginMemberVo.name}</span>
                </div>
                <div className='rating_area'>
                    만족도 선택
                    <button className='ratings' name='rating1' onClick={handleRatingClick}>1.0</button>
                    <button className='ratings' name='rating2' onClick={handleRatingClick}>2.0</button>
                    <button className='ratings' name='rating3' onClick={handleRatingClick}>3.0</button>
                    <button className='ratings' name='rating4' onClick={handleRatingClick}>4.0</button>
                    <button className='ratings' name='rating5' onClick={handleRatingClick}>5.0</button>
                </div>
                <div className='content'>
                    <textarea name='reviewContent' onChange={handleInputChange}></textarea>
                </div>
                <input type='file' id='inputImg' name='reviewImg' accept='image/*' alt='리뷰이미지' hidden onChange={handleFileChange}/>
                <div className='upload'>
                    <div id='upload_area'>
                    이미지 업로드
                    <label htmlFor='inputImg'>사진 첨부</label>
                    </div>
                    <img id='img_preview'></img>
                </div>
                <button onClick={handleReviewSubmit}>
                    후기 등록
                </button>
            </form>
        </StyledReviewWriteDiv>
    );
};

export default ReviewWrite;