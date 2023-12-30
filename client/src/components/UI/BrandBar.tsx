import React, { FC, useCallback } from "react";
import { useAppDispatch, useTypedSelector } from "../../hooks/redux";
import { ListGroup } from "react-bootstrap";
import { brandSlice } from "../../store/reducers/brandSlice";
import { IBrand } from "../../types/models/IBrand";
import { paginationSlice } from "../../store/reducers/paginationReducer";

const BrandBar: FC = () => {
    const dispatch = useAppDispatch();
    const brands = useTypedSelector(state => state.brandReducer.brands);
    const selectedBrand = useTypedSelector(state => state.brandReducer.selectedBrand);
    const selectBrand = useCallback((brand: IBrand | null) => {
        dispatch(paginationSlice.actions.setPage(1));
        dispatch(brandSlice.actions.selectBrand(brand));
    }, []);


    return (
        <ListGroup className="mt-4" style={{ maxHeight: 300, overflow: "scroll", overflowX: "hidden" }}>
            <ListGroup.Item
                style={{ cursor: "pointer" }}
                onClick={() => selectBrand(null)}
                active={false}
            >
                Anyway
            </ListGroup.Item>
            {brands.map(brand =>
                <ListGroup.Item
                    style={{ cursor: "pointer" }}
                    key={brand.id}
                    onClick={() => selectBrand(brand)}
                    active={brand.id === selectedBrand?.id}
                >
                    {brand.name}
                </ListGroup.Item>)}
        </ListGroup>
    );
}

export default BrandBar;