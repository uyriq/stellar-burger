import { BURGER_API_URL, HEADERS } from '../utils/constants'

const checkReponse = (res) => (res.ok ? res.json() : res.json().then((err) => Promise.reject(err)))
const checkSuccess = (data) => (data.success ? data : Promise.reject(data))

function request(url, options) {
    // принимает два аргумента: url и объект опций
    return fetch(url, options).then(checkReponse).then(checkSuccess)
}

export const getIngredients = async () =>
    // eslint-disable-next-line no-return-await
    await request(`${BURGER_API_URL}/ingredients`, {
        headers: HEADERS,
    }).then((data) => data.data)

export const getOrderNumber = async (ingredients) =>
    // eslint-disable-next-line no-return-await
    await request(`${BURGER_API_URL}/orders`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(ingredients),
    })
