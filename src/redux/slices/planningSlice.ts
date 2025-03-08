import { createSlice } from "@reduxjs/toolkit";


export interface ICalender {
    Month: string;
    ["Month Label"]: string;
    ["Seq No."]: number;
    Week: string;
    ["Week Label"]: string;
}
export interface IPlanning {
    SKU: string;
    ["Sales Units"]: number;
    Store: string;
    Week: string;
}
export interface ICalculation {
    ["Cost Dollars"]: number;
    ["GM %"]: number;
    ["GM Dollars"]: number;
    SKU: string;
    ["Sales Dollars"]: number;
    ["Sales Units"]: number;
    Store: string;
    Week: string;
}

export interface IPlanningState {
    calender: ICalender[];
    planning: IPlanning[];
    calculation: ICalculation[];
}

const initialState: IPlanningState = {
    calender: [],
    planning: [],
    calculation: [],
}

const planningSlice = createSlice({
    name: 'planning',
    initialState,
    reducers: {
        addToPlanning(state, action) {
            console.log("action.payload------------------------------------------------");
            console.log(action.payload.type == "CALENDAR");
            console.log("action.payload------------------------------------------------");

            switch (action.payload.type) {
                case "CALENDAR":
                    state.calender = action.payload.data;
                    break;
                case "PLANNING":
                    state.planning = action.payload.data;
                    break;
                case "CALCULATIONS":
                    state.calculation = action.payload.data;
                    break;
                default:
                    break;
            }
        },

    }
})

export default planningSlice.reducer;
export const { addToPlanning } = planningSlice.actions;