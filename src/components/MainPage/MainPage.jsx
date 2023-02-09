import React from 'react';
import { useMediaQuery } from 'react-responsive'
import "./Styles.css"
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import Graph from "./Graph";
import ResultTable from "./ResultTable";
import GraphForm from "./GraphForm";
import Paginator from "./Paginator";


const MainPage = () => {
    const {loggedIn} = useSelector(state => state.userReducer);

    const isDesktop = useMediaQuery({query: '(min-width: 1135px)'})
    if (!loggedIn) {
        return <Navigate to="/login"/>
    }
    return (
        <div className="wrapper">
            <div className="box-1">
                 <Graph/>
            </div>
            <div className="box-2">
                <GraphForm/>
            </div>
            <div className="box-3">
                <ResultTable/>
            </div>
            <div className="box-4">
                <Paginator/>
            </div>
        </div>
        )
};

export default MainPage;