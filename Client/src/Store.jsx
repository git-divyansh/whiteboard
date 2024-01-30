import {configureStore} from "@reduxjs/toolkit";
import menuReducer from "./Components/Slice/MenuSlice";
import toolBoxReducer from "./Components/Slice/ToolboxSlice";
import roomReducer from "./Components/Slice/RoomSlice";

export const store = configureStore({
    reducer : {
        menu : menuReducer,
        toolBox : toolBoxReducer,
        room : roomReducer,
    }
})