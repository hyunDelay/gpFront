import React from 'react';
import styled from 'styled-components';
import ReviewStats from './ReviewStats';
import ReviewList from './ReviewList';

const StyledUserReviewDiv = styled.div`
    width: 1120px;
    padding: 50px;
    padding-left: 20px;
    display: flex;
    justify-content: space-between;
`;

const UserReview = () => {

    return (
        <StyledUserReviewDiv>      
            <ReviewStats />
            <ReviewList />
        </StyledUserReviewDiv>
    );
};

export default UserReview;