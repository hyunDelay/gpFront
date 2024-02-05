import React from 'react';
import BackingProcess from './backing/BackingProcess';
import { Route, Routes } from 'react-router-dom';
import BackCompleted from './BackCompleted';
import BackCanceled from './BackCanceled';
import BackDetail from './BackDetail';


const BackMain = () => {
    return (
        <Routes>
            <Route path='process/:projectNo/:rewardNo' element={<BackingProcess />}/>
            <Route path='completed/:no' element={<BackCompleted />}/>
            <Route path='canceled/:no' element={<BackCanceled />}/>
            <Route path='detail/:no' element={<BackDetail />}/>
        </Routes>

    );
};

export default BackMain;