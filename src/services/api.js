import { BURGER_API_URL, HEADERS } from '../components/utils/constants'
import PropTypes from 'prop-types'

const checkReponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
}

const checkSuccess = (data) => {
    return data.success ? data : Promise.reject(data)
}

export const getIngredients = async () => {
    return await fetch(`${BURGER_API_URL}/ingredients`, {
        headers: HEADERS,
    })
        .then(checkReponse)
        .then(checkSuccess)
        .then((data) => data.data)
    /*
         .then((data) => {
      if (data?.success) return data.data;
      return Promise.reject(data);
    }
    );
    */
}

export const getOrderNumber = async (ingredients) => {
    return await fetch(`${BURGER_API_URL}/orders`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(ingredients),
    })
        .then(checkReponse)
        .then(checkSuccess)
        .then((data) => data)
}
