import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import ProjectListBoxInfo from '../../../component/project/ProjectListBoxInfo';

const baseURL = process.env.REACT_APP_API_URL;

const StyledAllDiv = styled.div`
    width: 100%;
    .inner {
        width: 1200px;
        padding: 20px;
        margin: 0 auto;
        & > div:first-child{
            & > div:first-child{
                font-size: 20px;
                font-weight: 500;
            }
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

    
    & > .achieveRate{
        border: 1px solid #112155;
        border-radius: 5px;
        padding: 5px 10px;
        margin-right: 10px;
    }
    & > .project_status{
        border: 1px solid #112155;
        border-radius: 5px;
        padding: 5px 10px;
        margin-right: 10px;
    }
`;

const CategoryPage = () => {

    const {no} = useParams();

    const [categoryVoList, setCategoryVoList] = useState([]);

    const [projectPcs, setProjectPcs] = useState([]);
    const [sendVo, setSendVo] = useState({
        "achievementRate" : "",
        "statusNo" : "",
    });

    useEffect(()=>{
        fetch(`${baseURL}/project/list/category?categoryNo=` + no + "&achievementRate=" + sendVo.achievementRate + "&statusNo=" + sendVo.statusNo)
        .then((resp)=>{return resp.json()})
        .then((data)=>{
            setCategoryVoList(data.voList);
            setProjectPcs(data.projectPcs);
        })
        .catch((e)=>{console.log("오류 : " + e);})
        ;
    }, [no, sendVo]);

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
                    <div>{categoryVoList[0]?categoryVoList[0].subCategory:null}</div>
                    <div>
                        <StyledSearchConditionDiv>
                            <select name='statusNo' className='project_status' defaultValue='all' onChange={handleSelectChange}>
                                <option value="">전체 프로젝트</option>
                                <option value="5">진행 중인 프로젝트</option>
                                <option value="6">성사된 프로젝트</option>
                                <option value="3">공개예정 프로젝트</option>
                            </select>

                            <select name='achievementRate' className='achieveRate' onChange={handleSelectChange}>
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
                        categoryVoList.map((vo)=>{
                            return(<ProjectListBoxInfo project={vo} key={vo.no}/>);
                        })

                    }
                </div>
            </div>
        </StyledAllDiv>
    );
};

export default CategoryPage;