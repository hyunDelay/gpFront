import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useProjectCreateMemory } from '../../../component/context/ProjectCreateContext';
import { useParams } from 'react-router';

const baseURL = process.env.REACT_APP_API_URL;

const StyledCreateRewardDiv = styled.div`
    & .inner {
        display: flex;
        gap: 60px;
        width: 1200px;
        margin: 0 auto;
        padding: 40px 0;
        & .left {
            width: 300px;
            & dl {
                & dt {
                    margin-bottom: 20px;
                    font-size: 16px;
                    font-weight: 500;
                    color: #333;
                }
                & dd {
                    & ul {
                        display: flex;
                        flex-direction: column;
                        gap: 5px;
                        & li {
                            display: flex;
                            position: relative;
                            flex-direction: column;
                            border: 1px solid #ddd;
                            padding: 20px;
                            background-color: #fff;
                            box-sizing: border-box;
                            gap: 5px;
                            cursor: pointer;
                            &:hover,
                            &.active {
                                border-color: #333;
                            }
                            & .tit {
                                line-height: 17px;
                                padding-right: 65px;
                                box-sizing: border-box;
                                font-size: 16px;
                                color: #333;
                            }
                            & .content {
                                padding-right: 65px;
                                box-sizing: border-box;
                                font-size: 14px;
                                color: #A4A4A4;
                                &::after {
                                    content: ' 원';
                                }
                            }
                            & button {
                                display: flex;
                                padding: 3px 10px;
                                position: absolute;
                                top: 50%;
                                right: 20px;
                                margin-top: -12px;
                                cursor: pointer;
                            }
                        }
                        & li.noData {
                            cursor: default;
                            &:hover,
                            &.active {
                                border-color: #ddd;
                            }
                            & .content {
                                text-align: center;
                                padding-right: 0;
                                &::after {
                                    display: none;
                                }
                            }
                        }
                    }
                }
            }
        }
        & .right {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            width: calc(100% - 300px - 60px);
            & > dl {
                width: 100%;
                & > dt {
                    margin-bottom: 20px;
                    font-size: 16px;
                    font-weight: 500;
                    color: #333;
                }
                & > dd {
                    display: flex;
                    flex-direction: column;
                    gap: 40px;
                    & dl {
                        display: flex;
                        flex-direction: column;
                        gap: 5px;
                        & dt {
                            font-size: 13px;
                            color: #333;
                        }
                        & dd {
                            position: relative;
                            & input,
                            & textarea {
                                width: 100%;
                                box-sizing: border-box;
                                border: 1px solid #ddd;
                                padding: 7px 15px;
                                border-radius: 5px;
                                &:hover,
                                &:focus {
                                    outline: none;
                                    border-color: #333;
                                }
                            }
                            & textarea {
                                resize: none;
                                min-height: 80px;
                            }
                            & .won {
                                position: absolute;
                                top: 50%;
                                right: 15px;
                                margin-top: -11px;
                                font-size: 14px;
                                color: #333;
                            }
                            & input[name=amount] {
                                text-align: right;
                                padding-right: 42px;
                            }
                        }
                    }
                }
            }
            & .btnArea {
                display: flex;
                gap: 10px;
                & button {
                    display: flex;
                    align-items: center;
                    font-size: 14px;
                    background-color: #fff;
                    border: 1px solid #ddd;
                    padding: 10px 25px;
                    border-radius: 5px;
                    margin-top: 30px;
                    cursor: pointer;
                }
            }
        }
    }
`;

const ProjectRewardCreate = () => {
    
    const {projectCreateData, setProjectCreateData, setDataFrom, headerFormVo, setHeaderFormVo} = useProjectCreateMemory(); // 컨텍스트 데이터
    const [dataVo, setDataVo] = useState([]); // 프로젝트 정보
    const { projectNo } = useParams(); // 프로젝트 넘버 파라미터
    const [money, setMoney] = useState({}); // 금액
    const [rewardName, setRewardName] = useState(''); // 선물이름
    const [rewardNo, setRewardNo] = useState({}); // 선물번호
    const [isNewReward, setIsNewReward] = useState(true); // 수정인지 새로등록인지 판단
    const [isSave, setIsSave] = useState(false); // 저장여부 판단

    // 컨텍스트 데이터에 프로젝트 넘버 저장
    useEffect(() => {
        setProjectCreateData({
            ...projectCreateData,
            'mainVo': {
                'no': projectNo,
            },
        })
    }, []);

    // 데이터 불러오기
    useEffect(() => {
        fetch(`${baseURL}/project/get/reward?no=${projectNo}`)
        .then(resp => resp.json())
        .then(data => {
            if(data.msg === 'good'){
                setDataVo(data.voList);
                setMoney(data.vo?.amount);
                setHeaderFormVo({
                    ...headerFormVo,
                    'projectNo': projectNo,
                });
            }
        })
        ;
        setIsSave(false);
    }, [isSave]);

    // 데이터 보여주기
    const handleEditDataShow = (name, amount, no) => {
        // 수정하기 페이지 보여주기
        setIsNewReward(false);
        setRewardNo(no);
        setMoney(amount);
        setRewardName(name);
        setHeaderFormVo({
            ...headerFormVo,
            'amount': '',
            'name': '',
        });
    }

    // 초기화 되면서 no저장
    useEffect(() => {
        if(!isNewReward){
            setHeaderFormVo({
                ...headerFormVo,
                'no': rewardNo,
            });
        } else {
            setHeaderFormVo({});
        }
    }, [rewardNo]);

    // 수정하기 취소 (초기화)
    const handleCancle = () => {
        setMoney('');
        setRewardName('');
        setHeaderFormVo({});
        setIsNewReward(true);
    }

    // 콤마추가
    const addComma = (price) => {
        let returnString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return returnString;
    }

    // 금액 핸들링
    const handleMoneyChange = (e) => {
        const rawValue = e.target.value;
        const numericValue = parseFloat(rawValue.replace(/,/g, ''));
        const { name } = e.target;
      
        // NaN 처리
        if (!isNaN(numericValue)) {
            // 입력값이 1경 이하인지 확인
            if (numericValue <= 1000000000000) {
                const formattedValue = numericValue.toLocaleString();
                setMoney(formattedValue);
            } else {
                // 1경 이상일 경우, 원래 값으로 유지
                setMoney(money);
            }
        
            setHeaderFormVo({
                ...headerFormVo,
                [name]: numericValue,
                'projectNo': projectNo,
            });
        } else {
            // NaN일 경우, 0으로 설정
            setMoney(0);
            setHeaderFormVo({
                ...headerFormVo,
                [name]: 0,
                'projectNo': projectNo,
            });
        }
    };

    // rewardName 핸들링
    const handleRewardName = (e) => {
        setRewardName(e.target.value);

        const {name, value} = e.target;
        setHeaderFormVo({
            ...headerFormVo,
            [name]: value,
            'projectNo': projectNo,
        });
        setDataFrom('plan');
    }

    // 저장/수정
    const handleEditSave = () => {

        // no값이 있으면 수정하기, 없으면 새로만들기
        if(headerFormVo.no){ // 수정하기
            fetch(`${baseURL}/project/save/reword`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(headerFormVo),
            })
            .then(resp => resp.json())
            .then(data => {
                if(data.msg === 'good'){
                    alert('선물이 수정되었습니다.');
                    setIsSave(true);
                    handleCancle();
                } else {
                    alert('선물 수정에 실패했습니다. 다시 시도해주세요.');
                }
            })
            ;
        } else { // 새로만들기
            // 값 검증
            if(!headerFormVo.name || headerFormVo.name.trim() === ''){
                alert('선물 이름이 비어있습니다.');
                return;
            }
            if(headerFormVo.amount === undefined || headerFormVo.amount === null || headerFormVo.amount === 0){
                alert('선물 금액이 비어있습니다.');
                return;
            }
            fetch(`${baseURL}/project/create/reword`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(headerFormVo),
            })
            .then(resp => resp.json())
            .then(data => {
                if(data.msg === 'good'){
                    alert('선물이 저장되었습니다.');
                    setIsSave(true);
                    handleCancle();
                } else {
                    alert('선물 저장에 실패했습니다. 다시 시도해주세요.');
                }
            })
            ;
        }
    }

    // 삭제
    const handleDelete = (no) => {
        const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
        if(confirmDelete){
            fetch(`${baseURL}/project/delete/reword`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'no': no
                }),
            })
            .then(resp => resp.json())
            .then(data => {
                if(data.msg === 'good'){
                    alert('선물이 삭제되었습니다.')
                    setIsSave(true);
                    handleCancle();
                } else {
                    throw new Error();
                }
            })
            .catch(() => {
                alert('선물삭제에 실패했습니다.');
            })
            ;
        }
    }

    return (
        <StyledCreateRewardDiv>
            <div className="inner">

                <div className="left">
                    <dl>
                        <dt>내가만든 선물</dt>
                        <dd>
                            <ul>
                            {
                                dataVo && dataVo.length > 0 ?
                                dataVo.map((vo) => (
                                    <li key={vo.no} onClick={() => handleEditDataShow(vo.name, vo.amount, vo.no)}>
                                        <span className="tit">{vo.name}</span>
                                        <span className="content">{vo.amount}</span>
                                        <button onClick={() => handleDelete(vo.no)}>삭제</button>
                                    </li>
                                ))
                                :
                                <li className="noData">
                                    <span className="content">만든 선물이 없습니다.</span>
                                </li>
                            }
                            </ul>
                        </dd>
                    </dl>
                </div>

                <div className='right'>
                    {
                        isNewReward ?
                        <>
                            <dl>
                                <dt>선물 만들기</dt>
                                <dd>
                                    <dl className='item'>
                                        <dt>선물이름</dt>
                                        <dd>
                                            <input type="text" name='name' value={rewardName} onChange={(e)=>{handleRewardName(e)}}  />
                                        </dd>
                                    </dl>
                                    <dl className='item'>
                                        <dt>선물 금액</dt>
                                        <dd>
                                            <input 
                                                type="text" 
                                                name='amount' 
                                                value={money ? addComma(money) : ""}
                                                onChange={handleMoneyChange} 
                                            />
                                            <span className="won">원</span>
                                        </dd>
                                    </dl>
                                </dd>
                            </dl>
                            <div className="btnArea">
                                <button onClick={handleCancle}>초기화</button>
                                <button onClick={handleEditSave}>저장</button>
                            </div>
                        </>
                        :
                        <>
                            <dl>
                                <dt>선물 수정하기</dt>
                                <dd>
                                    <dl className='item'>
                                        <dt>선물이름</dt>
                                        <dd>
                                            <input type="text" name='name' value={rewardName} onChange={(e)=>{handleRewardName(e)}} />
                                        </dd>
                                    </dl>
                                    <dl className='item'>
                                        <dt>선물 금액</dt>
                                        <dd>
                                            <input 
                                                type="text" 
                                                name='amount' 
                                                value={money ? addComma(money) : ""}
                                                onChange={handleMoneyChange} 
                                            />
                                            <span className="won">원</span>
                                        </dd>
                                    </dl>
                                </dd>
                            </dl>
                            <div className="btnArea">
                                <button onClick={handleCancle}>취소</button>
                                <button onClick={handleEditSave}>저장</button>
                            </div>
                        </>
                    }


                    
                </div>

            </div>
        </StyledCreateRewardDiv>
    );
};

export default ProjectRewardCreate;