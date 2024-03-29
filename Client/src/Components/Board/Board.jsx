import { React, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Board.module.css";
import { MENU_ITEMS } from "../../Utils";
import { actionItemClick } from "../Slice/MenuSlice";
import { changeIncomingMessage } from "../Slice/RoomSlice";

class ListNode {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

let emptyCanvasCapture = null;
let move = null;

const Board = ({ socket }) => {
  const dispatch = useDispatch();

  const otherUserRef = useRef({ 
    isuser: false,
    username: null
  });

  const canvasRef = useRef(null);
  const shouldDraw = useRef(false);
  const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
  const actionMenuItem = useSelector((state) => state.menu.actionMenuItem);
  const { color, size } = useSelector((state) => state.toolBox[activeMenuItem]);
  const { name } = useSelector((state) => state.room);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const newNode = new ListNode(
      context.getImageData(0, 0, canvas.width, canvas.height)
    );
    move = newNode;
    emptyCanvasCapture = newNode;
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (actionMenuItem === MENU_ITEMS.DOWNLOAD) {
      const URL = canvas.toDataURL();
      const anchor = document.createElement("a");
      anchor.href = URL;
      anchor.download = "sketch.jpg";
      anchor.click();
    } else if (actionMenuItem === MENU_ITEMS.UNDO) {
      if (move && move.prev) {
        move = move.prev;
        const imageData = move.data;
        context.putImageData(imageData, 0, 0);
      }
    } else if (actionMenuItem === MENU_ITEMS.REDO) {
      if (move && move.next) {
        move = move.next;
        const imageData = move.data;
        context.putImageData(imageData, 0, 0);
      }
    } else if (actionMenuItem === MENU_ITEMS.CLEAR) {
      if (!canvasRef.current) return;

      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);
      move = null;
      move = new ListNode(emptyCanvasCapture.data);
    }
    dispatch(actionItemClick(null));
  }, [actionMenuItem]);

  // This use effect is used to update feautres of drawing
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const changeConfig = (color, size) => {
      context.strokeStyle = color;
      context.lineWidth = size;
    };

    changeConfig(color, size);

    socket.on("changeConfig", (args) => changeConfig(args.color, args.size));

    return () => {
      socket.off("changeConfig", (args) => changeConfig(args.color, args.size));
    };
  }, [color, size]);

  // This use effect is for mounting the canvas and related parts
  // This layout effect fires even before the useEffect
  useLayoutEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d", { willReadFrequently: true });

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);

    const beginPathCanvas = (x, y) => {
      context.beginPath();
      context.moveTo(x, y);
    };

    const drawLine = (x, y) => {
      context.lineTo(x, y);
      context.stroke();
    };

    const handleMouseDown = (e) => {
      // console.log(otherUserRef.current);
      if (otherUserRef.current.isuser) {
        alert(`${otherUserRef.current.username} is typing right now!`);
        return;
      }

      shouldDraw.current = true;
      beginPathCanvas(e.clientX, e.clientY + 23);
      socket.emit("beginPath", { x: e.clientX, y: e.clientY + 23, name: name });
    };

    const handleMouseUp = (e) => {
      // console.log(otherUserRef.current.isuser);
      shouldDraw.current = false;

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const node = new ListNode(imageData);
      move.next = node;
      node.prev = move;
      move = node;

      socket.emit("endPath", { x: e.clientX, y: e.clientY + 23, name: null });
    };

    const handleMouseMove = (e) => {
      if (!shouldDraw.current || otherUserRef.current.isuser) return;

      drawLine(e.clientX, e.clientY + 23);
      socket.emit("drawLine", { x: e.clientX, y: e.clientY + 23 });
    };

    const handleIcomingMessages = (messages) => {
      const incomingMessage = {
        ...messages,
        ownedByCurrentUser: messages.senderId === socket.id,
        name: messages.name,
      };
      dispatch(changeIncomingMessage(incomingMessage));
    };

    const solve = () => {
      canvas.addEventListener("mousedown", handleMouseDown);
      canvas.addEventListener("mouseup", handleMouseUp);
      canvas.addEventListener("mousemove", handleMouseMove);
    };

    canvas.addEventListener("mouseenter", solve);
    canvas.addEventListener("mouseout", handleMouseUp);

    socket.on("beginPath", (path) => {
      otherUserRef.current = {isuser : true, username : path.name};
      beginPathCanvas(path.x, path.y);
    });
    socket.on("drawLine", (path) => {
      drawLine(path.x, path.y);
    });
    socket.on("endPath", (path) => {
      otherUserRef.current = {isuser : false, username : path.name};
    });
    socket.on("newChat", (messages) => handleIcomingMessages(messages));

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseout", handleMouseUp);

      socket.off("beginPath", (x, y) => beginPathCanvas(x, y));
      socket.off("drawLine", (x, y) => drawLine(x, y));
      socket.off("newChat", (messages) => handleIcomingMessages(messages));
      socket.off("endPath", (path) => {});
      socket.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={
        activeMenuItem === MENU_ITEMS.ERASER
          ? styles.canvasContainerEraser
          : styles.canvasContainerBrush
      }
    />
  );
};

export default Board;
