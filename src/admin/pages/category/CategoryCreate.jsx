import React, { useState } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Loading from '../../../component/common/Loading';

const baseURL = process.env.REACT_APP_API_URL;

const StyledCategoryCreateDiv = styled.div`
    & .btnArea {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
    }
`;

const CategoryCreate = () => {

    const navigate = useNavigate();
    const [formVo, setFormVo] = useState({}); // 보낼 데이터 vo
    const [loading, setLoading] = useState(false); // 로딩중 표시
    const [isChecked, setIsChecked] = useState(false); // 체크 여부를 저장하는 state 변수

    // formVo 저장
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormVo({
            ...formVo,
            [name]: value,
        });
    }
    
    // 삭제여부
    const handleRadioChange = (e) => {
        const {name} = e.target;
        setIsChecked(e.target.checked);
        
        setFormVo({
            ...formVo,
            [name]: e.target.checked ? 'Y' : 'N',
        });
    }

    // 생성하기
    const handleCreateCategory = () => {

        // 빈값 검증
        function isEmpty(value) {
            return value === undefined || value === null || value === '';
        }
        
        if (!Object.keys(formVo).length) {
            alert('생성할 내용이 없습니다.');
            return;
        } else if (isEmpty(formVo.mainCategory)) {
            alert('대분류명을 입력해주세요.');
            return;
        } else if (isEmpty(formVo.mainCategoryNo)) {
            alert('대분류번호를 입력해주세요.');
            return;
        } else if (isEmpty(formVo.subCategory)) {
            alert('소분류명을 입력해주세요.');
            return;
        } else if (isEmpty(formVo.subCategoryNo)) {
            alert('소분류번호를 입력해주세요.');
            return;
        }

        setLoading(true); // 로딩시작
        fetch(`${baseURL}/category/admin/create`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formVo),
        })
        .then(resp => {
            if(resp.ok){
                return resp.text();
            } else {
                throw new Error();
            }
        })
        .then(data => {
            if(data === 'good'){
                alert('카테고리를 생성했습니다.');
            } else {
                throw new Error();
            }
        })
        .catch(() => {
            alert('카테고리 생성에 실패했습니다.')
        })
        .finally(() => {
            setLoading(false); // 로딩끝
            navigate('../category');
        })
        ;
    }

    // 목록버튼
    const handleListBtn = () => {
        navigate('../category');
    }

    return (
        <StyledCategoryCreateDiv>
            <h2>카테고리 생성</h2>

            <Table bordered responsive>
                <colgroup>
                    <col width='20%'/>
                    <col width='*'/>
                    <col width='20%'/>
                    <col width='*'/>
                </colgroup>
                <tbody>
                    <tr>
                        <td>대분류 번호</td>
                        <td><Form.Control size="sm" type="text" name='mainCategoryNo' onChange={handleInputChange} /></td>
                        <td>대분류 명</td>
                        <td><Form.Control size="sm" name='mainCategory' type="text" onChange={handleInputChange} /></td>
                    </tr>
                    <tr>
                        <td>소분류 번호</td>
                        <td><Form.Control size="sm" name='subCategoryNo' type="text" onChange={handleInputChange} /></td>
                        <td>소분류 명</td>
                        <td><Form.Control size="sm" name='subCategory' type="text" onChange={handleInputChange} /></td>
                    </tr>
                    <tr>
                        <td>삭제여부</td>
                        <td colSpan={3}>
                            <Form.Check type="switch" name='delYn' checked={isChecked} onChange={handleRadioChange} />
                        </td>
                    </tr>
                </tbody>
            </Table>

            <div className="btnArea">
                <Button variant="secondary" onClick={handleListBtn}>목록</Button>
                <Button variant="primary" onClick={handleCreateCategory}>생성하기</Button>
            </div>

            {loading ? <Loading /> : ''}
        </StyledCategoryCreateDiv>
    );
};

export default CategoryCreate;