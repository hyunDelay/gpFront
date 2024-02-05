import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


const StyledMainPageDiv = styled.div`
    width: 100vw;
    margin: auto;
    display: flex;
    flex-direction: column;
    color: var(--black-color);

    & > #mainimg {
        background-color: white;
        display: position;

        & > img {
            width: 100%;
            height: 300px;
            opacity: 1.0;
            object-fit: cover;
        }

    }

    & > #slogan {
        margin: auto;
        margin-top: 40px;
        margin-bottom: 20px;
        font-size: 30px;
    }

    & > button {
        width: 150px;
        height: 42px;
        background-color: var(--red-color);
        color: white;
        margin: auto;
        border-radius: 10px;
    }
`;

const MainPage = () => {

    const navigate = useNavigate();

    const handleBtnClick = () => {
        navigate('../project/list/popular');
    }

    return (
        <StyledMainPageDiv>
            <div id='mainimg'>
                <img src='http://34.198.44.180:8080/gamepound/resources/images/mainImg/mainimg.gif'></img>
            </div>
            <div id='slogan'>Pound for Indie Games</div>
            <button onClick={handleBtnClick}>프로젝트 둘러보기</button>
            
        </StyledMainPageDiv>
    );
};


export default MainPage;