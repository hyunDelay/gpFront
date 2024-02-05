import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import logoImage from '../../assets/images/logo_big.svg';
import { faCaretRight, faCreditCard, faFolder, faLayerGroup, faMoneyCheck, faUsers } from '@fortawesome/free-solid-svg-icons';

const StyledAside = styled.aside`
    & .inner {
        padding: 0 15px;
        position: sticky;
        top: 0;
        left: 0;
        & .logo {
            display: flex;
            justify-content: center;
            padding: 30px 0 40px;
            & img {
                display: flex;
                width: 120px;
                margin-right: 10px;
            }
        }
        & .sidebar-heading {
            font-weight: 600;
            font-size: .70rem;
            letter-spacing: 1px;
            text-transform: uppercase;
            color: rgba(255,255,255,.4);
        }
        & .linkArea {
            display: flex;
            flex-direction: column;
            gap: 10px;
            padding: 10px 0;
            & a {
                display: flex;
                position: relative;
                align-items: center;
                padding: 5px 10px;
                font-size: 14px;
                color: rgba(255,255,255,.7);
                transition: .2s;
                & span {
                    display: flex;
                    width: 30px;
                    font-size: 15px;
                }
                & svg {
                    color: rgba(255,255,255,.3);
                    transition: .2s;
                }
                & em {
                    display: none;
                    position: absolute;
                    top: 50%;
                    right: 0;
                    margin-top: -11px;
                }
                &:hover,
                &.active {
                    color: rgba(255,255,255, 1);
                    & em {
                        display: block;
                    }
                    & svg {
                        color: rgba(255,255,255, 1);
                    }
                }
                
            }
        }
    }
`;

const Aside = () => {
    return (
        <StyledAside>
            <div className="inner">

                {/* <NavLink to="/" className="sidebar-brand d-flex align-items-center justify-content-center"> */}
                    <h1 className="logo"><img src={logoImage} alt="로고" /></h1>
                {/* </NavLink> */}

                <div className="sidebar-heading">settings</div>
                <div className="linkArea">
                    <NavLink to="category">
                        <span><FontAwesomeIcon icon={faLayerGroup} /></span>카테고리 관리
                        <em><FontAwesomeIcon icon={faCaretRight} /></em>
                    </NavLink>
                    <NavLink to="payment">
                        <span><FontAwesomeIcon icon={faCreditCard} /></span>결제내역 관리
                        <em><FontAwesomeIcon icon={faCaretRight} /></em>
                    </NavLink>
                    <NavLink to="project">
                        <span><FontAwesomeIcon icon={faFolder} /></span>프로젝트 관리
                        <em><FontAwesomeIcon icon={faCaretRight} /></em>
                    </NavLink>
                    <NavLink to="user">
                        <span><FontAwesomeIcon icon={faUsers} /></span>사용자 관리
                        <em><FontAwesomeIcon icon={faCaretRight} /></em>
                    </NavLink>
                    <NavLink to="backer">
                        <span><FontAwesomeIcon icon={faMoneyCheck} /></span>후원자 관리
                        <em><FontAwesomeIcon icon={faCaretRight} /></em>
                    </NavLink>
                </div>

            </div>
        </StyledAside>
    );
};

export default Aside;