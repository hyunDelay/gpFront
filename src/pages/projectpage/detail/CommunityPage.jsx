import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useUserMemory } from '../../../component/context/UserContext';

const StyledAllDiv = styled.div`
    width: 100%;
`;
const StyledInputCoummunityDiv = styled.div`
    margin-top: 50px;
    width: 100%;
    padding: 5px 20px 5px 10px;
    & > div{
        width: 88%;
        display: flex;
        align-items: center;
        background-color: #f7f7f7;
        padding: 15px 15px 15px 25px;
        border-radius: 5px;
        & > textarea{
            resize: none;
            width: calc(100% - 20px);
            background-color: #f7f7f7;
            &::placeholder{
                color: #adadad;
            }
        }
        & > button{
            margin: 0px 10px 0px 15px;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #f7f7f7;
            
            & > svg{
                width: 100%;
                height: 100%;
                filter: invert(91%) sepia(7%) saturate(20%) hue-rotate(354deg) brightness(78%) contrast(83%);
            }
        }
    }
`;
const StyledCommunityDiv = styled.div`
    height: 700px;

    //커뮤니티 없을때
    .communityNull{
        border: none;
        height: 400px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        & > div:first-child{
            background-color: #e6e6e6;
            width: 70px;
            height: 70px;
            border-radius: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            & > svg{
                width: 40px;
                height: 40px;
                filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(288deg) brightness(102%) contrast(102%);
            }
        }
        & > div:last-child{
            color: #e6e6e6;
            margin-top: 10px;
        }
    }

    & > div{
        padding-top: 20px;
        margin: 15px;
        & > ul{
            & > li:first-child{
                & > div:first-child{
                    display: flex;
                    padding-top: 20px;
                    align-items: center;
                    & > div:first-child{
                        margin-right: 15px;
                        & > img{
                            border-radius: 50px;
                        }
                    }
                }
                & > div > div > img{
                    width: 40px;
                    height: 40px;
                    font-size: 5px;
                    object-fit: cover;
                }
                & > div:last-child{
                    padding: 15px 0px 15px 0px;
                }
            }
            & > li:last-child{
                padding: 15px;
                /* margin-left: 25px; */
                & > div:first-child{
                    margin-bottom: 15px;
                    & > div:first-child{
                        & > span{
                            border-radius: 5px;
                            background-color: #f05a5a1a;
                            padding-left: 5px;
                            padding-right: 5px;
                            margin-left: 5px;
                            color: var(--red-color);
                        }
                    }
                }
            }
        }
    }
`;
const StyledReplyDiv = styled.div`
    width: 100%;
    padding: 5px 20px 5px 0px;
    & > div{
        width: 90%;
        display: flex;
        align-items: center;
        background-color: #f7f7f7;
        padding: 15px 15px 15px 25px;
        border-radius: 5px;
        & > textarea{
            resize: none;
            width: calc(100% - 20px);
            background-color: #f7f7f7;
            &::placeholder{
                color: #adadad;
            }
        }
        & > button{
            margin: 0px 10px 0px 15px;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #f7f7f7;
            
            & > svg{
                width: 100%;
                height: 100%;
                filter: invert(91%) sepia(7%) saturate(20%) hue-rotate(354deg) brightness(78%) contrast(83%);
            }
        }
    }
`;


const CommunityPage = () => {

    //스프링 기본 경로
    const baseURL = process.env.REACT_APP_API_URL;

    //로그인한 회원
    const {loginMemberVo} = useUserMemory();

    const {no} = useParams();

    const [detailCommunityVoList, setDetailCommunityVoList] = useState([]);
    const [content, setContent] = useState({
        "projectNo" : no,
        "memberNo" : "",
        "content" : ""
    });
    const [reply, setReply] = useState({
        "reply" : "",
        "no" : ""
    })
    const [set, setSet] = useState(0);
    const [detailCntVo, setDetailCntVo] = useState([]);
    let contentArea = document.querySelector("#content");

    //기본
    useEffect(()=>{
        setSet(0)
        fetch(`${baseURL}/project/detail/community?no=` + no)
        .then((resp)=>{return resp.json()})
        .then((data)=>{
            setDetailCommunityVoList(data.voList);
            setDetailCntVo(data.detailCntVo);
            console.log(data.detailCntVo);
        })
        .catch((e)=>{console.log("오류 : " + e);})
        ;
    }, [no, set]);

    //커뮤니티 작성
    const handlePutContent = (e)=>{
        if(loginMemberVo==null){
            alert("로그인 후 이용가능합니다.")
            e.target.value = "";
        }else if(loginMemberVo.no === detailCntVo.creatorNo){
            alert("창작자는 이용할 수 없습니다.")
            e.target.value = "";
        }else{
            setContent({
                ...content,
                "memberNo" : loginMemberVo.no,
                "content" : e.target.value
            });
        }
    }
    const handleSendContent = ()=>{
        if(content.content === ""){
            alert("내용을 입력하지 않았습니다.")
        }else{
            fetch(baseURL + "/project/detail/community",{
                method: 'post',
                headers:{
                    "Content-Type" : 'application/json'
                },
                body: JSON.stringify(content),
            })
            .then(resp=>resp.json())
            .then(data=>{
                if(data.msg === "bad"){
                    alert("작성 중 실패");
                }
                setSet(1);
                contentArea.value = "";
            })
        }
    }

    //커뮤니티 댓글 작성
    const handlePutReply = (e, vo)=>{
        if(loginMemberVo == null){
            alert("로그인 후 이용가능합니다.")
            e.target.value = "";
        }else{
            setReply({
                ...reply,
                "reply" : e.target.value,
                "no" : vo.no
            });
        }
    }
    const handleSendReply = ()=>{
        if(reply.reply === ""){
            alert("내용을 입력하지 않았습니다.")
        }else{
            fetch(baseURL + "/project/detail/community",{
                method: 'post',
                headers:{
                    "Content-Type" : 'application/json'
                },
                body: JSON.stringify(reply),
            })
            .then(resp=>resp.json())
            .then(data=>{
                if(data.msg === "bad"){
                    alert("작성 중 실패");
                }
                setSet(1);
                contentArea.value = "";
            })
        }
    }

    return (
        <StyledAllDiv>
            <StyledInputCoummunityDiv>
                <div>
                    <textarea name="content" id="content" placeholder='글을 쓸 수 있어요.' onChange={(e)=>{handlePutContent(e)}}/>
                    <button id='buttonArea' onClick={handleSendContent}>
                        <svg xmlns="http://www.w3.org/2000/svg" id="Filled" viewBox="0 0 24 24" width="512" height="512"><path d="M1.172,19.119A4,4,0,0,0,0,21.947V24H2.053a4,4,0,0,0,2.828-1.172L18.224,9.485,14.515,5.776Z"/><path d="M23.145.855a2.622,2.622,0,0,0-3.71,0L15.929,4.362l3.709,3.709,3.507-3.506A2.622,2.622,0,0,0,23.145.855Z"/></svg>
                    </button>
                </div>
            </StyledInputCoummunityDiv>
            <StyledCommunityDiv>
                {
                    detailCommunityVoList.length === 0
                    ?
                    <div className='communityNull'>
                        <div>
                        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
                            <path d="m22.75,9.693c.806.914,1.25,2.088,1.25,3.307v5c0,2.757-2.243,5-5,5H5c-2.757,0-5-2.243-5-5v-5c0-2.757,2.243-5,5-5h4c.553,0,1,.448,1,1s-.447,1-1,1h-4c-1.654,0-3,1.346-3,3v5c0,1.654,1.346,3,3,3h14c1.654,0,3-1.346,3-3v-5c0-.731-.267-1.436-.75-1.984-.365-.414-.326-1.046.089-1.412.413-.364,1.045-.326,1.411.088ZM5,15.5c0,.828.672,1.5,1.5,1.5s1.5-.672,1.5-1.5-.672-1.5-1.5-1.5-1.5.672-1.5,1.5Zm6.5,1.5c.828,0,1.5-.672,1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5,1.5.672,1.5,1.5,1.5Zm.5-6v-1.586c0-1.068.416-2.073,1.172-2.828L18.879.879c1.17-1.17,3.072-1.17,4.242,0,.566.566.879,1.32.879,2.121s-.313,1.555-.879,2.122l-5.707,5.707c-.755.755-1.76,1.172-2.828,1.172h-1.586c-.553,0-1-.448-1-1Zm2-1h.586c.534,0,1.036-.208,1.414-.586l5.707-5.707c.189-.189.293-.44.293-.707s-.104-.518-.293-.707c-.391-.391-1.023-.39-1.414,0l-5.707,5.707c-.372.373-.586.888-.586,1.414v.586Z"/>
                        </svg>
                        </div>
                        <div>
                           게시글이 없습니다.
                        </div>
                    </div>
                    :
                    detailCommunityVoList.map((vo)=>{
                        return (
                        <div key={vo.no}>
                            <ul>
                                <li>
                                    <div>
                                        <div>
                                            <img src={vo.memberPic} alt="프로필 이미지" />
                                        </div>
                                        <div>
                                            <div>{vo.memberName}</div>
                                            <div>{vo.contentEnrollDate}</div>
                                        </div>
                                    </div>
                                    <div>{vo.content}</div>
                                </li>
                                {
                                vo.reply == null
                                ?
                                !loginMemberVo
                                    ?
                                    null
                                    :
                                    detailCntVo.creatorNo !== loginMemberVo.no
                                    ?
                                    <li></li>
                                    :
                                    <li>
                                        <StyledReplyDiv>
                                            <div>
                                                <textarea name="content" id="content" placeholder='댓글을 쓸 수 있어요.' onChange={(e)=>{handlePutReply(e, vo)}}/>
                                                <button id='buttonArea' onClick={handleSendReply}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" id="Filled" viewBox="0 0 24 24" width="512" height="512"><path d="M1.172,19.119A4,4,0,0,0,0,21.947V24H2.053a4,4,0,0,0,2.828-1.172L18.224,9.485,14.515,5.776Z"/><path d="M23.145.855a2.622,2.622,0,0,0-3.71,0L15.929,4.362l3.709,3.709,3.507-3.506A2.622,2.622,0,0,0,23.145.855Z"/></svg>
                                                </button>
                                            </div>
                                        </StyledReplyDiv>
                                    </li>
                                :
                                <li>
                                    <div>
                                        <div>{vo.replyerName}<span>창작자</span></div>
                                        <div>{vo.replyEnrollDate}</div>
                                    </div>
                                    <div>{vo.reply}</div>
                                </li>
                                }
                            </ul>
                        </div>
                        );
                    })
                }
            </StyledCommunityDiv>
        </StyledAllDiv>
    );
};

export default CommunityPage;