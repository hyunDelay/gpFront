import React, { useEffect } from 'react';
import styled from 'styled-components';
import Condition from '../../../component/search/Condition';
import { useSearchContext } from '../../../component/context/SearchContext';
import ProjectSearch from './ProjectSearch';
import { useParams } from 'react-router-dom';

const baseURL = process.env.REACT_APP_API_URL;

const StyledProjectSearchDiv = styled.div`
    width: 1200px;
    margin: auto;
`;

const SearchMain = () => {
    
    const {query} = useParams();

    const {conditionVo, searchedVo, setSearchedVo} = useSearchContext();

    useEffect(()=>{
        fetch(`${baseURL}/project/search?query=${query}&status=${conditionVo.status}&achievementRate=${conditionVo.achievementRate}`)
        .then(resp => resp.json())
        .then(data => {
            setSearchedVo(data);
        })
    }, [conditionVo])

    return (
        <StyledProjectSearchDiv>
            <Condition query={query}/>
            <ProjectSearch searched={searchedVo}/>
        </StyledProjectSearchDiv>
    );
};

export default SearchMain;