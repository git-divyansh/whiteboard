import React from 'react'
import { IoExit } from "react-icons/io5";
import styles from "./Board.module.css";
import { removeNameRoomId } from '../Slice/RoomSlice'; 
import {useDispatch} from "react-redux"
import {Link } from 'react-router-dom';

const Exit = () => {

    const dispatch = useDispatch();

    const handleExitButton = () => {
      dispatch(removeNameRoomId(null));
    }

  return (
    <div className={styles.exitButtonContainer} onClick={handleExitButton}>
        <Link to="/" exact style={{textDecorationStyle : "none", color : "inherit"}} onClick={handleExitButton}><IoExit className={styles.exitIcon}/></Link>
        <span className={styles.tooltiptext}>Exit</span>
    </div>
  )
}

export default Exit