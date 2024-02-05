import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import Loading from '../../../component/common/Loading';
import Pagination from 'react-js-pagination';
import ReactDatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';

const baseURL = process.env.REACT_APP_API_URL;

const StyledPaymentMainDiv = styled.div`
    // search
    & .searchArea {
        padding: 30px;
        background-color: #fff;
        border-radius: 5px;
        margin-bottom: 30px;
        box-shadow: 0 0 11px 0 rgba(0, 0, 0, .05);
        & .btnArea {
            display: flex;
            justify-content: flex-end;
            gap: 10px;
        }
    }
    & .input-group {
        & .input-group-text {
            font-size: 14px;
            color: #999;
        }
        & .form-control {
            font-size: 14px;
            &::placeholder {
                color: #ddd;
            }
        }
    }

    & .agGridBox {
        /* height: 500px; */
        height: 100%;
        width: 100%;
    }

    /* 각 행(tr.ag-row)의 높이를 자동으로 조절 */
    .ag-theme-quartz .ag-cell {
        white-space: normal !important; /* 텍스트 래핑 활성화 */
    }
    .pagination {
        justify-content: center;
        margin-top: 30px;
        & li {
            & .page-link {
                display: flex;
                align-items: center;
                justify-content: center;
                min-width: 31px;
                color: #333;
            }
            &.active .page-link {
                color: #fff;
            }
        }
    }
    .ag-header-cell-center {
        & .ag-header-cell-label {
            justify-content: center;
        }
    }

    & .totalArea {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        & .total {
            font-size: 14px;
            padding: 10px;
            letter-spacing: 1px;
            & strong {
                font-weight: 500;
            }
        }
        & .btnArea {
            & button {
                font-size: 14px;
            }
        }
    }

    // 페이지네이션
    .pagination {
        & li {

            & a {
                display: flex;
                width: 30px;
                height: 30px;
                justify-content: center;
                align-items: center;
            }
            &.active a {
                background-color: #333;
                color: #fff;
            }
        }
    }

    // 데이트피커
    .react-datepicker__input-container {
        height: 36px;

        & input {
            height: 100%;
            box-sizing: border-box;
            border: 1px solid #ddd;
            padding: 10px;
        }
    }
`;

const UserMain = () => {

    const navigate = useNavigate();
    const gridRef = useRef();


    const [loading, setLoading] = useState(false); // 로딩중 표시
    const [dataVo, setDataVo] = useState([]); // 데이터
    const [searchVo, setSearchVo] = useState({
        "name": "",
        "termStart": '',
        "termEnd": "",
        "pageNum": ""
    }); // 검색데이터
    const [pvo, setPvo] = useState({}); // pvo
    const [activePage, setActivePage] = useState(1); // 현재페이지
    const [rowData, setRowData] = useState([]); // 행 데이터
    const [colDefs] = useState([ // 제목 데이터
    { headerName: "번호", field: "no", autoHeight: true, width: 3, headerClass: 'ag-header-cell-center', cellStyle: {textAlign: 'center'}},
    { headerName: "이름", field: "name" , autoHeight: true, width: 30, headerClass: 'ag-header-cell-center', cellStyle: {textAlign: 'center'}},
    { headerName: "이메일", field: "email", autoHeight: true, width: 40,headerClass: 'ag-header-cell-center' , cellStyle: {textAlign: 'center'} },
    { headerName: "웹 사이트", field: "siteUrl", autoHeight: true, width: 40, headerClass: 'ag-header-cell-center', cellStyle: {textAlign: 'center'} },
    { headerName: "계정 생성 일자", field: "enrollDate", autoHeight: true, width: 30, headerClass: 'ag-header-cell-center', cellStyle: {textAlign: 'center'} },
    { headerName: "계정 수정 일자", field: "updateDate", autoHeight: true, width: 30, headerClass: 'ag-header-cell-center', cellStyle: {textAlign: 'center'} },
    { headerName: "회원 탈퇴 여부", field: "quitYn", autoHeight: true, width: 3, headerClass: 'ag-header-cell-center', cellStyle: {textAlign: 'center'} }
    ]);
    const [startDate, setStartDate] = useState(null); // 데이트피커
    const [endDate, setEndDate] = useState(null); // 데이트피커
    const [stay, setStay] = useState([]);

    // 유저 조회
    useEffect(() => {
        setStay(1);
        setLoading(true);
        fetch(`${baseURL}/admin/user?pageNum=${activePage}&name=${searchVo.name}&termStart=${searchVo.termStart}&termEnd=${searchVo.termEnd}`)
        .then(resp => resp.json())
        .then(data => {
            setDataVo(data?.voList);
            setPvo(data?.pvo);
        })
        .catch(() => {
            alert('데이터를 가져오는데 실패했습니다.');
        })
        .finally(() => {
            setLoading(false); // 로딩중 화면 끝
        });
        ;
    }, [activePage, stay]);

    // 컬럼 데이터 채우기
    useEffect(() => {
        setRowData(dataVo);
    }, [dataVo]);

    // 초기화 버튼
    const resetBtnClick = () => {
        setSearchVo({
            "name": "",
            "termStart": '',
            "termEnd": "",
        });
        setStay(0);
    }

    // 숫자페이지 눌렀을때 데이터 불러오기
    const handlePageNumBtn = (pageNumber) => {
        setActivePage(pageNumber);
    }

    // 행 클릭시 해당 detail로 이동
    const rowClicked = (e) => {
        const no = e.data.no;
        navigate(`../user/detail/${no}`);
    }

    // 후원날짜 change
    const handleStartDateChange = (date) => {
        setStartDate(date);
        setSearchVo({
            ...searchVo,
            'termStart': date ? format(date, 'yyyy.MM.dd') : '',
        });
    };
    // 후원날짜 change
    const handleEndDateChange = (date) => {
        setEndDate(date);
        setSearchVo({
            ...searchVo,
            'termEnd': date ? format(date, 'yyyy.MM.dd') : '',
        });
    };

    // searchVo 저장
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setSearchVo({
            ...searchVo,
            [name]: value,
        });
        console.log(e.target);
    }

    // 검색하기
    const handleSearchBtnClick = () => {
        setActivePage(1);
        setStay(2);
    }

    return (
        <StyledPaymentMainDiv>
            <h2>사용자 관리</h2>

            <div className="searchArea">
                <Form>
                    <Container>
                        <Row>
                            <Col>
                                <InputGroup className="mb-2">
                                    <InputGroup.Text>사용자명</InputGroup.Text>
                                    <Form.Control name='name' onChange={handleInputChange} value={searchVo?.name}/>
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <InputGroup className="mb-2">
                                    <InputGroup.Text>가입날짜</InputGroup.Text>
                                    <InputGroup.Text><FontAwesomeIcon icon={faCalendarDays} /></InputGroup.Text>
                                    <ReactDatePicker 
                                        name='termStart'
                                        dateFormat='yyyy-MM-dd' // 날짜 형태
                                        shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                                        selected={startDate}
                                        onChange={handleStartDateChange}
                                        selectsStart
                                        startDate={startDate}
                                        endDate={endDate}
                                        value={searchVo?.termStart}
                                    />
                                    <InputGroup.Text> ~ </InputGroup.Text>
                                    <ReactDatePicker 
                                        name='termEnd'
                                        dateFormat='yyyy-MM-dd' // 날짜 형태
                                        shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                                        selected={endDate}
                                        onChange={handleEndDateChange}
                                        selectsStart
                                        startDate={startDate}
                                        endDate={endDate}
                                        value={searchVo?.termEnd}
                                    />
                                </InputGroup>
                            </Col>
                        </Row>
                    </Container>

                    <div className="btnArea">
                        <Button variant="secondary" onClick={resetBtnClick}>초기화</Button>
                        <Button variant="primary" onClick={handleSearchBtnClick} >검색</Button>
                    </div>
                </Form>
            </div>

            <div className="totalArea">
                <div className="total">total <strong>{pvo ? pvo.listCount : ''}</strong></div>
            </div>
            <div className="agGridBox ag-theme-quartz">
                <AgGridReact 
                    ref={gridRef}
                    rowData={rowData} 
                    columnDefs={colDefs}
                    animateRows={true} // 행 애니메이션
                    domLayout='autoHeight' // 자동높이
                    onGridReady={(e) => {e.api.sizeColumnsToFit();}} // 칼럼꽉차게
                    onRowClicked={(e)=>{rowClicked(e)}} // 행 클릭시 이벤트
                />
            </div>
            {
                pvo.listCount ? 
                <Pagination
                    activePage={activePage} // 현재 보고있는 페이지 
                    itemsCountPerPage={pvo.boardLimit} // 한페이지에 출력할 아이템수
                    totalItemsCount={pvo.listCount} // 총 아이템수
                    pageRangeDisplayed={pvo.pageLimit} // 표시할 페이지수
                    onChange={handlePageNumBtn}> 
                </Pagination>
                :
                ''
            }
            
            {loading ? <Loading /> : ''}

        </StyledPaymentMainDiv>
    );
};

export default UserMain;