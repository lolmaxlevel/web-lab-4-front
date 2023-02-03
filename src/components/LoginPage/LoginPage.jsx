import React from 'react';

import { useMediaQuery } from 'react-responsive'
import MainForm from "./MainForm";
import {Nav} from "react-bootstrap";
import "./Style.css"
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";

const LoginPage = ({loggedIn}) => {
    const isDesktop = useMediaQuery({query: '(min-width: 1135px)'})
    const [tab, setTab] = React.useState(true);
    function handleChange(){
        setTab(!tab)
    }
    if (loggedIn) return <Navigate to={"/"}/>
    return (
        <div className="loginCard">
            <div className="formCard">
            <Nav variant="tabs">
            <Nav.Item>
            <Nav.Link active={tab} onClick={handleChange}>Login</Nav.Link>
            </Nav.Item>
            <Nav.Item>
            <Nav.Link active={!tab} onClick={handleChange}>Register</Nav.Link>
            </Nav.Item>
            <Nav.Item>
            </Nav.Item>
            </Nav>
            <MainForm mode={tab ? "login": "register"}/>
            </div>
        </div>
    )
};
function mapStateToLoginPageProps(state) {
    return {
        errorMessage: state.loginFormErrorMessage,
        loggedIn: state.loggedIn
    }
}

export default connect(mapStateToLoginPageProps)(LoginPage)