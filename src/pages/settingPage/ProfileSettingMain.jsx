import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useUserMemory } from '../../component/context/UserContext';

const StyledAllDiv = styled.div`
    width: 100%;
`;
const StyledStartDiv = styled.div`
    width: 100%;
    margin: 0 auto;
    & > div{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        height: calc(100vh - 260px);
        & > div{
            & > div:first-child{
                display: flex;
                flex-direction: column;
                align-items: center;
                font-size: 20px;
                & > div > span{
                    color: red;
                }
            }
            & > div:nth-child(2){
                display: flex;
                align-items: center;
                margin-top: 20px;
                & > div:first-child{
                    width: 70px;
                }
                & > div:last-child{
                    margin-top: 5px;
                    font-size: 18px;
                    font-weight: 500;
                }
            }
            & > div:nth-child(3){
                display: flex;
                margin-top: 10px;
                align-items: center;
                & > div:first-child{
                    width: 70px;
                }
                & > input{
                    margin-top: 5px;
                    height: 40px;
                    width: 230px;
                    border: 1px solid #e0e0e0;
                    border-radius: 5px;
                    padding: 8px 0px 8px 10px;
                }
            }
            & > div:nth-child(4){
                display: flex;
                align-items: center;
                justify-content: center;
                margin-top: 10px;
                width: 100%;
                & > button{
                    width: 100%;
                    height: 40px;
                    font-size: 15px;
                    border-radius: 5px;
                    background-color: var(--red-color);
                    color: #ffffff;
                }
            }
        }
    }
`;
const StyledSettingsDiv = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    & > div:first-child{
        font-size: 30px;
        font-weight: 500;
        margin-bottom: 25px;
    }
    & > div:nth-child(2){
        & > div:first-child{
            font-size: 20px;
            font-weight: 500;
        }
        & > ul{
            & > li{
                border-bottom: 1px solid lightgray;
                padding: 20px 0px 20px 0px;
                width: 100%;
                & > div:first-child{
                    font-size: 18px;
                    font-weight: 500;
                }
            }
            & > li:last-child > div {
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                justify-content: space-between;
                & > span:first-child{
                    font-weight: 500;
                }
                & > span > a > button{
                    background-color: var(--red-color);
                    color: white;
                    padding: 5px 15px 5px 15px;
                    border-radius: 5px;
                }
            }
        }
    }

    .changeArea{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
    }
    .inputArea{
        width: calc(100% - 60px);
        & > input{
            width: 100%;
            border-radius: 5px;
            border: 1px solid #d8d8d8;
            padding: 5px 0px 5px 5px;
            margin: 5px 0px 5px 0px;
            color: #707070;
        }
    }
    .buttonArea{
        & > button{
            background-color: var(--red-color);
            color: white;
            padding: 5px 15px 5px 15px;
            border-radius: 5px;
        }
    }
    .profilePicArea{
        display: flex;
        justify-content: space-between;
        margin-top: 15px;
        .imgArea{
            width: 100px;
            height: 100px;
            border-radius: 50px;
            display: flex;
            & > div {
                & > img{
                    width: 100px;
                    height: 100px;
                    border-radius: 50px;
                    object-fit: cover;

                }
                #profileUploadBtn{
                    margin-left: 20px;
                }
            }
        }
    }
`;


const ProfileSettingMain = () => {

    //스프링 기본 경로
    const baseURL = process.env.REACT_APP_API_URL;

    //회원번호
    const {loginMemberVo} = useUserMemory();
    const navigate = useNavigate();
    if(loginMemberVo === null){
        navigate('/login');
    }

    //기초세팅(안하면 콘솔창 빨간색됨)
    const [profile, setProfile] = useState({
        "name" : "",
        "intro" : "",
        "siteUrl" : ""
    });
    const [changePic, setChangePic] = useState({});
    const [changeName, setChangeName] = useState({});
    const [changeIntro, setChangeIntro] = useState({});
    const [changeSiteUrl, setChangeSiteUrl] = useState({});
    const [changeNewPwd, setChangeNewPwd] = useState({});
    const [start, setStart] = useState();

    const {setLoginMemberVo} = useUserMemory();

    const handleCheckPwd = ()=>{
        const classCheckPwd = document.querySelector('.checkPwd')
        const checkPwd = {
            "no" : profile.no,
            "pwd" : classCheckPwd.value
        };
        fetch(baseURL + "/settings/checkPwd",{
            method: 'post',
            headers:{
                "Content-Type" : 'application/json'
            },
            body: JSON.stringify(checkPwd),
        })
        .then(resp=>resp.json())
        .then(data=>{
            console.log(data);
            if(data.msg === "good"){
                setStart(1);
            }else{
                alert('비밀번호를 다시 입력해주시기 바랍니다.')
            }
        })
    }

    useEffect(()=>{
        fetch(process.env.REACT_APP_API_URL + "/settings",{
            method: 'post',
            headers:{
                "Content-Type" : 'application/json'
            },
            body: JSON.stringify(loginMemberVo),
        })
        .then(resp=>resp.json())
        .then(data=>{
            setProfile(data);
        })
        .catch((e)=>console.log(e))
        ;
    }, [loginMemberVo])

    //사진 변경
    const handleChangePic = (e)=>{
        setChangePic(e.target.files[0]);

        const preview = document.querySelector("#preview");

        const fr = new FileReader();
        fr.addEventListener("load",(e)=>{
            preview.src = e.target.result;
        })
        fr.readAsDataURL(e.target.files[0]);
    }
    const handlePicSave = ()=>{
        const fd = new FormData();
        fd.append("f", changePic);
        fd.append("no", profile.no);

        fetch(process.env.REACT_APP_API_URL + "/settings/pic",{
            method: "post",
            body : fd,
        })
        .then(resp => resp.json())
        .then(data=>{
            if(data.msg === "good"){
                alert("프로필 사진 변경 성공");
                sessionStorage.setItem("loginMemberVo" , JSON.stringify(data.newLoginData));
                setLoginMemberVo(JSON.parse(sessionStorage.getItem('loginMemberVo')));
            }else{
                alert("프로필 사진 변경 실패");
            }
        })
        .catch(e=>{console.log(e);})
    }

    //이름 변경
    const handleChangeName = (e) =>{
        setChangeName({
            "name" : e.target.value,
            no : profile.no
        })
        setProfile({
            ...profile,
            "name" : e.target.value
        })
    }
    const handleNameSave = ()=>{
        fetch(baseURL + "/settings/name",{
            method: 'post',
            headers:{
                "Content-Type" : 'application/json'
            },
            body: JSON.stringify(changeName),
        })
        .then(resp=>resp.json())
        .then(data=>{
            if(data.msg === "good"){
                alert('이름 변경 성공');
                sessionStorage.setItem("loginMemberVo" , JSON.stringify(data.newLoginData));
                setLoginMemberVo(JSON.parse(sessionStorage.getItem('loginMemberVo')));
            }else{
                alert('이름 변경 실패');
            }
        })
        .catch(e=>console.log(e))
        .finally(()=>{
            setChangeName({});
        })

    }

    //소개 변경
    const handleChangeIntro = (e)=>{
        setChangeIntro({
            "intro": e.target.value,
            no : profile.no
        })
        setProfile({
            ...profile,
            "intro" : e.target.value
        })
    }
    const handleIntroSave = ()=>{
        fetch(baseURL + "/settings/intro",{
            method: 'post',
            headers:{
                "Content-Type" : 'application/json'
            },
            body: JSON.stringify(changeIntro),
        })
        .then(resp=>resp.json())
        .then(data=>{
            if(data.msg === "good"){
                alert('소개 변경 성공');
                sessionStorage.setItem("loginMemberVo" , JSON.stringify(data.newLoginData));
                setLoginMemberVo(JSON.parse(sessionStorage.getItem('loginMemberVo')));
            }else{
                alert('소개 변경 실패');
            }
        })
        .catch(e=>console.log(e))
        .finally(()=>{
            setChangeIntro({});
        })
    }

    //웹사이트 변경
    const handleChangeSiteUrl = (e)=>{
        setChangeSiteUrl({
            "siteUrl" : e.target.value,
            no : profile.no
        })
        setProfile({
            ...profile,
            "siteUrl" : e.target.value
        })
    }
    const handleSiteUrlSave = ()=>{
        fetch(baseURL + "/settings/siteUrl",{
            method: 'post',
            headers:{
                "Content-Type" : 'application/json'
            },
            body: JSON.stringify(changeSiteUrl),
        })
        .then(resp=>resp.json())
        .then(data=>{
            if(data.msg === "good"){
                alert('소개 변경 성공');
                sessionStorage.setItem("loginMemberVo" , JSON.stringify(data.newLoginData));
                setLoginMemberVo(JSON.parse(sessionStorage.getItem('loginMemberVo')));
            }else{
                alert('소개 변경 실패');
            }
        })
        .catch(e=>console.log(e))
        .finally(()=>{
            setChangeSiteUrl({});
        })
    }

    //비밀번호 변경
    const handleChangeNewPwd = (e)=>{
        setChangeNewPwd({
            "pwd" : e.target.value,
            no : profile.no
        })
        setProfile({
            ...profile,
            "pwd" : e.target.value
        })

    }
    const handleNewPwdSave = ()=>{
        fetch(baseURL + "/settings/pwd",{
            method: 'post',
            headers:{
                "Content-Type" : 'application/json'
            },
            body: JSON.stringify(changeNewPwd),
        })
        .then(resp=>resp.json())
        .then(data=>{
            if(data.msg === "good"){
                alert('비밀번호 변경 성공');
                sessionStorage.setItem("loginMemberVo" , JSON.stringify(data.newLoginData));
                setLoginMemberVo(JSON.parse(sessionStorage.getItem('loginMemberVo')));
                navigate('/');
            }else{
                alert('비밀번호 변경 실패');
            }
        })
        .catch(e=>console.log(e))
        .finally(()=>{
            setChangeNewPwd({});
            document.querySelector('#password').value = "";
        })
    }

    return (
        <StyledAllDiv>
            {
            loginMemberVo===null
            ?
            <Link to='/'/>
            :    
                start===undefined
                ?
                <StyledStartDiv>
                    <div>
                        <div>
                            <div>
                                <div>정보를 안전하게 보호하기 위해</div>
                                <div><span>비밀번호를 다시 한 번 확인</span>합니다</div>
                            </div>
                            <div>
                                <div>이메일</div>
                                <div>{profile.email}</div>
                            </div>
                            <div>
                                <div>비밀번호</div>
                                <input type="password" placeholder='비밀번호를 입력해주세요.' className='checkPwd'/>
                            </div>
                            <div>
                                <button onClick={handleCheckPwd}>확인</button>
                            </div>
                        </div>
                    </div>
                </StyledStartDiv>
                :
                <StyledSettingsDiv>
                    <div>
                        설정
                    </div>
                    <div>
                        <div>프로필/계정</div>
                        <ul>
                            <li>
                                <div>프로필 사진</div>
                                <div className='profilePicArea'>
                                    <div className='imgArea'>
                                        <div><img src={profile.pic ? profile.pic : null} alt="프로필 사진" id='preview'/></div>
                                        <div><input type="file" name="f" id="profileUploadBtn" onChange={handleChangePic}/></div>
                                    </div>
                                    <div className='buttonArea'><button onClick={handlePicSave}>저장</button></div>
                                </div>
                            </li>
                            <li>
                                <div>이름</div>
                                <div className='changeArea'>
                                    <span className='inputArea'><input type="text" value={profile.name} onChange={(e)=>{handleChangeName(e)}}/></span>
                                    <span className='buttonArea'><button onClick={handleNameSave}>저장</button></span>
                                </div>
                            </li>
                            <li>
                                <div>소개</div>
                                <div className='changeArea'>
                                    <span className='inputArea'><input type="text" value={profile.intro} onChange={(e)=>{handleChangeIntro(e)}}/></span>
                                    <span className='buttonArea'><button onClick={handleIntroSave}>저장</button></span>
                                </div>
                            </li>
                            <li>
                                <div>웹사이트</div>
                                <div className='changeArea'>
                                    <span className='inputArea'><input type="text" value={profile.siteUrl} onChange={(e)=>{handleChangeSiteUrl(e)}}/></span>
                                    <span className='buttonArea'><button onClick={handleSiteUrlSave}>저장</button></span>
                                </div>
                            </li>
                            <li>
                                <div>비밀번호</div>
                                <div>변경할 비밀번호</div>
                                <div className='changeArea'>
                                    <span className='inputArea'><input type="password" onChange={(e)=>{handleChangeNewPwd(e)}} id='password'/></span>
                                    <span className='buttonArea'><button onClick={handleNewPwdSave}>저장</button></span>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <span>회원탈퇴</span>
                                    <span><Link to='/quit'><button type="button">이동</button></Link></span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </StyledSettingsDiv>
            }
        </StyledAllDiv>
    );
};

export default ProfileSettingMain;