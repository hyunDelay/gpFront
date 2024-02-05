import React, { useEffect, useState } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Loading from '../../../component/common/Loading';

const baseURL = process.env.REACT_APP_API_URL;

const StyledProjectDetailDiv = styled.div`
    & .btnArea {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
    }
`;

const ProjectDetail = () => {
    const navigate = useNavigate();
    const { no } = useParams(); // 글번호 파라미터
    const [loading, setLoading] = useState(false); // 로딩중 표시
    const [dataVo, setDataVo] = useState({}); // 불러온 데이터 vo
    const [formVo, setFormVo] = useState({}); // 보낼 데이터 vo
    const [status, setStatus] = useState();
    const [selectEnabled, setSelectEnabled] = useState(false);

    // 데이터
    useEffect(() => {
        setLoading(true);
        fetch(`${baseURL}/admin/project/detail?no=${no}`)
        .then(resp => resp.json())
        .then(data => {
            setDataVo(data);
            setStatus(data.statusNo);
            console.log(data.statusNo);

            data.statusNo === '2' 
            ?
            // <>
            setSelectEnabled(true) 
            // setUpdatedEnabled(true)
            // </>
            :
            // <>
            setSelectEnabled(false)
            // setUpdatedEnabled(false)
            // </>
        })
        .catch(() => {
            alert('데이터를 불러오는데 실패했습니다.');
        })
        .finally(() => {
            setLoading(false); // 로딩중 화면 끝
        });
        ;
    }, []);


    // 승인반려 처리
    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    }

    const handleUpdateBtn = () => {



        // 심사중이 아닌 상태에 수정 버튼을 클릭한 경우 막기
        selectEnabled == true
        ?
        function() {
            setLoading(true);
            fetch(`${baseURL}/admin/project/update?no=${no}&statusNo=${status}`)
            .then(resp => resp.json())
            .then(data => {
                if(data.msg === 'good') {
                    alert('프로젝트 상태 수정 완료');
                    // setStatus(status);
                    window.location.reload();
                }
            })
            .catch(() => {
                alert('데이터를 불러오는 데 실패했습니다.');
            })
            .finally(()=>{
                setLoading(false);
            });

        }()
        :
        alert('심사중인 프로젝트에 대해서만 수정 권한이 있습니다.');
    }

    // 목록버튼
    const handleListBtn = () => {
        navigate('../project');
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormVo({
            ...formVo,
            [name]: value,
            'no': dataVo.no,
        });
    }

    return (
        <StyledProjectDetailDiv>

            <h2>프로젝트 상세</h2>

            <Table bordered responsive>
                <colgroup>
                    <col width='10%'/>
                    <col width='10%'/>
                    <col width='10%'/>
                    <col width='10%'/>
                    <col width='10%'/>
                    <col width='10%'/>
                    <col width='10%'/>
                    <col width='10%'/>
                </colgroup>
                <tbody>
                    <tr>
                        <td>프로젝트명</td>
                        <td colSpan={7}><Form.Control size="sm" type="text" defaultValue={dataVo?.title} disabled /></td>
                    </tr>
                    <tr>
                        <td>프로젝트 번호</td>
                        <td><Form.Control size="sm" type="text" defaultValue={dataVo?.no} disabled /></td>
                        <td>대분류 명</td>
                        <td><Form.Control size="sm" name='mainCategory' type="text" defaultValue={dataVo?.mainCategory} disabled /></td>
                        <td>소분류 명</td>
                        <td><Form.Control size="sm" name='subCategory' type="text" defaultValue={dataVo?.subCategory} onChange={handleInputChange} disabled/></td>
                        <td>창작자 명</td>
                        <td><Form.Control size="sm" type="text" name='member' defaultValue={dataVo?.memberName} disabled/></td>
                    </tr>
                    <tr>
                        <td>목표 금액</td>
                        <td><Form.Control size="sm" type="text" defaultValue={dataVo?.goalAmount} disabled /></td>
                        <td>모인 금액</td>
                        <td><Form.Control size="sm" type="text" defaultValue={dataVo?.currentAmount} disabled /></td>
                        <td>달성률</td>
                        <td><Form.Control size="sm" type="text" defaultValue={dataVo?.achievementRate} disabled /></td>
                        <td colSpan={2}></td>
                    </tr>
                    <tr>
                        <td>URL</td>
                        <td colSpan={7}><Form.Control size="sm" type="text" disabled /></td>
                    </tr>
                    <tr>
                        <td colSpan={8}></td>
                    </tr>
                    <tr>
                        <td colSpan={8}><strong>현황 정보</strong></td>
                    </tr>
                    <tr>
                        <td>현황</td>
                        <td><Form.Select size="sm" type="select" name='status' id='status' value={status} onChange={handleStatusChange} disabled={!selectEnabled}>
                            <option value="1">작성중</option>
                            <option value="2">심사중</option>
                            <option value="3">승인됨</option>
                            <option value="4">반려됨</option>
                            <option value="5">진행중</option>
                            <option value="6">펀딩종료(성공)</option>
                            <option value="7">펀딩종료(실패)</option>
                            </Form.Select></td>
                        <td colSpan={2}></td>
                        <td>등록일</td>
                        <td><Form.Control size="sm" type="text" defaultValue={dataVo?.enrollDate} disabled /></td>
                        <td>승인일</td>
                        <td><Form.Control size="sm" type="text" defaultValue={dataVo?.okDate} name='okDate' disabled/></td>
                    </tr>
                    <tr>
                        <td colSpan={4}></td>
                        <td>펀딩 시작일</td>
                        <td><Form.Control size="sm" type="text" defaultValue={dataVo?.startDate} disabled /></td>
                        <td>펀딩 종료일</td>
                        <td><Form.Control size="sm" type="text" defaultValue={dataVo?.endDate} disabled /></td>
                    </tr>
                    <tr>
                        <td colSpan={8}></td>
                    </tr>
                    <tr>
                        <td colSpan={8}><strong>선물 정보</strong></td>
                    </tr>
                    {
                        dataVo?.rewardList?.map((reward)=>{
                            return (
                                
                                    <tr>
                                    <td colSpan={7}><Form.Control size="sm" type="text" defaultValue={reward?.rewardName} disabled /></td>
                                    <td colSpan={7}><Form.Control size="sm" type="text" defaultValue={reward?.rewardAmount} disabled /></td>
                                    </tr>
                                
                            )
                        })
                    }
                    <tr>
                        <td colSpan={8}></td>
                    </tr>
                    <tr>
                        <td colSpan={8}><strong>정산 정보</strong></td>
                    </tr>
                    <tr>
                        <td>거래은행</td>
                        <td><Form.Control size="sm" type="text" defaultValue={dataVo?.bankName} disabled /></td>
                        <td>예금주 명</td>
                        <td><Form.Control size="sm" type="text" defaultValue={dataVo?.ownerName} disabled /></td>
                        <td>계좌번호</td>
                        <td colSpan={3}><Form.Control size="sm" type="text" defaultValue={dataVo?.accountNum} disabled /></td>
                    </tr>
                </tbody>
            </Table>

            <div className="btnArea">
                <Button variant="secondary" onClick={handleListBtn}>목록</Button>
                <Button variant="primary" onClick={handleUpdateBtn}>수정하기</Button>
            </div>

            {loading ? <Loading /> : ''}
        </StyledProjectDetailDiv>
    );
};

export default ProjectDetail;