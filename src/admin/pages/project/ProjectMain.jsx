import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import styled from 'styled-components';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Pagination from 'react-js-pagination';

const baseURL = process.env.REACT_APP_API_URL;

const StyledProjectDiv = styled.div`

    & .pagination {
        justify-content: center;
        margin-top: 30px;
        & li {
            & a {
                display: flex;
                align-items: center;
                justify-content: center;
                min-width: 31px;
                color: #333;
            }
            &.active a {
                background-color: #333;
                color: #fff;
            }
        }
    }

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

    
    .ag-header-cell-center {
        & .ag-header-cell-label {
            justify-content: center;
        }
    }

    & .totalArea {
        font-size: 14px;
        padding: 10px;
        letter-spacing: 1px;
        & strong {
            font-weight: 500;
        }
    }
`;

const ProjectMain = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // 로딩중
    const [categoryList, setCategoryList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState();
    const [activePage, setActivePage] = useState(1);
    const [conditionVo, setConditionVo] = useState({
        activePage: activePage
    }); // 검색조건
    // const {mainCategory, subCategory, status, projectTitle, creator} = conditionVo;
    const [pageVo, setPageVo] = useState({
        listCount:0,
        activePage:activePage,
        boardLimit: 10,
        pageLimit: 5
    });
    const [rowData, setRowData] = useState([]);
    const [colDefs, setColDefs] = useState([
        { headerName: "번호", field: "no", autoHeight: true, width: 40, headerClass: 'ag-header-cell-center', cellStyle: {textAlign: 'center'}},
        { headerName: "대분류", field: "mainCategory", autoHeight: true, width: 100, headerClass: 'ag-header-cell-center', cellStyle: {textAlign: 'center'} },
        { headerName: "소분류", field: "subCategory", autoHeight: true, width: 100, headerClass: 'ag-header-cell-center', cellStyle: {textAlign: 'center'}  },
        { headerName: "프로젝트명", field: "title", autoHeight: true, width: 400, headerClass: 'ag-header-cell-center'},
        { headerName: "현황", field: "statusName", autoHeight: true, width: 80, headerClass: 'ag-header-cell-center', cellStyle: {textAlign: 'center'}  },
    ]);

    // 숫자페이지 눌렀을때 데이터 불러오기
    const handlePageNumBtn = (pageNumber) => {
        setActivePage(pageNumber);
    }

    // 행 클릭 시 해당 detail페이지로 이동
    const rowClicked = (e) => {
        const no = e.data.no;
        navigate(`../project/detail/${no}`)
    }

    // 프로젝트 조회
    useEffect(()=>{
        setLoading(true);
        fetch(`${baseURL}/admin/project?currentPage=${activePage}`)
        .then(resp => resp.json())
        .then(data => {

            if(data.error === 'Unauthorized') {
                alert('로그인 필요');
                navigate('/admin/');    
            }

            setPageVo({
                ...pageVo,
                listCount: parseInt(data?.cnt)
            })

            setRowData(data?.projectList);
        })
        .catch( () => {
            alert('데이터를 가져오는 데 실패했습니다.');
        })
        .finally(
            setLoading(false)
        )
        ;
    }, [activePage])

    // 검색조건 불러오기(카테고리)
    useEffect(()=>{
        fetch(`${baseURL}/category/list`)
        .then(resp => resp.json())
        .then(data => {
            setCategoryList(data);
        })
        .catch(() => {
            alert('데이터를 가져오는데 실패했습니다.');
        })
        .finally(() => {
            setLoading(false); // 로딩중 화면 끝
        });
    }, [])

    // 선택된 대분류에 따라 소분류 목록 바꿔주고 conditionVo에 대분류 value 넣어주기
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setConditionVo({
            ...conditionVo,
            mainCategory: e.target.value
        })
    };

    // 초기화 버튼
    const resetBtnClick = () => {
        setConditionVo({
            activePage: 1
        });

        window.location.reload();
    }

    // conditionVo 세팅
    const handleSearchInputChange = (e) => {
        const {name, value} = e.target;

        setConditionVo({
            ...conditionVo,
            [name]: value
        })
    }

    // 프로젝트 검색
    const handleSearchBtn = () => {

        fetch(`${baseURL}/admin/project/search`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(conditionVo)
        })
        .then(resp => resp.json())
        .then(data => {
            setPageVo({
                ...pageVo,
                listCount: parseInt(data?.cnt)
            })

            setRowData(data?.projectList);
        })
        .catch(() => {
            alert('데이터를 가져오는데 실패했습니다.');
        })
        .finally(() => {
            setLoading(false); // 로딩중 화면 끝
        });
    }

    return (
        <StyledProjectDiv>
            <h2>프로젝트 관리</h2>
            
            <div className="searchArea">
                <Form>
                    <InputGroup className="mb-2">
                        <InputGroup.Text>대분류</InputGroup.Text>
                        <Form.Select name='mainCategory' onChange={handleCategoryChange}>
                            <option value='all'>전체</option>
                            {
                                categoryList?.map(category=>{
                                    return <option key={category?.mainCategory} value={category?.mainCategory}>
                                        {category?.mainCategory}
                                    </option>
                                })
                            }
                        </Form.Select>
                        <InputGroup.Text>소분류</InputGroup.Text>
                        <Form.Select name='subCategory' onChange={handleSearchInputChange}>
                            <option value='all'>전체</option>
                            
                            {
                                selectedCategory == '비디오게임'
                                ?
                                categoryList[0]?.subCategoryList.map(subCategory => {
                                    return <option key={subCategory?.subCategory} value={subCategory?.subCategory}>
                                        {subCategory?.subCategory}
                                    </option>
                                })
                                :
                                (selectedCategory == '모바일게임'
                                ?
                                categoryList[1]?.subCategoryList.map(subCategory => {
                                    return <option key={subCategory?.subCategory} value={subCategory?.subCategory}>
                                        {subCategory?.subCategory}
                                    </option>
                                })
                                :
                                <></>)
                            }

                        </Form.Select>
                        <InputGroup.Text>현황</InputGroup.Text>
                        <Form.Select name='status' onChange={handleSearchInputChange}>
                            <option value='all'>전체</option>
                            <option value='심사중'>심사중</option>
                            <option value='승인됨'>승인됨</option>
                            <option value='반려됨'>반려됨</option>
                            <option value='진행중'>진행중</option>
                            <option value='펀딩 성공'>펀딩종료(성공)</option>
                            <option value='펀딩 무산'>펀딩종료(실패)</option>
                        </Form.Select>
                    </InputGroup>
                    <InputGroup className="mb-2">
                        <InputGroup.Text>프로젝트명</InputGroup.Text>
                        <Form.Control placeholder="프로젝트명" name='projectTitle' onChange={handleSearchInputChange}/>
                    </InputGroup>
                    <InputGroup className="mb-2">
                        <InputGroup.Text>창작자명</InputGroup.Text>
                        <Form.Control placeholder="창작자명" name='creator' onChange={handleSearchInputChange} />
                    </InputGroup>

                    <div className="btnArea">
                        <Button variant="secondary" onClick={resetBtnClick}>초기화</Button>
                        <Button variant="primary" onClick={handleSearchBtn}>검색</Button>
                    </div>
                </Form>
            </div>

            <div className="totalArea">
                total <strong>{pageVo ? pageVo.listCount : ''}</strong>
            </div>
            <div className="agGridBox ag-theme-quartz">
                <AgGridReact
                    rowData={rowData} 
                    columnDefs={colDefs}
                    animateRows={true} // 행 애니메이션
                    domLayout='autoHeight' // 자동높이
                    onGridReady={(e) => {e.api.sizeColumnsToFit();}} // 칼럼꽉차게
                    onRowClicked={(e) => {rowClicked(e)}} // 행 클릭시 이벤트
                />
            </div>

            {
                pageVo ? 
                <Pagination
                    activePage={activePage} // 현재 보고있는 페이지 
                    itemsCountPerPage={pageVo.boardLimit} // 한페이지에 출력할 아이템수
                    totalItemsCount={pageVo.listCount} // 총 아이템수
                    pageRangeDisplayed={pageVo.pageLimit} // 표시할 페이지수
                    onChange={handlePageNumBtn}> 
                </Pagination>
                :
                ''
            }
            
        </StyledProjectDiv>
    );
};

export default ProjectMain;