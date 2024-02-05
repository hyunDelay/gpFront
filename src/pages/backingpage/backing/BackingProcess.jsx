import React from 'react';
import {styled} from 'styled-components';
import ProjectBriefInfo from '../../../component/project/ProjectBriefInfo';
import BackingForm from './BackingForm';
import {BackingMemoryProvider, useBackingMemory} from '../../../component/context/BackingContext';

const baseURL = process.env.REACT_APP_API_URL;

const StyledBackingFormDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
`;

const BackingProcess = () => {

    return (
        <BackingMemoryProvider>
            <StyledBackingFormDiv>
                <ProjectBriefInfo />
                <BackingForm />
            </StyledBackingFormDiv>
        </BackingMemoryProvider>
    );
};

export default BackingProcess;