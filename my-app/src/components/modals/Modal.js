import React from 'react'
import Style from './modal.module.css';
function Modal(props) {
    console.log(props)
  return (
    <div className={Style.modal_container}>
        <h4>user created succesfully</h4>
        <button onClick={()=>props.setModal(false)} className={Style.close_modal}>close </button>
    </div>
  )
}

export default Modal