import { io } from "socket.io-client";
import {URL} from "./Utils";
import {useDispatch} from "react-redux";
import { updateRoomId } from "./Components/Slice/RoomSlice"; 
import { removeNameRoomId } from "./Components/Slice/RoomSlice";

export const socketConnection = (roomId) => {
    const dispatch = useDispatch(); 
    const socket = io(URL, {extraHeaders : {roomid : roomId}});
    const prevRoomId = sessionStorage.getItem("room-id");
    if(prevRoomId && JSON.parse(prevRoomId) !== roomId){ 
        dispatch(removeNameRoomId(null));
        dispatch(updateRoomId(roomId));
    }
    else{
        dispatch(updateRoomId(roomId));
    }    

    return socket;
};
