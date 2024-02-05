import React from 'react';
import styled from 'styled-components';
import ProfileArea from './ProfileArea';
import ProfileNav from './ProfileNav';

const StyledProfileMenuDiv = styled.div`
    width: 1200px;
    display: block;
`;

const ProfileMenu = () => {
    return (
        <StyledProfileMenuDiv>
            <ProfileArea />
            <ProfileNav />
        </StyledProfileMenuDiv>
    );
};

export default ProfileMenu;