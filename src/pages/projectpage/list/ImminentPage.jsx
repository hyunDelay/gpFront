import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProjectListBoxInfo from '../../../component/project/ProjectListBoxInfo';

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

const StyledSearchConditionDiv = styled.div`
    width: 1200px;
    height: 80px;
    display: flex;
    align-items: center;

    
    & > .achieveRate {
        border: 1px solid #112155;
        border-radius: 5px;
        padding: 5px 10px;
        margin-right: 10px;
    }
`;

const ImminentPage = () => {

    const [imminentVoList, setImminentVoList] = useState([]);

    const [projectPcs, setProjectPcs] = useState([]);
    const [sendVo, setSendVo] = useState({
        "achievementRate" : "",
    });

    useEffect(()=>{
        fetch(`${baseURL}/list/imminent?achievementRate=` + sendVo.achievementRate)
        .then((resp)=>{return resp.json()})
        .then((data)=>{
            setImminentVoList(data.voList);
            setProjectPcs(data.projectPcs);
        })
        .catch((e)=>{console.log("오류 : " + e);})
        ;
    }, [sendVo]);

    const handleSelectChange = (e) => {
        const {name, value} = e.target;
        setSendVo({
            ...sendVo,
            [name] : value
        })
    }

    return (
        <StyledAllDiv>
            <div className='inner'>
                <div>
                    <div>
                        <StyledSearchConditionDiv>
                            <select name='achievementRate' defaultValue='' className='achieveRate' onChange={handleSelectChange}>
                                <option value="">달성률</option>
                                <option value="under75">75% 이하</option>
                                <option value="between">75% ~ 100%</option>
                                <option value="over100">100% 이상</option>
                            </select>
                        </StyledSearchConditionDiv>
                    </div>
                    <div><span>{projectPcs}</span>개의 프로젝트가 있습니다.</div>
                </div>
                <div>
                    {
                        imminentVoList.map((vo)=>{
                            return(<ProjectListBoxInfo project={vo} key={vo.no}/>);
                        })
                    }
                </div>
            </div>
        </StyledAllDiv>
    );
};

export default ImminentPage;