import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import "./Styles.css"
import RangeSlider from "react-bootstrap-range-slider";
import {useDispatch, useSelector} from "react-redux";
import {fetchAddAttempt, fetchDeleteAllAttempts} from "../../store/actions/ActionCreators";
import {userSlice} from "../../store/reducers/userSlice";

function GraphForm() {
    const {isLoading} = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const {setNeedUpdate, setRValue} = userSlice.actions;
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [r, setR] = useState(1);
    const handleSubmit = (event) => {
            event.preventDefault();
            event.stopPropagation();
            dispatch(fetchAddAttempt({x: x, y: y, r: r}));
            dispatch(setNeedUpdate(true));
    };
    const handleReset = (event) => {
        event.preventDefault();
        event.stopPropagation();
        dispatch(fetchDeleteAllAttempts());
        dispatch(setNeedUpdate(true));
    }
    function handleRChange(event) {
        setR(event.target.value);
        dispatch(setRValue(Number(event.target.value)));
        if (Math.abs(Number(x)) >= Number(event.target.value)) setX(event.target.value * Math.sign(Number(x)));
        if (Math.abs(Number(y)) >= Number(event.target.value)) setY(event.target.value * Math.sign(Number(y)));
    }
    return (
        <Form onSubmit={handleSubmit} onReset={handleReset}>
            <Row className="mb-3">
                <Form.Group >
                    <Form.Label>X: {x}</Form.Label>
                    <RangeSlider size={"lg"} variant={"dark"} value={x}
                                 min={Number(-r)} max={Number(r)}
                                 step={0.1}
                                 onChange={(e) => setX(e.target.value)} />
                    <Form.Label>Y: {y}</Form.Label>
                    <RangeSlider size={"lg"} variant={"dark"} value={y}
                                 min={Number(-r)} max={Number(r)}
                                 step={0.1}
                                 onChange={(e) => setY(e.target.value)} />
                    <Form.Label>R: {r}</Form.Label>
                    <RangeSlider size={"lg"} variant={"dark"} value={r}
                                 min={1} max={10}
                                 step={1}
                                 onChange={handleRChange} />
                </Form.Group>
            </Row>
            <Row className="mb-3">
            <Button type="submit" disabled={isLoading} variant="dark">Submit form</Button>
            </Row>
            <Row className="mb-3">
            <Button type="reset" disabled={isLoading} variant="dark">Delete all attempts</Button>
            </Row>
        </Form>
    );
}

export default GraphForm;