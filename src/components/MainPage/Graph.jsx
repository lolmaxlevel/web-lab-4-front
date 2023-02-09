import React, {useEffect} from 'react';
import "./Styles.css"
import {useDispatch, useSelector} from "react-redux";
import {userSlice} from "../../store/reducers/userSlice";
import {fetchAddAttempt} from "../../store/actions/ActionCreators";

const Graph = () => {
    const dispatch = useDispatch();
    const {attempts, rValue, needUpdate} = useSelector(state => state.userReducer);
    const {setErrorMessage} = userSlice.actions;

    useEffect(() => {
        const canvas = document.getElementById("graph");
        const ctx = canvas.getContext('2d');
        drawGraph(ctx, canvas, attempts, rValue, setErrorMessage);
    }, [attempts, rValue, needUpdate, setErrorMessage])


    function sendAttempt(e){
            if (rValue <= 0) {
                setErrorMessage("Please, select a correct R");
            } else {
                e = e.nativeEvent
                let graph_x = e.offsetX;
                let graph_y = e.offsetY;
                let normalized_x = (graph_x-(e.path[0].width/2)) / (e.path[0].height/2) * rValue;
                let normalized_y = -(graph_y-(e.path[0].height/2)) / (e.path[0].width/2) * rValue;
                dispatch(fetchAddAttempt({x: normalized_x, y: normalized_y, r: rValue}))
            }
    }

    return (
        <div>
            <div className="plate-top">
                <h2 className="plate-top-title">Координатная плоскость на которую можно нажать</h2>
            </div>
            <div className="image-container">
                <canvas height="300" width="300" id="graph" onClick={(e) => sendAttempt(e)}></canvas>
            </div>
        </div>
    )
};
function drawGraph(ctx, canvas, attempts, rValue) {
    let x = canvas.width;
    let y = canvas.height;
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = 'black';
    redrawGraph();

    function drawAxes() {
        ctx.save();
        drawLineFromTo(x / 2, 0, x / 2, y);
        drawLineFromTo(0, y / 2, x, y / 2);
        ctx.lineWidth = ctx.lineWidth - 0.5;
        //arrows
        drawLineFromTo(x / 2, 0, x / 2 - 5, 10);
        drawLineFromTo(x / 2, 0, x / 2 + 5, 10);
        drawLineFromTo(x, y / 2, x - 10, y / 2 + 5);
        drawLineFromTo(x, y / 2, x - 10, y / 2 - 5);
        //-R/2 lines
        drawLineFromTo(x / 4, y / 2, x / 4, y / 2 - 5);
        drawLineFromTo(x / 4, y / 2, x / 4, y / 2 + 5);
        drawLineFromTo(x / 2, 3 * (y / 4), x / 2 + 5, 3 * (y / 4));
        drawLineFromTo(x / 2, 3 * (y / 4), x / 2 - 5, 3 * (y / 4));
        //R/2 lines
        drawLineFromTo(3 * (x / 4), y / 2, 3 * (x / 4), y / 2 - 5);
        drawLineFromTo(3 * (x / 4), y / 2, 3 * (x / 4), y / 2 + 5);
        drawLineFromTo(x / 2, y / 4, x / 2 + 5, y / 4);
        drawLineFromTo(x / 2, y / 4, x / 2 - 5, y / 4);
        ctx.restore();

    }

    function drawTriangle() {
        ctx.save();
        ctx.lineWidth = ctx.lineWidth - 0.5;
        let triangle = new Path2D();
        triangle.moveTo(3 * x / 4, y / 2);
        triangle.lineTo(x / 2, 3 * y / 4);
        triangle.lineTo(x / 2, y / 2);
        triangle.lineTo(x / 4, y / 2);
        triangle.closePath();
        //ctx.fillStyle = `rgb(51,153,255)`
        ctx.fillStyle = `#81888c`
        ctx.fill(triangle, "evenodd");
        ctx.restore();
    }

    function drawCircle() {
        ctx.save();
        ctx.lineWidth = ctx.lineWidth - 0.5;
        let circle = new Path2D();

        circle.arc(x / 2, y / 2, x / 4, Math.PI + (Math.PI * 3) / 2, +(Math.PI * 2) / 2);
        circle.lineTo(x / 2, y / 2);
        //ctx.fillStyle = `rgb(51,153,255)`;
        ctx.fillStyle = `#81888c`
        ctx.fill(circle, "evenodd");
        ctx.restore();
    }

    function drawRectangle() {
        ctx.save()
        //ctx.fillStyle = `rgb(51,153,255)`;
        ctx.fillStyle = `#81888c`
        ctx.fillRect(x / 2, y / 2, x / 4, -y / 2);
        ctx.restore();
    }

    function drawText(r) {
        ctx.save();
        ctx.font = '15px monospace';
        ctx.fillStyle = `black`;
        if (r <= 0 || isNaN(parseInt(r))) {
            r = "R/2";
        } else r = (r / 2).toString();
        ctx.fillText(r, x / 2 + 10, y / 4 + 5)
        ctx.fillText(r, 3 * (x / 4) - 8, y / 2 - 8)
        ctx.fillText('-' + r, x / 2 + 10, 3 * (y / 4) + 5)
        ctx.fillText('-' + r, (x / 4) - 8, y / 2 - 8)
        ctx.restore();
    }

    function redrawGraph() {
        ctx.clearRect(0, 0, x, y);
        ctx.fillStyle = `black`
        drawTriangle();
        drawCircle();
        drawRectangle();
        drawAxes();
        drawText(rValue);
        drawDots();
    }

    function drawDots() {
        if (attempts.length !== 0) {
            attempts.forEach((dot => {
                drawDotOnGraph(dot.x / dot.r * (x / 2) + (x / 2), -dot.y / dot.r * (y / 2) + (y / 2), dot.result)
            }))
        }
    }

    function drawLineFromTo(x1, y1, x2, y2) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    function drawDotOnGraph(x, y, isHit) {
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI, false);
        ctx.fillStyle = isHit ? 'green' : 'red';
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = isHit ? '#003300' : '#450100';
        ctx.stroke();
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 1.5;
    }
}
export default Graph;