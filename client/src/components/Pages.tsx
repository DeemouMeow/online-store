import React from "react";
import { useAppDispatch, useTypedSelector } from "../hooks/redux";
import { Pagination } from "react-bootstrap";
import { paginationSlice } from "../store/reducers/paginationReducer";

const Pages = () => {
    const dispatch = useAppDispatch();
    const totalDevicesCount = useTypedSelector(state => state.deviceReducer.count);
    const limit = useTypedSelector(state => state.paginationReducer.limit);
    const selectedPage = useTypedSelector(state => state.paginationReducer.page);
    const pagesCount = Math.ceil(totalDevicesCount / limit);
    const setPage = (page: number) => dispatch(paginationSlice.actions.setPage(page));
    const pages = [];

    for (let i = 1; i <= pagesCount; i++) pages.push(i);
    return (
        <Pagination className="mt-5">
            {pages.map(page =>
                <Pagination.Item
                    key={page}
                    active={selectedPage === page}
                    onClick={() => setPage(page)}
                >
                    {page}
                </Pagination.Item>)
            }
        </Pagination>
    );
}

export default Pages;