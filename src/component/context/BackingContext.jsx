import React, { createContext, useContext, useEffect, useState } from 'react';
import { useUserMemory } from './UserContext';
import { useParams } from 'react-router-dom';

const baseURL = process.env.REACT_APP_API_URL;

// 컨텍스트 생성
const BackingMemory = createContext();

// 컨텍스트 사용
const useBackingMemory = () => {
    const obj = useContext(BackingMemory);
    return obj;
}

// 컨텍스트 Provider
const BackingMemoryProvider = ({children}) => {

    // useContext - loginMember
    const {loginMemberVo} = useUserMemory();
    
    // 서버에 전송할 데이터
    const [dataVo, setDataVo] = useState([]);

    // useParams
    const {projectNo, rewardNo} = useParams();
    
    // 프로젝트 정보, 후원 정보 fetch
    const loadBackingFormInfo = () => {
        fetch(`${baseURL}/back/process?projectNo=` + projectNo + "&rewardNo=" + rewardNo)
        .then(resp => {return resp.json()})
        .then(data => {
            setDataVo({
                ...data,
                "memberNo": loginMemberVo.no,
                "memberEmail": loginMemberVo.email,
            });
        })
        ;
    }
    
    // 렌더링 1번만
    useEffect(()=>{
        if(loginMemberVo !== undefined) {
            loadBackingFormInfo();
        }
    }, [loginMemberVo])

    // dataVo, setDataVo 객체 1개로 합치기
    const dataSet = {
        dataVo,
        setDataVo
    }
    
    return (
        <BackingMemory.Provider value={dataSet}>
            {children}
        </BackingMemory.Provider>
    );
};

export {useBackingMemory, BackingMemoryProvider};