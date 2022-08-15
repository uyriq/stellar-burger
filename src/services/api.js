import { BURGER_API_URL, HEADERS } from '../components/utils/constants';

const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};
export const getIngredients = async () => {
  return await fetch(`${BURGER_API_URL}/ingredients`, {headers: HEADERS})
    .then(checkReponse)
    .then((data) => {
      if (data?.success) return data.data;
      return Promise.reject(data);
    });
};

