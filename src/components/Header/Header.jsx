import React from 'react';

import { useMediaQuery } from 'react-responsive'
import "./Header.css"
import Button from "react-bootstrap/Button";
import {FiLogIn, FiLogOut} from "react-icons/fi"
import { IconContext } from "react-icons";
import {useDispatch, useSelector} from "react-redux";
import {fetchLogout} from "../../store/actions/ActionCreators";

const Header = ({name, variant}) => {
    const {loggedIn, username} = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const isDesktop = useMediaQuery({query: '(min-width: 1135px)'})
    function sendRedirect(){
        window.location.href = "/login"
    }
    if (isDesktop) return (
        <div className="header">
            <div className="content">
                <div className="name-and-var">
                    <h1>{name}</h1>
                    <h5>Вариант {variant} </h5>
                </div>
                <b>{loggedIn && username.substring(0,9)}</b>
                {!loggedIn
                    ?
                    <Button variant="outline-light" color={"white"} onClick={sendRedirect}>Log In</Button>
                    :
                    <Button variant="outline-light" color={"white"} onClick={() => dispatch(fetchLogout())}>Log Out</Button>
                }
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
                        {!loggedIn
                            ?
                            <FiLogIn />
                            :
                            <FiLogOut onClick={() => dispatch(fetchLogout())}/>
                        }
                    </IconContext.Provider>

                </div>
            </div>
        );
};

export default Header;