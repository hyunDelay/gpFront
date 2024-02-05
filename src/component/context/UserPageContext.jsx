import React, { createContext, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const baseURL = process.env.REACT_APP_API_URL;

const UserPageContext = createContext();

const useUserPageContext = () => {
    const obj = useContext(UserPageContext);
    return obj;
}

const UserPageContextProvider = ({children}) => {

    const [profileVo, setProfileVo] = useState([]);

    const {no} = useParams();

    useEffect(()=> {
        fetch(`${baseURL}/userpage/profile?memberNo=`+no)
        .then(resp => resp.json())
        .then(data => {
            setProfileVo(data);
        })
    }, [profileVo]);

    return (
        <UserPageContext.Provider value={{profileVo, setProfileVo}}>
            {children}
        </UserPageContext.Provider>
    );
};

export {useUserPageContext, UserPageContextProvider};