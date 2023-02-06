import React from 'react';

import MainForm from "./MainForm";
import {Alert, Nav} from "react-bootstrap";
import "./Style.css"
import {Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {userSlice} from "../../store/reducers/userSlice";

const LoginPage = () => {
    const {error,loggedIn} = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const {setErrorMessage} = userSlice.actions;

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
            <div className="errorBox">{error && <Alert variant="danger" onClose={() => dispatch(setErrorMessage(""))} dismissible>
                <Alert.Heading>It seems like we got an error =(</Alert.Heading>
                <p>
                    {error}
                </p>
            </Alert>
            }</div>
        </div>

    )
};

export default LoginPage