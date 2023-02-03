import React from 'react';
import "./Styles.css"
import { useMediaQuery } from 'react-responsive'

const InputValues = () => {
    const isDesktop = useMediaQuery({query: '(min-width: 1135px)'})
    return (
        <div>
            Тут будут значения для ввода
        </div>
    )
};

export default InputValues;