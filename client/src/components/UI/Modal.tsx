import React, { FC, PropsWithChildren } from "react";
import "../../styles/modal.css";

interface IModalProps extends PropsWithChildren {
    visible: boolean;
    setVisible: (status: boolean) => void;
}


const Modal: FC<IModalProps> = ({ children, visible, setVisible }) => {
    const classes = ["modal"];

    if (visible) classes.push("active");

    return (
        <div className={classes.join(' ')} style={{height: "auto"} }onClick={e => setVisible(false)}>
            <div className="modal_body" onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

export default Modal;