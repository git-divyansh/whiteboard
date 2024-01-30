import React, { useEffect, useLayoutEffect, useRef } from "react";
import Board from "../Components/Board/Board.jsx";
import Menu from "../Components/Menu/Menu.jsx";
import Tools from "../Components/Tools/Tools.jsx";
import Chat from "../Components/Chat/Chat.jsx";
import {useParams} from 'react-router-dom';
import { socketConnection } from "../Socket.jsx";
import Exit from "../Components/Board/Exit.jsx";
 
const Sketch = () => {

  const {roomId} = useParams();
  const socket = socketConnection(roomId);

  return (
    <div>
      <Exit />
      <Menu />
      <Chat socket = {socket} />
      <Tools socket = {socket} />
      <Board socket = {socket} />
    </div>
  );
};

export default Sketch;
