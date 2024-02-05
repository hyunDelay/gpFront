import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProjectPrelaunchListBoxInfo from '../../../component/project/ProjectPrelaunchListBoxInfo';

const baseURL = process.env.REACT_APP_API_URL;

const StyledAllDiv = styled.div`
    width: 100%;
    .inner {
        width: 1200px;
        margin: 0 auto;
        padding: 20px;
        & > div:first-child{
            & > div:last-child{
                & > span{
                    color: var(--red-color);
                }
                margin-top: 20px;
                margin-bottom: 25px;
            }
            
        }
        & > div:last-child{
            display: flex;
            flex-wrap: wrap;
        }
    }
`;

const PrelaunchPage = () => {

    const [prelaunchVoList, setPrelaunchVoList] = useState([]);

    const [projectPcs, setProjectPcs] = useState([]);

    useEffect(()=>{
        fetch(`${baseURL}/project/list/prelaunch`)
        .then((resp)=>{return resp.json()})
        .then((data)=>{
            setPrelaunchVoList(data.voList);
            setProjectPcs(data.projectPcs);
        })
        .catch((e)=>{console.log("오류 : " + e);})
        ;
    }, []);

    return (
        <StyledAllDiv>
            <div className='inner'>
                <div>
                    <div><span>{projectPcs}</span>개의 프로젝트가 있습니다.</div>
                </div>
                <div>
                    {
                        prelaunchVoList.map((vo)=>{
                            return(<ProjectPrelaunchListBoxInfo project={vo} key={vo.no}/>);
                        })
                    }
                </div>
            </div>
        </StyledAllDiv>
    );
};

export default PrelaunchPage;