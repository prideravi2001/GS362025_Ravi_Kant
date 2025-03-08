import { createSlice } from "@reduxjs/toolkit";

interface Stores {
    ["Seq No."]: number;
    City: string;
    ID: string;
    Label: string;
    State: string;
}

export interface Store {
    stores: Stores[];
}

const initialState: Store = {
    stores: []
};

const storeSlice = createSlice({
    name: 'store',
    initialState,
    reducers: {
        addToStore: (state, action) => {
            state.stores = [...state.stores, ...action.payload];
        },
        removeFromStore: (state, action) => {
            state.stores = state.stores.filter((store) => store.ID !== action.payload);
        },
        updateStore: (state, action) => {
            const { ID, updatedStore } = action.payload;
            state.stores = state.stores.map((store) =>
                store.ID === ID ? { ...store, ...updatedStore } : store
            );
        }
    }
})

export default storeSlice.reducer;
export const { addToStore, removeFromStore, updateStore } = storeSlice.actions;