import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ReactQuill, { Quill } from 'react-quill';
import ImageResize from '@looop/quill-image-resize-module-react';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router';
Quill.register('modules/ImageResize', ImageResize);

const baseURL = process.env.REACT_APP_API_URL;

const StyledCreateDateplanDiv = styled.div`
    width: 800px;
    & .inner {
        width: 800px;
        margin: 0 auto;
        padding: 40px 0;
        & > dl {
            display: flex;
            gap: 60px;
            & > dd {
                display: flex;
                flex-direction: column;
                width: 800px;
                gap: 20px;
                & .item {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                    flex: 1;
                    & > dt {
                        font-size: 13px;
                        color: #333;
                    }
                }
            }
        }
    }
    & .quill {
        background-color: #fff;
        & .ql-container {
            min-height: 100px;
            max-height: 350px;
            overflow: auto;
        }
    }
    .buttonArea{
        display: flex;
        flex-direction: row-reverse;
        & > button{
            background-color: var(--red-color);
            border-radius: 5px;
            color: #fff;
            margin: 0px 0px 5px 10px;
            padding: 5px 10px 5px 10px;
            font-size: 18px;
            font-weight: 500;
        }
    }
`;

const formats = [
    'font', 'header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'align', 'color', 'background', 'size', 'h1', 'image', 'link'
];

const ProjectDateplanCreate = () => {

    const { no } = useParams(); // 파라미터
    const navigate = useNavigate();
    const quillRefs = [useRef(), useRef(), useRef(), useRef(), useRef()]; // 에디터 접근을 위한 ref
    const [headerFormVo, setHeaderFormVo] = useState({
        "projectNo" : "",
        "content" : ""
    }); // 저장하기 버튼에 전달할 formVo

    useEffect(()=>{
        setHeaderFormVo({
            ...headerFormVo,
            'projectNo': no,
        });
    },[no])


    // 이미지 리사이즈 모듈을 useEffect 내에서 초기화
    useEffect(() => {
        Quill.register('modules/ImageResize', ImageResize);
    }, []);

    // image를 서버로 전달하는 과정
    const imageHandler = () => {

        // input file DOM 만들기
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.addEventListener('change', () => {
            const file = input.files[0];
            
            const formData = new FormData();
            formData.append('img', file);

            let imgUrl = null; // url 담을 변수
            fetch(`${baseURL}/project/detail/update/save/image`, {
                    method: 'post',
                    body: formData,
            })
            .then(resp => resp.json())
            .then(data => {
                if(data.msg === 'good'){
                    imgUrl = data.fileUrl;

                    // quillRefs 배열에 있는 모든 참조에 대해 이미지 삽입 작업 수행
                    quillRefs.forEach((quillRef) => {
                        const editor = quillRef.current?.getEditor(); // 안전하게 에디터 객체 가져오기
                        const range = editor?.getSelection(); // 안전하게 range 객체 가져오기

                        // range 객체가 null이 아닌 경우에만 이미지 삽입
                        if (editor && range) {
                        editor.insertEmbed(range.index, 'image', imgUrl);
                        }
                    });
                
                } else {
                    throw new Error();
                }
            })
            .catch((e) => {
                alert(e);
            })
            ;

        });

    };

    // quill state
    const [content, setContent] = useState();

    
    // 각 상태를 업데이트 하는 함수
    const updateProjectData = (fieldName, value) => {

        if(fieldName === 'content'){
            setContent(value);
            setHeaderFormVo({
                ...headerFormVo,
                'content': value,
            });
        }
    };

    // quill 모듈
    const modules = useMemo(() => {
        return {
            toolbar: {
                container: [
                    [{ size: ['small', false, 'large', 'huge'] }],
                    [{'align': []}, {'color': []}, {'background': []}],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{'header': [1, 2, 3, false]}],
                    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                    ['link'],
                    ['image'],
                ],
                handlers: {
                    image: imageHandler,
                },
            },
            ImageResize: {
                displaySize: true,
                modules: ['Resize', 'DisplaySize']
            }
        };
    }, []);


    // 저장하기
    const handleSaveData = () => {
        // const { name } = e.target;
        // setLoading(true); // 로딩중 화면 표시
        fetch(`${baseURL}/project/detail/update/save/`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(headerFormVo),
        })
        .then(resp => resp.json())
        .then(data => {
            if(data.msg === 'good'){
                alert('업데이트 내용이 저장되었습니다.');
            } else {
                throw new Error();
            }
        })
        .catch(() => {
            alert('오류가 발생했습니다. 다시 시도해주세요.');
        })
        .finally(() => {
            // setLoading(false); // 로딩중 화면 끝
            // setIsProjectInputChange(false);
            navigate('/project/detail/update/' + headerFormVo.projectNo);
        })
        ;
    }

    return (
        <StyledCreateDateplanDiv>
            <div className="inner">
                <dl>
                    <dd>
                        <dl className='item'>
                            <dt>업데이트 작성</dt>
                            <dd>
                                <ReactQuill
                                    ref={quillRefs[0]}
                                    theme="snow"
                                    modules={modules}
                                    formats={formats}
                                    value={content}
                                    onChange={(content) => updateProjectData("content", content)}
                                />
                            </dd>
                        </dl>
                    </dd>
                </dl>
            </div>
            <div className='buttonArea'><button name="dateplan" onClick={handleSaveData}>저장</button></div>
        </StyledCreateDateplanDiv>
    );
};

export default ProjectDateplanCreate;