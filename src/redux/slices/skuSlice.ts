import { createSlice } from "@reduxjs/toolkit";

export interface Skus {
    // ["Seq No."]: number;
    // City: string;
    isNew?: boolean;
    Class?: string;
    Cost: number;
    Department?: string;
    ID: string;
    Label: string;
    Price: number;
}

export interface Sku {
    skus: Skus[];
}

const initialState: Sku = {
    skus: []
};

const skuSlice = createSlice({
    name: 'sku',
    initialState,
    reducers: {
        addToSkus: (state, action) => {
            state.skus = [...state.skus, ...action.payload];
        },
        removeFromSkus: (state, action) => {
            state.skus = state.skus.filter((store) => store.ID !== action.payload);
        },
        updateSkus: (state, action) => {
            const { ID, updatedStore } = action.payload;
            state.skus = state.skus.map((store) =>
                store.ID === ID ? { ...store, ...updatedStore } : store
            );
        }
    }
})

export default skuSlice.reducer;
export const { addToSkus, removeFromSkus, updateSkus } = skuSlice.actions;