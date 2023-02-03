import React from 'react';
import "./Styles.css"
import { useMediaQuery } from 'react-responsive'

const Graph = () => {
    const isDesktop = useMediaQuery({query: '(min-width: 1135px)'})
    return (
        <div>
            <div className="plate-top">
                <h2 className="plate-top-title">Координатная плоскость на которую можно нажать</h2>
            </div>
            <div className="image-container">
                <canvas height="300" width="300" id="graph"></canvas>
            </div>
        </div>
    )
};

export default Graph;