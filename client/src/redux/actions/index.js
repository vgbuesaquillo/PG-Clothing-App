export const GET_ALL_GALLERY = 'GET_ALL_GALLERY'
export const GET_FIND_GALLERY = 'GET_FIND_GALLERY'
export const LOCALSTORAGE = 'LOCALSTORAGE'
export const CATEGORIES = 'CATEGORIES'
export const POST_PRODUCTS = 'POST_PRODUCTS'
export const TOTAL_PRODUCT = 'TOTAL_PRODUCT'

export const getAllGallery = () => {
    return async function dispatch(dispatch) {
        const response = await fetch('http://localhost:5040/home');
        const json = await response.json();
        dispatch({
            type: GET_ALL_GALLERY,
            payload: json
        });
    }
}

export const getFindGallery = (input) => {
    return async function dispatch(dispatch) {
        const response = await fetch(`http://localhost:5040/home/name?name=${input}`);
        const json = await response.json();
        dispatch({
            type: GET_FIND_GALLERY,
            payload: json
        });
    }
}

export function localstorage(storage) {
    return {
        type: LOCALSTORAGE,
        payload: storage
    }
}

export function categories(category) {
    return async function dispatch(dispatch) {
        const response = await fetch('http://localhost:5040/home');
        const json = await response.json();
        dispatch({
            type: CATEGORIES,
            payload: [json, category]
        });
    }
}

export function postProducts(val){
    return async function dispatch(dispatch) {
        dispatch({
            type: POST_PRODUCTS,
            payload: val.filter(el => Array.isArray(el) != true)
        })
    }
}

export function totalProduct(){
    return async function dispatch(dispatch) {
        dispatch({
            type: TOTAL_PRODUCT
        })
    }
}