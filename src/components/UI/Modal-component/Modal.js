import React from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal-styles.module.scss';

const Backdrop = (props) => {
    return (
        <div className={classes.backdrop} onClick={props.onClose} />
    );
};

const ModalOverlay = ({children}) => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{children}</div>
        </div>
    );
};


const portalElement = document.getElementById('overlays');

export default function Modal(props) {
  return (
    <>
    {ReactDOM.createPortal(<Backdrop onClose = {props.onClose} />,portalElement)}
    {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,portalElement)}
    </>
  )
}
