import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ReviewBox from './ReviewBox';
import { useUserPageContext } from '../../component/context/UserPageContext';
import Pagination from 'react-js-pagination';

const baseURL = process.env.REACT_APP_API_URL;

const StyledReviewListDiv = styled.div`
    width: 800px;
    display: flex;
    flex-direction: column;
    align-items: center;

    & > .noReview {
        height: 100px;
        display: flex;
        align-items: center;
        color: var(--black-color);
    }
`;

const PaginationBox = styled.div`
    Pagination { 
        display: flex; 
        justify-content: center; 
        margin-top: 15px;
    }
    
    ul { list-style: none; padding: 0; }

    ul.pagination li {
        display: inline-block;
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    ul.pagination li:first-child{ border-radius: 5px 0 0 5px; }
    ul.pagination li:last-child{ border-radius: 0 5px 5px 0; }
    ul.pagination li a { text-decoration: none; color: #333; font-size: 1rem; }
    ul.pagination li.active a { color: white; }
    ul.pagination li.active { background-color: var(--red-color); }
    ul.pagination li a:hover,
    ul.pagination li a.active { color: var(--red-color); }
`;

const ReviewList = () => {

    const {profileVo} = useUserPageContext();
    
    const [reviewList, setReviewList] = useState([]); 
    const [activePage, setActivePage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [cnt, setCnt] = useState();
    
    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
    }


    const request = {
        "memberNo": profileVo.no,
        "currentPage": activePage,
        "boardLimit": itemsPerPage 
    }
    
    useEffect(()=>{
        fetch(`${baseURL}/userpage/review`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(request)
        })
        .then(resp => resp.json())
        .then(data => {
            setReviewList(data.reviewList);
            setCnt(parseInt(data.size));
        });
    }, [activePage, profileVo])


    return (
        <StyledReviewListDiv>
            {
                reviewList === null || reviewList === undefined || reviewList.length===0
                ?
                <div className='noReview'>
                    아직 등록된 후기가 없습니다.
                </div>
                :
                <>
                    {reviewList.map((item)=> (
                        <ReviewBox key={item.reviewNo} item={item}/>
                    ))} 

                    <PaginationBox>
                        <Pagination
                        // 현제 보고있는 페이지 
                        activePage={activePage}
                        // 한페이지에 출력할 아이템수
                        itemsCountPerPage={itemsPerPage}
                        // 총 아이템수
                        totalItemsCount={cnt}
                        // 표시할 페이지수
                        pageRangeDisplayed={5}
                        // 함수
                        onChange={handlePageChange}>
                        </Pagination>
                    </PaginationBox>
                </>
                

            }

        </StyledReviewListDiv>
    );
};

export default ReviewList;