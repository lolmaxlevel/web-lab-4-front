import React from 'react';
import "./Styles.css"
import { useMediaQuery } from 'react-responsive'

const ResultTable = () => {
    const isDesktop = useMediaQuery({query: '(min-width: 1135px)'})
    return (
        <div>
            <div className="plate-top">
                <h2 className="plate-top-title">Результат</h2>
            </div>
            <div className="scroll-container">
                тут будет таблица
            </div>
        </div>
    )
};

export default ResultTable;
