import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import {setIsLoading} from './isLoading.slice'

export const prodSlice = createSlice({
		name: 'prod',
    initialState: [],
    reducers: {
        setProd : (state, action) => {
            return action.payload
        }
    }
})

export const getProdThunk = () => dispatch => {
    dispatch( setIsLoading(true))
    axios
        .get("https://e-commerce-api-v2.academlo.tech/api/v1/cart", getConfig())
        .then(resp => dispatch(setProd(resp.data)))
        .catch(error => console.error(error))
        .finally(() => dispatch(setIsLoading(false)))
}

export const createProductThunk = data => dispatch => {
    dispatch( setIsLoading(true))
    axios
        .post("https://e-commerce-api-v2.academlo.tech/api/v1/cart", data, getConfig())
        .then( () => dispatch(getProdThunk()) )
        .catch( error => console.error(error))
        .finally(() => dispatch(setIsLoading(false)))
}

export const cartCheckoutThunk = () => dispatch => {
    dispatch( setIsLoading(true))
    axios
        .post("https://e-commerce-api-v2.academlo.tech/api/v1/purchases",{} ,getConfig())
        .then(() => dispatch(getProdThunk()))
        .catch( error => console.error(error))
        .finally(() => dispatch(setIsLoading(false)))
}

export const deleteProductThunk = (id) => dispatch => {
    dispatch( setIsLoading(true))
    axios  
        .delete(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${id}` ,getConfig())
        .then(() => dispatch(getProdThunk()))
        .catch( error => console.error(error))
        .finally(() => dispatch(setIsLoading(false)))
        
}

export const { setProd } = prodSlice.actions;

export default prodSlice.reducer;