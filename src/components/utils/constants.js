const apiEndpoints = {
    ingredients: '/ingredients',
    orders: '/orders',
}
export const BURGER_API_URL = 'https://norma.nomoreparties.space/api'
export const INGREDIENTS_URL = BURGER_API_URL + apiEndpoints.ingredients
export const ORDER_URL = BURGER_API_URL + apiEndpoints.orders
export const HEADERS = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
}
