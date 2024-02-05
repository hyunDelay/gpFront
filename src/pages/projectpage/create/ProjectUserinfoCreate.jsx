import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useProjectCreateMemory } from '../../../component/context/ProjectCreateContext';
import { useParams } from 'react-router';

const baseURL = process.env.REACT_APP_API_URL;

const StyledCreateUserinfoDiv = styled.div`
    & .inner {
        width: 1200px;
        margin: 0 auto;
        padding: 40px 0;
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
            flex-wrap: wrap;
            justify-content: flex-end;
            gap: 40px 60px;
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
                    & > dd {

                    }
                }
            }
        }
    }
`;

const ProjectUserinfoCreate = () => {

    const { headerFormVo, setHeaderFormVo, setIsProjectInputChange, setDataFrom, setProjectCreateData, projectCreateData } = useProjectCreateMemory(); // 컨텍스트 데이터
    const { projectNo } = useParams(); // 파라미터
    const [dataVo, setDataVo] = useState(); // 받아온 데이터
    const [bankOptions, setBankOptions] = useState([]); // 은행 데이터
    const [selectedBank, setSelectedBank] = useState(''); // 은행 셀렉트

    // 데이터 조회
    useEffect(() => {
        fetch(`${baseURL}/project/get/userinfo?no=${projectNo}`)
        .then(resp => resp.json())
        .then(data => {
            setDataVo(data);
            setSelectedBank(data.bankName ? data.bankName : '');
        })
        .catch(() => {})
        ;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 은행 테이블 하드코딩
    useEffect(() => {
        const fetchedBankOptions = [
          { value: '0', label: '선택' },
          { value: '기업은행', label: '기업은행' },
          { value: '국민은행', label: '국민은행' },
          { value: '신한은행', label: '신한은행' },
          { value: '농협은행', label: '농협은행' },
          { value: '카카오뱅크', label: '카카오뱅크' },
        ];
        setBankOptions(fetchedBankOptions);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
            'projectNo': projectNo,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [projectNo, setProjectCreateData, setHeaderFormVo]);

    // headerFormVo 에 저장
    const handleOnchange = (e) => {
        const {name, value} = e.target;
        setHeaderFormVo({
            ...headerFormVo,
            [name]: value,
        });
        setIsProjectInputChange(true);
        setDataFrom('userinfo');
    }
    
    // 선택된 은행을 업데이트하는 함수
    const handleBankChange = (e) => {
        setSelectedBank(e.target.value);

        const {name, value} = e.target;
        setHeaderFormVo({
            ...headerFormVo,
            [name]: value,
        });
        setIsProjectInputChange(true);
        setDataFrom('userinfo');
    };

    return (
        <StyledCreateUserinfoDiv>
            <div className="inner">
                <dl>
                    <dt>임금 계좌</dt>
                    <dd>
                        <dl className='item'>
                            <dt>거래 은행</dt>
                            <dd>
                                <select name="bankName" onChange={handleBankChange} value={selectedBank}>
                                    {bankOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                    ))}
                                </select>
                            </dd>
                        </dl>
                        <dl className='item'>
                            <dt>예금주명</dt>
                            <dd>
                                <input type="text" name='name' defaultValue={dataVo?.name} onChange={handleOnchange} />
                            </dd>
                        </dl>
                    </dd>
                    <dd>
                        <dl className='item'>
                            <dt>계좌번호</dt>
                            <dd>
                                <input type="text" name='accountNum' defaultValue={dataVo?.accountNum} onChange={handleOnchange}  placeholder="'-' 하이픈 없이 작성" />
                            </dd>
                        </dl>
                    </dd>
                </dl>
            </div>
        </StyledCreateUserinfoDiv>
    );
};

export default ProjectUserinfoCreate;