import { useDispatch, useSelector } from "react-redux";
import { FaPencilAlt, FaEraser } from "react-icons/fa";
import {
  FaArrowRotateLeft,
  FaArrowRotateRight,
  FaFileArrowDown,
} from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import cx from "classnames";
import styles from "./Menu.module.css";
import { MENU_ITEMS } from "./../../Utils";
import { menuItemClick, actionItemClick } from "./../Slice/MenuSlice";
import useDragger from "./../Hooks/useDragger";
import { useState } from "react";
import { updateUsername } from "../Slice/RoomSlice";

const Menu = () => {
  const [enterName, setEnterName] = useState("");
  const dispatch = useDispatch();
  const {activeMenuItem, actionMenuItem} = useSelector((state) => state.menu);
  const name = useSelector((state) => state.room.name);

  useDragger("tool-box");

  const handleMenuClick = (itemName) => {
    dispatch(menuItemClick(itemName));
  };

  const handleActionClick = (itemName) => {
    dispatch(actionItemClick(itemName));
  };

  const handleModalClick = () => {
    dispatch(updateUsername(enterName));
    setEnterName("");
  };

  return (
    <div style={{height : "100%", width : "100%"}}>
      {!name ? <div className={styles.formContainerModal}></div> : null}
      <dialog open={!name} className={styles.enterNameModal}>
        <div>
          <p>Enter your name before entering : </p>
          <form method="dialog">
            <input
              type="text"
              value={enterName}
              placeholder="Enter name"
              onChange={(e) => {
                setEnterName(e.target.value);
              }}
            />
            <button onClick={handleModalClick}>OK</button>
          </form>
        </div>
      </dialog>
      
      <div id="tool-box" className={styles.menuContainer} >
        <div
          className={cx(styles.iconWrapper, {
            [styles.active]: activeMenuItem === MENU_ITEMS.PENCIL,
          })}
          onClick={() => handleMenuClick(MENU_ITEMS.PENCIL)}
        >
          <FaPencilAlt className={styles.icon} />
        </div>
        <div
          className={cx((styles.iconWrapper), {
            [styles.active]: activeMenuItem === MENU_ITEMS.ERASER,
          })}
          onClick={() => handleMenuClick(MENU_ITEMS.ERASER)}
        >
          <FaEraser className={styles.icon} />
        </div>
        <div
          className={cx(styles.iconWrapper, {
            [styles.active]: actionMenuItem === MENU_ITEMS.UNDO,
          })}
          onClick={() => handleActionClick(MENU_ITEMS.UNDO)}
        >
          <FaArrowRotateLeft className={styles.icon} />
        </div>
        <div
          className={cx(styles.iconWrapper, {
            [styles.active]: actionMenuItem === MENU_ITEMS.REDO,
          })}
          onClick={() => handleActionClick(MENU_ITEMS.REDO)}
        >
          <FaArrowRotateRight className={styles.icon} />
        </div>
        <div
          className={cx(styles.iconWrapper, {
            [styles.active]: actionMenuItem === MENU_ITEMS.DOWNLOAD,
          })}
          onClick={() => handleActionClick(MENU_ITEMS.DOWNLOAD)}
        >
          <FaFileArrowDown className={styles.icon} />
        </div>
        <div
          className={cx(styles.iconWrapper, {
            [styles.active]: actionMenuItem === MENU_ITEMS.CLEAR,
          })}
          onClick={() => handleActionClick(MENU_ITEMS.CLEAR)}
        >
          <RiDeleteBin6Line className={styles.icon} />
        </div>
      </div>
    </div>
  );
};

export default Menu;
