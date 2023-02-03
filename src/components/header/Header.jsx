import React from 'react';

import { useMediaQuery } from 'react-responsive'
import "./Header.css"
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import {FiLogIn} from "react-icons/fi"
import { IconContext } from "react-icons";

const Header = ({name, variant, isLoggedIn}) => {
    const isDesktop = useMediaQuery({query: '(min-width: 1135px)'})
    if (isDesktop) return (
        <div className="header">
            <div className="content">
                <div className="name-and-var">
                <h1>{name}</h1>
                <h5>Вариант {variant} </h5>
                </div>
                    <Button variant="outline-light" color={"white"}>Log In</Button>
            </div>
        </div>
    );
    else return (
            <div className="header">
                <div className="content">
                <h1 style={{textAlign:'center'}}>
                    {name}
                </h1>
                    <IconContext.Provider value={{ color: "white", size: "2em" }}>
                        <FiLogIn />
                    </IconContext.Provider>

                </div>
            </div>
        );
};
function mapStateToHeaderProps(state) {
    return {
        isLoggedIn: state.loggedIn,
    }
}
export default connect(mapStateToHeaderProps)(Header);