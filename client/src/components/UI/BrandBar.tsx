import React, { FC, memo, useMemo } from 'react'
import { useAppDispatch, useTypedSelector } from '../../hooks/redux';
import { Card, ListGroup, Row } from 'react-bootstrap';
import { brandSlice } from '../../store/reducers/brandSlice';

const BrandBar: FC = () => {
    const dispatch = useAppDispatch();
    const brands = useTypedSelector(state => state.brandReducer.brands);
    const selectedBrand = useTypedSelector(state => state.brandReducer.selectedBrand);
    const { selectBrand } = brandSlice.actions;

    return (
        <ListGroup className="mt-4" style={{maxHeight: 300, overflow: "scroll", overflowX: "hidden"}}>
            {brands.map(brand =>
                <ListGroup.Item
                    style={{ cursor: "pointer" }}
                    key={brand.id}
                    onClick={() => dispatch(selectBrand(brand))}
                    active={brand.id === selectedBrand?.id}
                >
                    {brand.name}
                </ListGroup.Item>)}
        </ListGroup>
    );
}

export default BrandBar;


// import React, { FC, memo, useMemo } from 'react'
// import { useAppDispatch, useTypedSelector } from '../../hooks/redux';
// import { Card, Row } from 'react-bootstrap';
// import { brandSlice } from '../../store/reducers/brandSlice';

// const BrandBar: FC = () => {
//     const dispatch = useAppDispatch();
//     const brands = useTypedSelector(state => state.brandReducer.brands);
//     const selectedBrand = useTypedSelector(state => state.brandReducer.selectedBrand);
//     const { selectBrand } = brandSlice.actions;

//     console.log("Render brands");

//     return (
//         <Row className="d-flex">
//             {brands.map(brand =>
//                 <Card
//                     style={{ cursor: "pointer" }}
//                     key={brand.id}
//                     className="p-2"
//                     onClick={() => dispatch(selectBrand(brand))}
//                     border={brand.id === selectedBrand?.id ? "primary" : "secondary"}
//                 >
//                     {brand.name}
//                 </Card>
//             )}
//         </Row>
//     );
// }

// export default BrandBar;