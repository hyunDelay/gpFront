import { createContext, useContext, useState } from "react";

const IsFirstMemory = createContext();

const IsFirstMemoryProvider = ({ children }) => {

    const [isFirst, setIsFirst] = useState(true);
    
    return (
        <IsFirstMemory.Provider value={{ isFirst, setIsFirst }}>
            {children}
        </IsFirstMemory.Provider>
    );
};

const useIsFirstMemory = () => {
    const context = useContext(IsFirstMemory);
    if (!context) {
        throw new Error("IsFirstMemory 컴포넌트가 아닙니다.");
    }
    return context;
};

export { IsFirstMemoryProvider, useIsFirstMemory };