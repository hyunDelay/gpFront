import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DatePicker from "react-datepicker";
import { format } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from 'react-router-dom';
import { useProjectCreateMemory } from '../../../component/context/ProjectCreateContext';

const baseURL = process.env.REACT_APP_API_URL;

const StyledCreatePlanDiv = styled.div`
    padding: 40px 0;
    & .contentDiv {
        width: 1200px;
        margin: 0 auto;
        & input,
        & select {
            width: 100%;
            box-sizing: border-box;
            border: 1px solid #ddd;
            padding: 7px 15px;
            border-radius: 5px;
            &:hover,
            &:focus {
                border-color: #333;
                outline: none;
            }
        }
        & select {
            color: #999;
        }
        & > dl {
            display: flex;
            gap: 60px;
            & > dt {
                width: 300px;
                font-size: 16px;
                font-weight: 500;
                color: #333;
                &::after {
                    content: " *";
                    color: red;
                }
            }
            & > dd {
                display: flex;
                width: calc(100% - 300px - 60px);
                gap: 20px;
                & .item {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                    flex: 1;
                    & > dt {
                        font-size: 13px;
                        color: #333;
                    }
                    & dd {
                        position: relative;
                        & .won {
                            position: absolute;
                            top: 50%;
                            right: 15px;
                            margin-top: -11px;
                            font-size: 14px;
                            color: #333;
                        }
                        & input[name=goalAmount] {
                            text-align: right;
                            padding-right: 42px;
                        }
                        & > div {
                            width: 100%;
                        }
                    }
                }
            }
        }
        & > dl + dl {
            margin-top: 40px;
        }
    }
`;

const ProjectPlanCreate = () => {

    const [startDate, setStartDate] = useState(null); // 데이트피커
    const [endDate, setEndDate] = useState(null); // 데이트피커
    const { projectNo } = useParams(); // 파라미터
    const [money, setMoney] = useState(); // 금액
    const { headerFormVo, setHeaderFormVo, setIsProjectInputChange, setDataFrom, setProjectCreateData, projectCreateData } = useProjectCreateMemory(); // 보낼 컨텍스트 데이터

    // 컨텍스트 데이터에 프로젝트 넘버 저장
    useEffect(() => {
        setProjectCreateData({
            ...projectCreateData,
            'mainVo': {
                'no': projectNo,
            },
        })
        setHeaderFormVo({
            ...headerFormVo,
            'no': projectNo,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 데이터 불러오기
    useEffect(() => {
        fetch(`${baseURL}/project/get/plan?no=${projectNo}`)
        .then(resp => resp.json())
        .then(data => {
            setMoney(data.vo?.goalAmount);
            // dataVo 데이터가 들어온 후에 설정
            if (data.vo?.startDate) {
                setStartDate(new Date(data.vo.startDate));
            }
            if (data.vo?.endDate) {
                setEndDate(new Date(data.vo.endDate));
            }
        })
        ;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 콤마추가
    const addComma = (price) => {
        let returnString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return returnString;
    }

    // 목표금액 핸들링
    const handleInputChange = (e) => {
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
            });
            setIsProjectInputChange(true);
            setDataFrom('plan');
        } else {
            // NaN일 경우, 0으로 설정
            setMoney(0);
            setHeaderFormVo({
                ...headerFormVo,
                [name]: 0,
            });
            setIsProjectInputChange(true);
            setDataFrom('plan');
        }
    };

    // 시작날짜 저장
    const handleStartDateChange = (date) => {
        setStartDate(date);
        
        setHeaderFormVo({
            ...headerFormVo,
            'startDate': date ? format(date, 'yyyy-MM-dd') : '',
        });
        setIsProjectInputChange(true);
        setDataFrom('plan');
    };
    // 종료날짜 저장
    const handleEndDateChange = (date) => {
        setEndDate(date);

        setHeaderFormVo({
            ...headerFormVo,
            'endDate': date ? format(date, 'yyyy-MM-dd') : '',
        });
        setIsProjectInputChange(true);
        setDataFrom('plan');
    };

    return (
        <StyledCreatePlanDiv>
            <div className="contentDiv">
                <dl>
                    <dt>목표 금액</dt>
                    <dd>
                        <dl className='item'>
                            <dt>목표 금액</dt>
                            <dd>
                                <input 
                                    type="text" 
                                    name='goalAmount' 
                                    value={money ? addComma(money) : ""}
                                    placeholder='50만원 이상의 금액을 입력해주세요' 
                                    onChange={handleInputChange}
                                />
                                <span className='won'>원</span>
                            </dd>
                        </dl>
                    </dd>
                </dl>
                <dl>
                    <dt>펀딩 일정</dt>
                    <dd>
                        <dl className='item'>
                            <dt>시작일</dt>
                            <dd>
                                <DatePicker 
                                    dateFormat='yyyy-MM-dd' // 날짜 형태
                                    shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                                    selected={startDate}
                                    onChange={handleStartDateChange}
                                    minDate={new Date()} // 시작일은 오늘 이후로 선택
                                    selectsStart
                                    startDate={startDate}
                                    endDate={endDate}
                                />
                            </dd>
                        </dl>
                        <dl className='item'>
                            <dt>종료일</dt>
                            <dd>
                                <DatePicker
                                    dateFormat='yyyy-MM-dd' // 날짜 형태
                                    shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                                    selected={endDate}
                                    onChange={handleEndDateChange}
                                    selectsEnd
                                    startDate={startDate}
                                    endDate={endDate}
                                    minDate={startDate} // 종료일은 시작일 이후여야 함
                                />
                            </dd>
                        </dl>
                    </dd>
                </dl>
            </div>
        </StyledCreatePlanDiv>
    );
};

export default ProjectPlanCreate;