import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BackBriefInfo from '../../component/back/BackBriefInfo';
// import { useUserMemory } from '../../component/context/UserContext';
import { useParams } from 'react-router-dom';

const baseURL = process.env.REACT_APP_API_URL;

const StyledUserBackedDiv = styled.div`
    padding-left: 20px;

    & > #cnt {
        height: 20px;
        margin-top: 20px;

        & > span {
            color: var(--red-color);
            font-weight: 500;
            margin-right: 3px;
            margin-left: 3px;
        }
    }

    & > .back_items {

        & > #success_cnt, #fail_cnt {
            height: 50px;
            margin-top: 40px;
            padding-bottom: 10px;
            font-size: 14px;
        }
    }
`;

const UserBacked = () => {

    // const {loginMemberVo} = useUserMemory();

    const [backedVo, setBackedVo] = useState({});
    let {cnt, successList, failList, successCnt, failCnt} = backedVo

    const {no} = useParams();

    useEffect(()=>{
        fetch(`${baseURL}/userpage/backed?user=` + no)
        .then(resp => resp.json())
        .then(data => {
            setBackedVo(data);
        })
        ;
    }, [])

    
    return (
        <StyledUserBackedDiv>
                <div id="cnt"><span>{cnt}</span>건의 후원 내역이 있습니다.</div>
                <div className='back_items'>
                    <div id='success_cnt'>후원 성공({successCnt}개)</div>
                    {
                        successCnt>0
                        ?
                        successList.map((item)=>{
                            return <BackBriefInfo key={item.backNo} item={item}/>
                        })
                        :
                        <div id='noItems'>
                        </div>
                    }
                </div>
                <div className='back_items'>
                    <div id='fail_cnt'>후원 실패({failCnt}개)</div>
                    {
                        failCnt>0
                        ?
                        failList.map((item)=>{
                            return <BackBriefInfo item={item}/>
                        })
                        :
                        <div id='noItems'>
                        </div>
                    }
                </div>
        </StyledUserBackedDiv>
    );
};

export default UserBacked;