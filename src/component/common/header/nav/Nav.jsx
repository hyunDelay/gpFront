import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';

const baseURL = process.env.REACT_APP_API_URL;

const StyledNavDiv = styled.nav`
    display: flex;
    align-items: center;
    gap: 20px;

    & > a { // 1depth
        padding: 20px 10px;
        box-sizing: border-box;
        font-weight: 500;
        transition: .2s;
        border-bottom: 2px solid transparent;
        &:hover,
        &.active {
            border-bottom: 2px solid #333;
        }
    }
    & .categoryArea {
        & > a { // 1depth
            padding: 20px 10px;
            font-weight: 500;
            transition: .2s;
        }

        & > ul { // 2depth
            display: none;
            position: absolute;
            justify-content: center;
            top: 126px;
            left: 0;
            background-color: #fff;
            width: 100%;
            box-shadow: 0 8px 8px -3px rgba(0, 0, 0, .07);
            padding: 20px 0 30px;
            box-sizing: border-box;

            & .inner {
                display: flex;
                flex-direction: column;
                padding: 0 10px;
                position: relative;
                box-sizing: border-box;
                & > li { 
                    display: flex;
                    max-width: 150px;
                    gap: 40px;
                    &::after {
                        content: "";
                        display: block;
                        position: absolute;
                        left: 170px;
                        top: -5px;
                        width: 1px;
                        height: calc(100% + 10px);
                        background-color: #ddd;
                    }
                    & > a {
                        display: flex;
                        padding: 7px 20px;
                        border-radius: 5px;
                        font-weight: 500;
                        transition: .2s;
                        
                    }
                    &:hover > a {
                        background-color: #f5f5f5;
                    }
                    & ul { // 3depth
                        display: none;
                        align-items: flex-start;
                        gap: 10px;
                        position: absolute;
                        top: 0;
                        left: 160px;
                        width: calc(100% - 100px);
                        height: 100%;
                        padding-left: 50px;
                        box-sizing: border-box;
                        & a {
                            display: flex;
                            padding: 5px 15px;
                            border-radius: 5px;
                            font-size: 14px;
                        }
                        & li:hover a {
                            background-color: #f5f5f5;
                        }
                    }
                    &:hover ul {
                        display: flex;
                    }
                    & + li {
                        margin-top: 10px;
                    }
                }
            }
        }
        &:hover > ul {
            display: flex;
        }
    }
    
`;

const Nav = () => {

    const [navVoList, setNavVoList] = useState([]);

    const loadNavVoList = () => {
        fetch(`${baseURL}/category/list`)
        .then(resp => resp.json())
        .then((data) => {
            setNavVoList(data);
        });
    };

    useEffect(() => {
        loadNavVoList();
    }, []);

    return (
        <StyledNavDiv>

            <div className="categoryArea">
                <NavLink>카테고리</NavLink>
                <ul>
                    <div className="inner">
                        <li>
                            <Link>전체</Link>
                        </li>
                        {
                            navVoList.length === 0 ?
                            ''
                            :
                            navVoList.map(vo => (
                                <li key={vo.no}>
                                    <Link>{vo.mainCategory}</Link>
                                    <ul>
                                        {vo.subCategoryList.map(sub => (
                                            <li key={sub.no}><Link to={`/project/list/category/${sub.no}`}>{sub.subCategory}</Link></li>
                                        ))}
                                    </ul>
                                </li>
                            ))
                        }
                    </div>
                </ul>
            </div>

            <NavLink to='/'>홈</NavLink>
            <NavLink to='/project/list/popular'>인기</NavLink>
            <NavLink to='/project/list/new'>신규</NavLink>
            <NavLink to='/project/list/imminent'>마감임박</NavLink>
            <NavLink to='/project/list/prelaunch'>공개예정</NavLink>
            
        </StyledNavDiv>
    );
};

export default Nav;