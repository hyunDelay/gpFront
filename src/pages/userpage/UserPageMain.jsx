import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import UserCreated from './UserCreated';
import UserBacked from './UserBacked';
import UserReview from './UserReview';
import ProfileMenu from '../../component/userpage/ProfileMenu';
import UserProfile from './UserProfile';
import {UserPageContextProvider} from '../../component/context/UserPageContext';

const StyledUserPageMainDiv = styled.div`
    width: 1200px;
    margin: 0 auto;
`;

const UserPageMain = () => {

    const {temp} = useParams();

    return (
        <StyledUserPageMainDiv>
            <UserPageContextProvider>
                <ProfileMenu />
                {temp === "profile" ? <UserProfile /> : null}
                {temp === "created" ? <UserCreated /> : null}
                {temp === "backed" ? <UserBacked /> : null}
                {temp === "review" ? <UserReview /> : null}
                {/* <Routes>
                    <Route path={`profile/${no}`} element={<UserProfile />}></Route>
                    <Route path={`created/${no}`} element={<UserCreated />}></Route>
                    <Route path={`backed/${no}`} element={<UserBacked />}></Route>
                    <Route path={`review/${no}`} element={<UserReview />}></Route>
                </Routes> */}
            </UserPageContextProvider>
        </StyledUserPageMainDiv>
    );    
    

    
};

export default UserPageMain;