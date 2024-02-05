import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProjectNewCreate from './ProjectNewCreate';
import ProjectStartCreate from './ProjectStartCreate';
import ProjectCreateMain from './ProjectCreateMain';
import ProjectCreateMainIndex from './ProjectCreateMainIndex';

const CreateMain = () => {

    return (
        <Routes>
            <Route path='start' element={<ProjectStartCreate />} />
            <Route path='new' element={<ProjectNewCreate />} />
            <Route path='main/:projectNo' element={<ProjectCreateMain />} />
            <Route path='main/index/:temp/:projectNo' element={<ProjectCreateMainIndex />} />
        </Routes>
    );
};

export default CreateMain;