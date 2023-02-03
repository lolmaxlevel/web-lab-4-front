import React from 'react';
import { useMediaQuery } from 'react-responsive'
import "./Styles.css"
import Header from "../header/Header";
import Graph from "./Graph";
import ResultTable from "./ResultTable";
import InputValues from "./InputValues";
import {Navigate, NavLink} from "react-router-dom";
import {connect} from "react-redux";



const MainPage = ({loggedIn}) => {
    const isDesktop = useMediaQuery({query: '(min-width: 1135px)'})
    if (!loggedIn) {
        return <Navigate to="/login"/>
    }

};

function mapStateToMainPageProps(state) {
    return {
        loggedIn: state.loggedIn,
    }
}
export default connect(mapStateToMainPageProps)(MainPage);