import { BURGER_API_URL, HEADERS } from '../components/utils/constants'

const checkReponse = (res) => (res.ok ? res.json() : res.json().then((err) => Promise.reject(err)))

const checkSuccess = (data) => (data.success ? data : Promise.reject(data))

export const getIngredients = async () =>
    // eslint-disable-next-line no-return-await
    await fetch(`${BURGER_API_URL}/ingredients`, {
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

export const getOrderNumber = async (ingredients) =>
    // eslint-disable-next-line no-return-await
    await fetch(`${BURGER_API_URL}/orders`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(ingredients),
    })
        .then(checkReponse)
        .then(checkSuccess)
        .then((data) => data)
