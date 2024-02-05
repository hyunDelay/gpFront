
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useUserMemory } from '../../../component/context/UserContext';

const baseURL = process.env.REACT_APP_API_URL;

const StyledNewCreateDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 450px;
    margin: 0 auto;
    & .continueBox {
        width: 100%;
        & ul {
            display: flex;
            flex-direction: column;
            gap: 10px;
            & li {
                display: flex;
                justify-content: space-between;
                align-items: center;
                background-color: #f5f5f5;
                border-radius: 5px;
                padding: 15px 20px;
                & .left {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    width: calc(100% - 110px);
                    & span {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        overflow: hidden;
                        width: 60px;
                        height: 60px;
                        & img {
                            min-width: 100%;
                            min-height: 100%;
                        }
                    }
                    & strong {
                        width: calc(100% - 75px);
                        font-size: 15px;
                        font-weight: 500;
                        color: #333;
                    }
                }
                & button {
                    display: block;
                    padding: 10px 20px;
                    border: 1px solid #ddd;
                    border-radius: 30px;
                    color: #999;
                    font-size: 14px;
                    cursor: pointer;
                    &:hover {
                        border-color: #333;
                        color: #333;
                    }
                }
            }
        }
        & .messege {
            display: flex;
            align-items: center;
            padding-bottom: 5px;
            font-size: 14px;
            font-weight: 400;
            color: #ED7474;
            &::before {
                content: "!";
                display: flex;
                align-items: center;
                justify-content: center;
                width: 17px;
                height: 17px;
                background-color: #ED7474;
                border-radius: 50%;
                font-size: 13px;
                color: #fff;
                margin-right: 5px;
            }
        }
    }
    & .categoryBox {
        width: 100%;
        margin-top: 50px;
        & h3 {
            margin-bottom: 20px;
            text-align: center;
            font-size: 20px;
            color: #333;
        }
        & dl {
            & dt {
                padding: 5px 0;
                font-size: 15px;
                color: #333;
            }
            & dd {
                & ul {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 5px 10px;
                    width: 100%;
                    & input {
                        position: absolute;
                        left: -9999em;
                    }
                    & label {
                        display: block;
                        font-size: 14px;
                        padding: 7px 20px;
                        border: 1px solid #ddd;
                        border-radius: 30px;
                        cursor: pointer;
                    }
                    & input:checked ~ label {
                        background-color: var(--red-color);
                        border: 1px solid transparent;
                        color: #fff;
                    }
                }
            }
        }
        & dl + dl {
            margin-top: 20px;
        }
    }
    & > button {
        display: flex;
        background-color: var(--red-color);
        color: #fff;
        padding: 10px 20px;
        margin-top: 50px;
        border-radius: 5px;
        cursor: pointer;
    }
`;

const ProjectNewCreate = () => {

    const navigate = useNavigate();
    const [dataVo, setDataVo] = useState([]); // 조회한 데이터
    const {loginMemberVo} = useUserMemory(); // 로그인 유저 정보 가져오기
    const [categoryVo, setCategoryVo] = useState([]); // 카테고리 정보 가져오기
    const [formVo, setFormVo] = useState({}); // 저장할 데이터


    // 로그인 멤버의 번호 저장
    useEffect(() => {
        if(loginMemberVo !== undefined && loginMemberVo !== null && loginMemberVo.no !== undefined && loginMemberVo.no !== null){
            setFormVo({
                ...formVo,
                "no": loginMemberVo.no,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginMemberVo]);

    // 작성중인 프로젝트가 있으면 조회
    useEffect(() => {
        fetch(`${baseURL}/project/getCurrentProject`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formVo),
        })
        .then(resp => resp.json())
        .then(data => {
            if (data.length > 0) {
                setDataVo(data);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formVo.no, loginMemberVo]);
    
    // 카테고리 가져오기
    useEffect(() => {
        fetch(`${baseURL}/category/list`)
        .then(resp => resp.json())
        .then(data => {
            if(data.length > 0){
                setCategoryVo(data);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // formVo 저장
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        if(loginMemberVo !== undefined){
            setFormVo({
                ...formVo,
                [name]: value,
                "memberNo": loginMemberVo.no,
            });
        }
    }
    
    // 프로젝트 저장
    const handleCreateProject = () => {

        // 검증
        if(formVo.categoryNo === undefined || formVo.categoryNo === null){
            alert('카테고리를 선택해주세요.');
            return;
        }
        if(formVo.memberNo === undefined || formVo.categoryNo === null){
            alert('카테고리를 선택해주세요.');
            return;
        }

        fetch(`${baseURL}/project/create/new`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formVo),
        })
        .then(resp => resp.json())
        .then(data => {
            if(data.msg === 'good'){
                navigate(`../main/${data.no}`);
            } else {
                alert('프로젝트 만들기에 실패했습니다.');
            }
        })
        ;
    }
    
    return (
        <StyledNewCreateDiv>
            {
                (!dataVo || (Array.isArray(dataVo) && dataVo.length === 0))
                ? ''
                : (
                    <div className="continueBox">
                        <div className="messege">작성중인 프로젝트가 있습니다!</div>
                        <ul>
                            {dataVo.map((prj) => (
                                <li key={prj.no}>
                                    <div className="left">
                                        <span><img src={prj.imageUrl} alt="프로젝트이미지" /></span>
                                        <strong>{prj.title}</strong>
                                    </div>
                                    <button onClick={() => {
                                        navigate(`../main/${prj.no}`);
                                    }}>이어서 작성</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )
            }
            <div className="categoryBox">
                <h3>어떤 프로젝트를 계획 중 이신가요?</h3>
                {
                    (!categoryVo || (Array.isArray(categoryVo) && categoryVo.length === 0))
                    ?
                    ''
                    :  
                    categoryVo.map((vo) => (
                    <dl key={vo.no}>
                        <dt>{vo.mainCategory}</dt>
                        <dd>
                            <ul>
                                {
                                    vo.subCategoryList.map((subVo) => (
                                    <li key={subVo.no}>
                                        <div>
                                            <input type="radio" id={subVo.no} name='categoryNo' value={subVo.no} onChange={handleInputChange} />
                                            <label htmlFor={subVo.no}>{subVo.subCategory}</label>
                                        </div>
                                    </li>
                                    ))
                                }
                            </ul>
                        </dd>
                    </dl>
                    ))
                }
            </div>
            <button onClick={handleCreateProject}>시작하기</button>
        </StyledNewCreateDiv>
    );
};

export default ProjectNewCreate;