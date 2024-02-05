import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

const SearchContext = createContext();

const useSearchContext = () => {
    const obj = useContext(SearchContext);
    return obj;
}

const SearchContextProvider = ({children}) => {

    const [keyword, setKeyword] = useState();
    const [searchedVo, setSearchedVo] = useState([]);
    const [conditionVo, setConditionVo] = useState([{
        "query": "",
        "status": "",
        "achievementRate": ""
    }]);

    return (
        <SearchContext.Provider value={{keyword, setKeyword, searchedVo, setSearchedVo, conditionVo, setConditionVo}}>
            {children}
        </SearchContext.Provider>
    );
};

export {useSearchContext, SearchContextProvider};