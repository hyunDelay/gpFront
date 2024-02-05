import React from 'react';
import { Spinner } from 'react-bootstrap';
import styled from 'styled-components';

const StyledLoading = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, .8);
    z-index: 100;
    & .spinner-border {
        --bs-spinner-width: 5rem;
        --bs-spinner-height: 5rem;
        --bs-spinner-border-width: 0.6em;
        border-color: rgba(255, 255, 255, .5);
        border-right-color: transparent;
    }
`;

const Loading = () => {
    return (
        <StyledLoading>
            <Spinner animation="border" size="sm" />
        </StyledLoading>
    );
};

export default Loading;