import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import styles from "./Tools.module.css";
import Sketch from "@uiw/react-color-sketch";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MENU_ITEMS } from "./../../Utils";
import { changeColor, changeBrushSize } from "./../Slice/ToolboxSlice";


const Tools = ({socket}) => {

  const dispatch = useDispatch();
  const [isSelectColor, setSelectColor] = useState(true);

  const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
  const { color, size } = useSelector((state) => state.toolBox[activeMenuItem]);

  const showStrokeToolOption = activeMenuItem === MENU_ITEMS.PENCIL;

  const showBrushToolOption =
    activeMenuItem === MENU_ITEMS.PENCIL ||
    activeMenuItem === MENU_ITEMS.ERASER;

  useEffect(() => {
    socket.emit('changeConfig', {color : color, size : size});
  }, [activeMenuItem])

  const updateBrushSize = (e) => {
    dispatch(changeBrushSize({ item: activeMenuItem, size: e.target.value }));
    socket.emit('changeConfig', {color : color, size : e.target.value});
  };

  const updateColors = (color) => {
    dispatch(changeColor({ item: activeMenuItem, color: color.hex }));
    socket.emit('changeConfig', {color : color.hex, size : size});
  };

  const styleConfig = () => {
    if(!isSelectColor){
      const obj = {
        transform : "translateX(-90%)",
        visibility : "block"
      }
      return obj;
    }
    else{
      const obj = {
        transform : "translateX(0%)",
        visibility : "visible"
      }
      return obj;
    }
  }

  //{ display: `${isSelectColor ? "block" : "none"}` }

  return (
    <div className={styles.toolWrapper} style={styleConfig()}>
      <div
        className={styles.toolContainer}
      >
        <div>
        {showStrokeToolOption && (
          <div className={styles.toolItem}>
            <h5 className={styles.toolText}>Choose color</h5>
            <div className={styles.itemContainer}>
              <Sketch
                className={styles.colorboxContainer}
                color={color}
                onChange={updateColors}
                editableDisable = {false}
                style={{borderRadius : "10px", width : "14rem"}}
              />
            </div>
          </div>
        )}
        {showBrushToolOption && (
          <div className={styles.toolItem}>
            <h5 className={styles.toolText}>Brush size</h5>
            <div className={styles.itemContainer}>
              <input
                value={size}
                className={styles.rangeInput}
                type="range"
                min={1}
                max={activeMenuItem === MENU_ITEMS.PENCIL ? 10 : 50}
                step={1}
                onChange={updateBrushSize}
              />
            </div>
          </div>
        )}
        </div>
      <span
        className={styles.spanElement}
        onClick={() => {
          setSelectColor(!isSelectColor);
        }}
      >
        <p className={styles.iconBack}>
          {isSelectColor ? <IoMdArrowBack /> : <IoMdArrowForward />}
        </p>
      </span>
      </div>
    </div>
  );
};

export default Tools;
