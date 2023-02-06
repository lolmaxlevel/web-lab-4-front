import React, {useEffect} from 'react';
import "./Styles.css"
import { useMediaQuery } from 'react-responsive'
import {useDispatch, useSelector} from "react-redux";
import {userSlice} from "../../store/reducers/userSlice";
import {fetchAttempts, fetchLogin} from "../../store/actions/ActionCreators";
import {Table} from "react-bootstrap";

const ResultTable = () => {
    const isDesktop = useMediaQuery({query: '(min-width: 1135px)'})
    const {attempts} = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const {setAttempts} = userSlice.actions;

    useEffect(() => {
        dispatch(fetchAttempts(0,10))
    }, [])

    return (
        <div>
            <div className="plate-top">
                <h2 className="plate-top-title">Результат</h2>
            </div>
            <div className="scroll-container">
                <Table striped bordered hover variant="dark">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>X</th>
                        <th>Y</th>
                        <th>R</th>
                        <th>Result</th>
                        <th>Time</th>
                        <th>Process Time</th>
                    </tr>
                    </thead>
                    <tbody>
                    {attempts.map((attempt, index) => {
                        return (
                            <tr key={index}>
                                <td>{attempt.id}</td>
                                <td>{attempt.x}</td>
                                <td>{attempt.y}</td>
                                <td>{attempt.r}</td>
                                <td>{attempt.result ? "Hit" : "Miss"}</td>
                                <td>{attempt.attemptTime}</td>
                                <td>{attempt.processingTimeNanos}</td>
                            </tr>
                        )
                    }
                    )}
                    </tbody>
                </Table>
            </div>
        </div>
    )
};

export default ResultTable;
