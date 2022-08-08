const apiBaseUrl = 'https://norma.nomoreparties.space/api'
const apiEndpoints = {
  ingredients: '/ingredients',
  orders: '/orders'
}

export const INGREDIENTS_URL = apiBaseUrl + apiEndpoints.ingredients;
export const ORDER_URL = apiBaseUrl + apiEndpoints.orders;
export const HEADERS = { 'Content-Type': 'application/json' }