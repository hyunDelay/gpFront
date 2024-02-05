import React from 'react';
import styled from 'styled-components';
import AdminLogin from '../common/AdminLogin';
import { Route, Routes } from 'react-router-dom';
import Aside from '../common/Aside';
import Header from '../common/Header';
import CategoryMain from '../../pages/category/CategoryMain';
import BackerMain from '../../pages/backer/BackerMain';
import PaymentMain from '../../pages/payment/PaymentMain';
import ProjectMain from '../../pages/project/ProjectMain';
import UserMain from '../../pages/user/UserMain';
import CategoryDetail from '../../pages/category/CategoryDetail';
import ProjectDetail from '../../pages/project/ProjectDetail';
import CategoryCreate from '../../pages/category/CategoryCreate';
import UserDetail from '../../pages/user/UserDetail';

const StyledWrapDiv = styled.div`
    display: flex;
    background-color: #f5f5f5;
    & aside {
        width: 220px;
        min-height: 100vh;
        background-color: #333;
        color: #fff;
        box-sizing: border-box;
    }
`;

const StyledContainerDiv = styled.div`
    width: calc(100% - 220px);
    box-sizing: border-box;
    & > div {
        padding: 30px;
        box-sizing: border-box;
        & > h2 {
            font-size: 20px;
            font-weight: 500;
            color: #333;
            margin-bottom: 40px;
        }
    }
`;

const AdminMain = () => {
    return (
        <Routes>
            <Route path='/' element={<AdminLogin />} />
            <Route path="/*" element={
                <StyledWrapDiv>
                    <Aside />
                    <StyledContainerDiv>
                        <Header />
                        <Routes>
                            <Route path='/category/*' element={<CategoryMain />} />
                            <Route path='/category/detail/:no' element={<CategoryDetail />} />
                            <Route path='/category/create' element={<CategoryCreate />} />
                            <Route path='/backer/*' element={<BackerMain />} />
                            <Route path='/payment/*' element={<PaymentMain />} />
                            <Route path='/project/*' element={<ProjectMain />} />
                            <Route path='/project/detail/:no' element={<ProjectDetail />} />
                            <Route path='/user/*' element={<UserMain />} />
                            <Route path='/user/detail/:no' element={<UserDetail />} />
                            <Route path='/*' element={<h1>에러페이지</h1>} />
                        </Routes>
                    </StyledContainerDiv>
                </StyledWrapDiv>
            } />
        </Routes>
    );
};

export default AdminMain;