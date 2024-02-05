import React, { useEffect, useState } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Loading from '../../../component/common/Loading';

const baseURL = process.env.REACT_APP_API_URL;

const StyledCategoryDetailDiv = styled.div`
    & .btnArea {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
    }
`;

const CategoryDetail = () => {

    const navigate = useNavigate();
    const { no } = useParams(); // 글번호 파라미터
    const [loading, setLoading] = useState(false); // 로딩중 표시
    const [dataVo, setDataVo] = useState({}); // 불러온 데이터 vo
    const [formVo, setFormVo] = useState({}); // 보낼 데이터 vo
    const [isChecked, setIsChecked] = useState(false); // 체크 여부를 저장하는 state 변수

    // 데이터 불러오기
    useEffect(() => {
        setLoading(true);
        fetch(`${baseURL}/category/admin/detail?no=${no}`)
        .then(resp => resp.json())
        .then(data => {
            setDataVo(data);
        })
        .catch(() => {
            alert('데이터를 불러오는데 실패했습니다.');
        })
        .finally(() => {
            setLoading(false); // 로딩중 화면 끝
        });
        ;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // isChecked
    useEffect(() => {
        if (dataVo?.delYn === 'Y') {
            setIsChecked(true);
        } else {
            setIsChecked(false);
        }
    }, [dataVo?.delYn]);

    // 목록버튼
    const handleListBtn = () => {
        navigate('../category');
    }

    // formVo 저장
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormVo({
            ...formVo,
            [name]: value,
            'no': dataVo.no,
        });
    }

    // 삭제여부
    const handleRadioChange = (e) => {
        const {name} = e.target;
        setIsChecked(e.target.checked);

        setFormVo({
            ...formVo,
            [name]: e.target.checked ? 'Y' : 'N',
            'no': dataVo.no,
        });
    }

    // 수정하기
    const handleEdit = () => {

        // 빈값 검증
        if (!Object.keys(formVo).length) {
            alert('수정한 내용이 없습니다.');
            return;
        } 

        setLoading(true); // 로딩시작
        fetch(`${baseURL}/category/admin/edit`, {
            method: 'put',
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
                alert('카테고리를 수정했습니다.');
                navigate('../category');
            } else {
                throw new Error();
            }
        })
        .catch(() => {
            alert('카테고리 수정에 실패했습니다.')
        })
        .finally(() => {
            setLoading(false); // 로딩끝
            navigate('../category');
        })
        ;
    }

    return (
        <StyledCategoryDetailDiv>

            <h2>카테고리 상세</h2>

            <Table bordered responsive>
                <colgroup>
                    <col width='20%'/>
                    <col width='*'/>
                    <col width='20%'/>
                    <col width='*'/>
                </colgroup>
                <tbody>
                    <tr>
                        <td>번호</td>
                        <td colSpan={3}><Form.Control size="sm" type="text" defaultValue={dataVo?.no} disabled /></td>
                    </tr>
                    <tr>
                        <td>대분류 번호</td>
                        <td><Form.Control size="sm" type="text" name='mainCategoryNo' defaultValue={dataVo?.mainCategoryNo} onChange={handleInputChange} /></td>
                        <td>대분류 명</td>
                        <td><Form.Control size="sm" name='mainCategory' type="text" defaultValue={dataVo?.mainCategory} onChange={handleInputChange} /></td>
                    </tr>
                    <tr>
                        <td>소분류 번호</td>
                        <td><Form.Control size="sm" name='subCategoryNo' type="text" defaultValue={dataVo?.subCategoryNo} onChange={handleInputChange} /></td>
                        <td>소분류 명</td>
                        <td><Form.Control size="sm" name='subCategory' type="text" defaultValue={dataVo?.subCategory} onChange={handleInputChange} /></td>
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
                <Button variant="primary" onClick={handleEdit}>수정하기</Button>
            </div>

            {loading ? <Loading /> : ''}
        </StyledCategoryDetailDiv>
    );
};

export default CategoryDetail;