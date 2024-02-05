import React from 'react';
import styled from 'styled-components';
import { Route, Routes, useNavigate } from 'react-router-dom';
import UserPageMain from '../../../pages/userpage/UserPageMain';
import BackMain from '../../../pages/backingpage/BackMain';
import CreateMain from '../../../pages/projectpage/create/CreateMain';
import { useUserMemory } from '../../context/UserContext';
import ProjectMain from '../../../pages/projectpage/ProjectMain';
import ProfileSettingMain from '../../../pages/settingPage/ProfileSettingMain';
import Error from '../Error';
import MainPage from '../../../pages/mainpage/MainPage';

const StyledMainDiv = styled.div`
    width: 100%;
    padding: 30px 0 50px;
`;

const Main = () => {

    const navigate = useNavigate();

    const userVo = useUserMemory();

    return (
        <StyledMainDiv>
            <Routes>
                <Route path='/' element={<MainPage />}></Route>
                <Route path='/project/*' element={<ProjectMain/>} />
                <Route path='/userpage/:temp/:no' element={<UserPageMain />} />
                <Route path='/back/*' element={<BackMain />} />
                <Route path='/projectCreate/*' element={<CreateMain />} />
                <Route path='/settings' element={<ProfileSettingMain/>} />
                <Route path='/*' element={<Error />} />
            </Routes>
        </StyledMainDiv>
    );
};

export default Main;