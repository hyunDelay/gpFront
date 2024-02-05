import React from 'react';
import styled from 'styled-components';
import Header from './header/Header';
import Footer from './footer/Footer';
import Main from './main/Main';
import { HeaderMemoryProvider } from '../context/HeaderContext';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../../pages/memberPage/LoginPage';
import JoinPage from './../../pages/memberPage/JoinPage';
import FindPwdPage from './../../pages/memberPage/FindPwdPage';
import NewPwdPage from './../../pages/memberPage/NewPwdPage';
import QuitPage from './../../pages/memberPage/QuitPage';
import { UserMemoryProvider } from '../context/UserContext';
import { IsFirstMemoryProvider } from '../context/IsFirstContext';
import { ProjectCreateMemoryProvider } from '../context/ProjectCreateContext';
import { SearchContextProvider } from '../context/SearchContext';
import AdminMain from '../../admin/component/main/AdminMain';

const StyledWrapDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const Wrap = () => {
    return (
        <HeaderMemoryProvider>
            <UserMemoryProvider>
                <IsFirstMemoryProvider>
                    <SearchContextProvider>
                        <ProjectCreateMemoryProvider>
                            <Routes>
                                <Route path="/*" element={
                                    <StyledWrapDiv>
                                        <Header />
                                        <Main />
                                        <Footer />
                                    </StyledWrapDiv>
                                } />
                                <Route path='/login' element={<LoginPage />} />
                                <Route path='/join' element={<JoinPage />} />
                                <Route path='/pwd' element={<FindPwdPage />} />
                                <Route path='/newPwd' element={<NewPwdPage />} />
                                <Route path='/quit' element={<QuitPage />} />
                                <Route path='/admin/*' element={<AdminMain />} />
                            </Routes>
                        </ProjectCreateMemoryProvider>
                    </SearchContextProvider>
                </IsFirstMemoryProvider>
            </UserMemoryProvider>
        </HeaderMemoryProvider>
    );
};

export default Wrap;