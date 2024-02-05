import React, { useEffect, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import styled from 'styled-components';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import Loading from '../../../component/common/Loading';

const baseURL = process.env.REACT_APP_API_URL;

const StyledCategoryDiv = styled.div`
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
`;

const CategoryMain = () => {

    const navigate = useNavigate();
    const gridRef = useRef();
    const [loading, setLoading] = useState(false); // 로딩중 표시
    const [dataVo, setDataVo] = useState([]); // 데이터
    const [searchVo, setSearchVo] = useState({ mainCategory: '', subCategory: '' }); // 검색데이터
    const [pvo, setPvo] = useState(); // pvo
    const [activePage, setActivePage] = useState(1); // 현재페이지
    const [rowData, setRowData] = useState([]); // 행 데이터
    const [colDefs] = useState([ // 제목 데이터
        { headerName: "번호", field: "no", autoHeight: true, width: 50, headerClass: 'ag-header-cell-center', cellStyle: {textAlign: 'center'}},
        { headerName: "대분류명", field: "mainCategory" , autoHeight: true, headerClass: 'ag-header-cell-center'},
        { headerName: "소분류명", field: "subCategory", autoHeight: true, headerClass: 'ag-header-cell-center' },
        { headerName: "삭제상태", field: "delYn", autoHeight: true, width: 60, headerClass: 'ag-header-cell-center', cellStyle: {textAlign: 'center'} }
    ]);

    // 카테고리 조회
    useEffect(() => {
        setLoading(true);
        fetch(`${baseURL}/category/admin/list?pageNum=${activePage}`)
        .then(resp => resp.json())
        .then(data => {
            setDataVo(data?.categoryList);
            setPvo(data?.pvo);
        })
        .catch(() => {
            alert('데이터를 가져오는데 실패했습니다.');
        })
        .finally(() => {
            setLoading(false); // 로딩중 화면 끝
        });
        ;
    }, [activePage]);
    
    // 컬럼 데이터 채우기
    useEffect(() => {
        setRowData(dataVo);
    }, [dataVo]);

    // 숫자페이지 눌렀을때 데이터 불러오기
    const handlePageNumBtn = (pageNumber) => {
        setActivePage(pageNumber);
    }

    // 행 클릭시 해당 detail로 이동
    const rowClicked = (e) => {
        const no = e.data.no;
        navigate(`../category/detail/${no}`);
    }

    // 카테고리 생성페이지로 이동
    const createBtnClicked = (e) => {
        navigate(`../category/create`);
    }

    // 검색어 저장
    const searchInputChange = (e) => {
        const { name, value } = e.target;
        setSearchVo({
            ...searchVo,
            [name]: value,
        });
    }

    // 초기화 버튼
    const resetBtnClick = () => {
        setSearchVo({
            mainCategory: '',
            subCategory: ''
        });
    }
    
    // 검색버튼
    const searchBtnClick = () => {
        searchCategory();
    }

    // 검색 조회 함수
    const searchCategory = () => {
        const { mainCategory, subCategory } = searchVo; // 검색어

        fetch(`${baseURL}/category/admin/search?mainCategory=${mainCategory}&subCategory=${subCategory}&pageNum=${activePage}`)
        .then(resp => resp.json())
        .then(data => {
            setDataVo(data?.categoryList);
            setPvo(data?.pvo);
        })
        .catch(() => {
            alert('데이터를 가져오는데 실패했습니다.');
        })
        .finally(() => {
            setLoading(false); // 로딩중 화면 끝
        });
        ;
    };

    return (
        <StyledCategoryDiv>
            <h2>카테고리 관리</h2>
            
            <div className="searchArea">
                <Form>
                    <Container>
                        <Row>

                            <Col>
                                <InputGroup className="mb-2">
                                    <InputGroup.Text>대분류명</InputGroup.Text>
                                    <Form.Control name='mainCategory' onChange={searchInputChange} value={searchVo?.mainCategory} />
                                </InputGroup>
                            </Col>

                            <Col>
                                <InputGroup className="mb-2">
                                    <InputGroup.Text>소분류명</InputGroup.Text>
                                    <Form.Control name='subCategory' onChange={searchInputChange} value={searchVo?.subCategory} />
                                </InputGroup>
                            </Col>

                        </Row>
                    </Container>

                    <div className="btnArea">
                        <Button variant="secondary" onClick={resetBtnClick}>초기화</Button>
                        <Button variant="primary" onClick={searchBtnClick}>검색</Button>
                    </div>
                </Form>
            </div>

            <div className="totalArea">
                <div className="total">total <strong>{pvo ? pvo.listCount : ''}</strong></div>
                <div className="btnArea"><Button variant="primary" onClick={createBtnClicked}>카테고리 추가</Button></div>
            </div>
            <div className="agGridBox ag-theme-quartz">
                <AgGridReact 
                    ref={gridRef}
                    rowData={rowData} 
                    columnDefs={colDefs}
                    animateRows={true} // 행 애니메이션
                    domLayout='autoHeight' // 자동높이
                    onGridReady={(e) => {e.api.sizeColumnsToFit();}} // 칼럼꽉차게
                    onRowClicked={(e) => {rowClicked(e)}} // 행 클릭시 이벤트
                />
            </div>
            {
                pvo ? 
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
        </StyledCategoryDiv>
    );
};

export default CategoryMain;