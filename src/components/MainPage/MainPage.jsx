import React from 'react';
import { useMediaQuery } from 'react-responsive'
import "./Styles.css"
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";


const MainPage = () => {
    const {loggedIn} = useSelector(state => state.userReducer);
    const isDesktop = useMediaQuery({query: '(min-width: 1135px)'})

    if (!loggedIn) {
        return <Navigate to="/login"/>
    }

};

export default MainPage;