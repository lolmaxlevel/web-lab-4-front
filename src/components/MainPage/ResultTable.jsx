import React, {useEffect} from 'react';
import "./Styles.css"
import {useDispatch, useSelector} from "react-redux";
import {fetchAttempts} from "../../store/actions/ActionCreators";
import {Table} from "react-bootstrap";

const ResultTable = () => {
    const {attempts, needUpdate, activePage} = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAttempts((activePage - 1)*15,15))
    }, [needUpdate, activePage, dispatch])

    return (
        <div>
            <div className="plate-top">
                <h2 className="plate-top-title">Результат</h2>
            </div>
            <div>
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
                                <td>{attempt.x.toFixed(4)}</td>
                                <td>{attempt.y.toFixed(4)}</td>
                                <td>{attempt.r}</td>
                                <td style={{color:attempt.result ? "green" : "red"}}>
                                    {attempt.result ? "Hit" : "Miss"}
                                </td>
                                <td>{(new Date(attempt.attemptTime).toLocaleTimeString())}</td>
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
