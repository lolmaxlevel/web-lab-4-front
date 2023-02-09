import React from 'react';
import { useMediaQuery } from 'react-responsive'
import "./Styles.css"
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import Graph from "./Graph";
import ResultTable from "./ResultTable";
import GraphForm from "./GraphForm";


const MainPage = () => {
    const {loggedIn} = useSelector(state => state.userReducer);

    const isDesktop = useMediaQuery({query: '(min-width: 1135px)'})
    if (!loggedIn) {
        return <Navigate to="/login"/>
    }
    return (
        <div>
        <table id="main-grid">
            <thead></thead>
            <tbody>
            <tr>
                <td className="content-plate" id="graph-plate">
                    <Graph/>
                </td>
                <td className="content-plate" id="table-plate" rowSpan="2">
                    <ResultTable/>
                </td>
            </tr>

            <tr>
                <td className="content-plate" id="values-plate">
                    <div className="plate-top">
                        <h2 className="plate-top-title">Значения</h2>
                    </div>
                    <GraphForm/>
                </td>
            </tr>
            </tbody>
        </table>
        </div>
        )
};

export default MainPage;