import { BURGER_API_URL, HEADERS } from '../components/utils/constants';
import PropTypes from 'prop-types';

const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};
export const getIngredients = async () => {
  return await fetch(`${BURGER_API_URL}/ingredients`, { headers: HEADERS })
    .then(checkReponse)
    .then((data) => {
      if (data?.success) return data.data;
      return Promise.reject(data);
    });
};

export const getOrderNumber = async (ingredients) => {
  return await fetch(`${BURGER_API_URL}/orders`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(ingredients)
  })
    .then(checkReponse)
    .then((data) => {
      if (data?.success) return data
      return Promise.reject(data);
    });
};

const ingredients = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
    })).isRequired,
}

getOrderNumber.propTypes = { ingredients }.isRequired