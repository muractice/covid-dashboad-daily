import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios"
//import { type } from "node:os";
import { RootState } from "../../app/store"
import dataDaily from "./apiDataDaily.json"

const apiUrl = "https://api.covid19api.com/total/country"

type DATADAILY = typeof dataDaily;

type covidState = {
    daily: DATADAILY;
    country: String;
}

const initialState: covidState = {
    daily: dataDaily,
    country: "japan",
}

export const fetchAsyncGetDaily = createAsyncThunk(
    "covid/getdDaily",
    async (country: String) => {
        const { data } = await axios.get<DATADAILY>(`${apiUrl}/${country}`);
        return {data: data, country: country};
    }
)

const covidSlice = createSlice({
    name: "covid",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAsyncGetDaily.fulfilled, 
            (state, action) => {
                return {
                    ...state,
                    daily: action.payload.data,
                    country: action.payload.country,
                };
            });
    },
});

export const selectDaily = (state: RootState) => state.covid.daily;
export const selectCountry = (state: RootState) => state.covid.daily;

export default covidSlice.reducer;