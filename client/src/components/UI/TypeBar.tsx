import React, { FC, useCallback } from "react";
import { useAppDispatch, useTypedSelector } from "../../hooks/redux";
import { ListGroup } from "react-bootstrap";
import { typeSlice } from "../../store/reducers/typeSlice";
import { IType } from "../../types/models/IType";
import { paginationSlice } from "../../store/reducers/paginationReducer";

const TypeBar: FC = () => {
    const dispatch = useAppDispatch();
    const types = useTypedSelector(state => state.typeReducer.types);
    const selectedType = useTypedSelector(state => state.typeReducer.selectedType);
    const selectType = useCallback((type: IType | null) => {
        dispatch(paginationSlice.actions.setPage(1));
        dispatch(typeSlice.actions.selectType(type));
    }, []);

    
    return (
        <ListGroup style={{maxHeight: 300, overflow: "scroll", overflowX: "hidden"}}>
            <ListGroup.Item
                style={{ cursor: "pointer" }}
                onClick={() => selectType(null)}
                active={false}
            >
                Anyway
            </ListGroup.Item>
            {types.map(type =>
                <ListGroup.Item
                    style={{ cursor: "pointer" }}
                    key={type.id}
                    onClick={() => selectType(type)}
                    active={type.id === selectedType?.id}
                >
                    {type.name}
                </ListGroup.Item>)}
        </ListGroup>
    );
}

export default TypeBar;
