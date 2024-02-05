import React from 'react';
import styled from 'styled-components';
import ProjectBoxInfo from '../../../component/project/ProjectBoxInfo';

const StyledProjectSearchDiv = styled.div`
    width: 1200px;
    display: flex;
    flex-wrap: wrap;
`;

const ProjectSearch = ({searched}) => {
 
    return (
        <StyledProjectSearchDiv>
            
            {searched!==undefined && searched!==null
            ?
            searched.map((vo)=> {
                return <ProjectBoxInfo key={vo.projectNo} no={4} project={vo}/>
            })
            :
            <div>
                검색 결과 없음
            </div>}
        
        </StyledProjectSearchDiv>
    );
};

export default ProjectSearch;