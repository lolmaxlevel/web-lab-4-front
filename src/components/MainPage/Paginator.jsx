import {Pagination} from "react-bootstrap";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchTableSize} from "../../store/actions/ActionCreators";
import {userSlice} from "../../store/reducers/userSlice";



const Paginator = () =>
{
    const {activePage, rowsCount, needUpdate} = useSelector(state => state.userReducer);
    const {setActivePage} = userSlice.actions;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTableSize())
    }, [dispatch, needUpdate])

    function handleSelect(eventKey) {
        dispatch(setActivePage(Number(eventKey.target.id)))
    }
    let items = [];
    for (let number = 1; number <= 1 + rowsCount/15; number++) {
        items.push(
            <Pagination.Item id={number} key={number} active={number === activePage} onClick={handleSelect}>
                {number}
            </Pagination.Item>,
        );
    }
    return     (
        <div>
            <Pagination >{items}</Pagination>
        </div>
    );
}


export default Paginator;