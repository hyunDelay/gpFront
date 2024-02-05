import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CategoryPage from "./CategoryPage";
import ImminentPage from "./ImminentPage";
import NewPage from "./NewPage";
import PopularPage from "./PopularPage";
import PrelaunchPage from "./PrelaunchPage";
const ListMain = () => {
    return (<>
        <Routes>
            <Route path='/category/:no' element={<CategoryPage/>}></Route>
            <Route path='/imminent' element={<ImminentPage/>}></Route>
            <Route path='/new' element={<NewPage/>}></Route>
            <Route path='/popular' element={<PopularPage/>}></Route>
            <Route path='/prelaunch' element={<PrelaunchPage/>}></Route>
        </Routes>              
    </>);
};

export default ListMain;