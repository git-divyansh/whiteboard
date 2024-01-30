// This will contain all the logic happening inside the toolbox

import { MENU_ITEMS } from "../../Utils";
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    [MENU_ITEMS.PENCIL] : {
        color : "#000000",
        size : 3
    },
    [MENU_ITEMS.ERASER] : {
        color : "#fff",
        size : 10
    },
    [MENU_ITEMS.UNDO] : {},
    [MENU_ITEMS.REDO] : {},
    [MENU_ITEMS.DOWNLOAD] : {},
    [MENU_ITEMS.CLEAR] : {}
}

export const toolBoxSlice = createSlice({
    name : "toolbox",
    initialState,
    reducers: {
        changeColor: (state, action) => {
            state[action.payload.item].color = action.payload.color;
        },
        changeBrushSize : (state, action) => {
            state[action.payload.item].size = action.payload.size;
        }
    }
})

export const {changeColor, changeBrushSize, clearCanvas} = toolBoxSlice.actions;

export default toolBoxSlice.reducer;