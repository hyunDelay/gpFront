import React, { useState } from 'react';
import styled from 'styled-components';
import { useProjectCreateMemory } from '../../context/ProjectCreateContext';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading';

const baseURL = process.env.REACT_APP_API_URL;

const StyledHeaderCreateProjectDiv = styled.div`

`;
const HeaderCreateProject = () => {
    
    const {projectCreateData, IsProjectInputChange, setIsProjectInputChange, dataFrom, headerFormVo, projectNo} = useProjectCreateMemory();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    
    // 저장하기
    const handleSaveData = (e) => {
        const { name } = e.target;
        // basic 저장
        if(name === 'basic'){
            const formData = new FormData();

            // 프로젝트 제목 검증
            if(headerFormVo.title && headerFormVo.title.length > 50){
                alert('프로젝트 제목이 50글자가 넘습니다.');
                return;
            }
            // 대분류 카테고리 검증
            if(headerFormVo.mainCategoryNo && headerFormVo.mainCategoryNo === 0){
                alert('대분류 카테고리를 선택해주세요.');
                return;
            }
            // 소분류 카테고리 검증
            if(headerFormVo.subCategoryNo && headerFormVo.subCategoryNo === 0){
                alert('소분류 카테고리를 선택해주세요.');
                return;
            }
            
            formData.append('no', projectNo.no);
            formData.append('title', headerFormVo.title);
            formData.append('mainCategoryNo', headerFormVo.mainCategoryNo);
            formData.append('subCategoryNo', headerFormVo.subCategoryNo);
            formData.append('imageUrl', headerFormVo.imageUrl);
            
            setLoading(true); // 로딩중 화면 표시
            fetch(`${baseURL}/project/save/basic`, {
                method: 'post',
                body: formData,
            })
            .then(resp => resp.json())
            .then(data => {
                if(data.msg === 'good'){
                    alert('프로젝트 내용이 저장되었습니다.');
                    navigate(`/projectCreate/main/index/basic/${projectNo.no}`);
                } else {
                    throw new Error();
                }
            })
            .catch(() => {
                //alert('오류가 발생했습니다. 다시 시도해주세요.');
            })
            .finally(() => {
                setLoading(false); // 로딩중 화면 끝
                setIsProjectInputChange(false);
                window.location.reload(); // 새로고침
            })
            ;
        }
        
        // plan 저장
        if(name === 'plan'){

            // 금액검증
            if(headerFormVo.goalAmount < 500000){
                alert('목표금액을 500,000원 이상으로 설정해주세요.');
                return;
            }

            setLoading(true); // 로딩중 화면 표시
            fetch(`${baseURL}/project/save/plan`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(headerFormVo),
            })
            .then(resp => resp.json())
            .then(data => {
                if(data.msg === 'good'){
                    alert('프로젝트 내용이 저장되었습니다.');
                    navigate(`/projectCreate/main/index/plan/${projectNo.no}`);
                } else {
                    throw new Error();
                }
            })
            .catch(() => {
                //alert('오류가 발생했습니다. 다시 시도해주세요.');
            })
            .finally(() => {
                setLoading(false); // 로딩중 화면 끝
                setIsProjectInputChange(false);
                window.location.reload(); // 새로고침
            })
            ;
            
        }

        // dateplan 저장
        if(name === 'dateplan'){

            setLoading(true); // 로딩중 화면 표시
            fetch(`${baseURL}/project/save/dateplan`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(headerFormVo),
            })
            .then(resp => resp.json())
            .then(data => {
                if(data.msg === 'good'){
                    alert('프로젝트 내용이 저장되었습니다.');
                } else {
                    throw new Error();
                }
            })
            .catch(() => {
                alert('오류가 발생했습니다. 다시 시도해주세요.');
            })
            .finally(() => {
                setLoading(false); // 로딩중 화면 끝
                setIsProjectInputChange(false);
                window.location.reload(); // 새로고침
            })
            ;
        }

        // userinfo 저장
        if(name === 'userinfo'){

            // 거래은행 검증
            if(headerFormVo.bankName && headerFormVo.bankName === '0'){
                alert('거래 은행을 선택해주세요.');
                return;
            }
            // 계좌번호 검증
            if(!headerFormVo.accountNum){
                alert('계좌번호를 입력해주세요.');
                return;
            }
            // 이름 검증
            if(!headerFormVo.name){
                alert('이름을 입력해주세요.');
                return;
            }

            const formData = new FormData();
            formData.append('projectNo', headerFormVo.projectNo);
            formData.append('bankName', headerFormVo.bankName);
            formData.append('name', headerFormVo.name);
            formData.append('accountNum', headerFormVo.accountNum);

            setLoading(true); // 로딩중 화면 표시
            fetch(`${baseURL}/project/save/userinfo`, {
                method: 'post',
                body: formData,
            })
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                if(data.msg === 'good'){
                    alert('프로젝트 내용이 저장되었습니다.');
                } 
            })
            .catch((e) => {
                
            })
            .finally(() => {
                setLoading(false); // 로딩중 화면 끝
                setIsProjectInputChange(false);
                window.location.reload(); // 새로고침
            })
            ;
        }

    }

    // 승인요청 
    const handleApproval = async (e) => { // 비동기 함수로 선언
        const target = e.target;
        
        // 승인요청이 아니면 return
        if (target.innerHTML !== '승인요청') {
          return;
        }
      
        // 사용자로부터 승인 여부를 확인받음
        const isApproved = window.confirm('프로젝트 승인을 요청하시겠습니까?');
        if (!isApproved) {
          return;
        }
      
        try {
            setLoading(true); // 로딩중 화면 표시
            const response = await fetch(`${baseURL}/project/save/approval?no=${projectNo.no}`);
            const data = await response.json();
        
            if (data.msg === 'good') {
                alert('승인 요청이 완료되었습니다.');
                navigate('/');
            } else {
                throw new Error();
            }
        } catch (error) {
            alert('승인 요청에 실패했습니다. 다시 시도해주세요.');
        } finally {
            setLoading(false); // 로딩중 화면 끝
        }
    };

    return (
        <StyledHeaderCreateProjectDiv>
            { // createMain 버튼
                (
                    projectCreateData ?
                        IsProjectInputChange ?
                        (
                            <button className="createMainStateBtn" name={dataFrom ? dataFrom : ''} onClick={handleSaveData}>저장하기</button>
                        )
                        :
                        ( 
                            <button
                                className="createMainStateBtn"
                                disabled={!(projectCreateData.totalCompletionRate === 100)}
                                onClick={handleApproval}
                            >
                            {
                                projectCreateData.totalCompletionRate === 100 ?
                                '승인요청'
                                :
                                `기획중 · ${projectCreateData.totalCompletionRate}% 완료`
                            }
                            </button>
                        )
                    :
                    ''
                )
            }
            {loading ? <Loading /> : ''}
        </StyledHeaderCreateProjectDiv>
    );
};

export default HeaderCreateProject;