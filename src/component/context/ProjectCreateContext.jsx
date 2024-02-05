import { createContext, useContext, useEffect, useState } from "react";

const baseURL = process.env.REACT_APP_API_URL;

const ProjectCreateMemory = createContext();

const ProjectCreateMemoryProvider = ({ children }) => {

    const [projectCreateData, setProjectCreateData] = useState(); // 프로젝트 데이터
    const [IsProjectInputChange, setIsProjectInputChange] = useState(false); // 인풋값 바뀌면 true
    const [dataFrom, setDataFrom] = useState(); // 어디에서 보낸 데이터인지 기록
    const [headerFormVo, setHeaderFormVo] = useState(); // 저장하기 버튼에 전달할 formVo
    const [projectNo, setProjectNo] = useState({}); // 프로젝트 넘버

    useEffect(() => {
        if(projectCreateData){
            setProjectNo({
                'no': projectCreateData.mainVo.no,
            });
            
        }
    }, [projectCreateData]);

    useEffect(() => {
        if(projectNo && projectNo.no){
            // 데이터 불러오기
            fetch(`${baseURL}/project/create/main?no=${projectNo.no}`, {
                method: 'get',
            })
            .then(resp => resp.json())
            .then(data => {
                setProjectCreateData(data);
            })
            ;
        }
    }, [projectNo.no]);
    
    return (
        <ProjectCreateMemory.Provider value={{ projectCreateData, setProjectCreateData, IsProjectInputChange, setIsProjectInputChange, dataFrom, setDataFrom, headerFormVo, setHeaderFormVo, projectNo }}>
            {children}
        </ProjectCreateMemory.Provider>
    );
};

const useProjectCreateMemory = () => {
    const context = useContext(ProjectCreateMemory);
    if (!context) {
        throw new Error("ProjectCreateMemory 컴포넌트가 아닙니다.");
    }
    return context;
};

export { ProjectCreateMemoryProvider, useProjectCreateMemory };