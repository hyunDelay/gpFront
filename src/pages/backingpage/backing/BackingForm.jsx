import React from 'react';
import styled from 'styled-components';
import BackingDetails from './BackingDetails';
import PaymentCheck from './PaymentCheck';

const StyledBackingFormDiv = styled.div`
    width: 1200px;
    
    & > form {
        display: flex;
        justify-content: center;
        color: var(--black-color);
    }
`;

const BackingForm = () => {

    return (
        <StyledBackingFormDiv>
            <form>
                <BackingDetails />
                <PaymentCheck />
            </form>
        </StyledBackingFormDiv>
    );
};

export default BackingForm;