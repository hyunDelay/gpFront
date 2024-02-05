import React from 'react';
import styled from 'styled-components';

const StyledFooterDiv = styled.div`
    margin-top: 160px;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid #f5f5f5;
    opacity: 0.7;
    
    & > div {
        font-size: 12px;
        color: #3d3d3d;
    }
`;

const Footer = () => {
    return (
        <StyledFooterDiv>
            <div>Designed and Developed by 2ZFunding</div>
        </StyledFooterDiv>
    );
};

export default Footer;