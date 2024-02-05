import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const HeaderMemory = createContext();

let prevPathname = ''; 

const HeaderMemoryProvider = ({ children }) => {
    const [pageType, setPageType] = useState('');
    const location = useLocation();

    const updatePageType = (newPageType) => {
        setPageType(newPageType);
    };

    useEffect(() => {
        // 페이지 이동 시 페이지 타입 초기화
        if (pageType !== '' && location.pathname !== prevPathname) {
            updatePageType('');
        }
    
        // 현재 경로를 이전 경로로 업데이트
        prevPathname = location.pathname;
    }, [location, pageType]);

    return (
        <HeaderMemory.Provider value={{ pageType, updatePageType }}>
            {children}
        </HeaderMemory.Provider>
    );
};

const useHeaderMemory = () => {
    const context = useContext(HeaderMemory);
    if (!context) {
        throw new Error("HeaderMemoryProvider 컴포넌트가 아닙니다.");
    }
    return context;
};

export { HeaderMemoryProvider, useHeaderMemory };