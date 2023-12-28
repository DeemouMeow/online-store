import React, { FC } from 'react'
import { useAppDispatch, useTypedSelector } from '../../hooks/redux';
import { ListGroup } from 'react-bootstrap';
import { typeSlice } from '../../store/reducers/typeSlice';

const TypeBar: FC = () => {
    const dispatch = useAppDispatch();
    const types = useTypedSelector(state => state.typeReducer.types);
    const selectedType = useTypedSelector(state => state.typeReducer.selectedType);
    const { selectType } = typeSlice.actions;
    
    console.log("Render types");
    
    return (
        <ListGroup style={{maxHeight: 300, overflow: "scroll", overflowX: "hidden"}}>
            {types.map(type =>
                <ListGroup.Item
                    style={{ cursor: "pointer" }}
                    key={type.id}
                    onClick={() => dispatch(selectType(type))}
                    active={type.id === selectedType?.id}
                >
                    {type.name}
                </ListGroup.Item>)}
        </ListGroup>
    );
}

export default TypeBar;