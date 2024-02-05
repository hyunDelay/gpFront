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

const UserDetail = () => {

    const navigate = useNavigate();
    const { no } = useParams(); // 글번호 파라미터
    const [loading, setLoading] = useState(false); // 로딩중 표시
    const [dataVo, setDataVo] = useState({}); // 불러온 데이터 vo
    const [formVo, setFormVo] = useState({}); // 보낼 데이터 vo
    const [isChecked, setIsChecked] = useState(false); // 체크 여부를 저장하는 state 변수

    // 데이터 불러오기
    useEffect(() => {
        setLoading(true);
        fetch(`${baseURL}/admin/user/detail?no=${no}`)
        .then(resp => resp.json())
        .then(data => {
            setDataVo(data);
            console.log(data);
        })
        .catch(() => {
            alert('데이터를 불러오는데 실패했습니다.');
        })
        .finally(() => {
            setLoading(false); // 로딩중 화면 끝
        });
        ;
    }, []);

    // isChecked
    useEffect(() => {
        if (dataVo?.quitYn === 'Y') {
            console.log('와이');
            setIsChecked(true);
        } else {
            setIsChecked(false);
        }
    }, [dataVo?.quitYn]);

    // 목록버튼
    const handleListBtn = () => {
        navigate('../user');
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
        fetch(`${baseURL}/admin/user/edit`, {
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
                alert('사용자 정보를 수정했습니다.');
                navigate('../user');
            } else {
                throw new Error();
            }
        })
        .catch(() => {
            alert('카테고리 수정에 실패했습니다.')
        })
        .finally(() => {
            setLoading(false); // 로딩끝
            navigate('../user');
        })
        ;
    }

    console.log('formVo: ', formVo);
    console.log('dataVo: ', dataVo);
    return (
        <StyledCategoryDetailDiv>

            <h2>사용자 상세</h2>

            <Table bordered responsive>
                <colgroup>
                    <col width='10%'/>
                    <col width='*'/>
                    <col width='10%'/>
                    <col width='*'/>
                    <col width='10%'/>
                    <col width='*'/>
                </colgroup>
                <tbody>
                    <tr>
                        <td>회원 번호</td>
                        <td><Form.Control size="sm" type="text" defaultValue={dataVo?.no} disabled /></td>
                        <td>가입일</td>
                        <td><Form.Control size="sm" type="text" defaultValue={dataVo?.enrollDate} disabled /></td>
                        <td>탈퇴여부</td>
                        <td><Form.Check type="switch" name='quitYn' checked={isChecked} onChange={handleRadioChange} /></td>
                    </tr>
                    <tr>
                        <td>회원 이름</td>
                        <td colSpan={5}><Form.Control size="sm" type="text" name='name' defaultValue={dataVo?.name} onChange={handleInputChange} /></td>
                    </tr>
                    <tr>
                        <td>이메일</td>
                        <td colSpan={5}><Form.Control size="sm" name='email' type="text" defaultValue={dataVo?.email} onChange={handleInputChange} /></td>
                    </tr>
                    <tr>
                        <td>소개</td>
                        <td colSpan={5}><Form.Control size="sm" name='intro' type="text" defaultValue={dataVo?.intro} onChange={handleInputChange} /></td>
                    </tr>
                    <tr>
                        <td>사이트 URL</td>
                        <td colSpan={5}><Form.Control size="sm" type="text" defaultValue={dataVo?.siteUrl} disabled/></td>
                    </tr>
                </tbody>
            </Table>

            <div className="btnArea">
                <Button variant="secondary" onClick={handleListBtn}>목록</Button>
                <Button variant="primary" onClick={handleEdit}>수정</Button>
            </div>

            {loading ? <Loading /> : ''}
        </StyledCategoryDetailDiv>
    );
};

export default UserDetail;