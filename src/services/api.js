import React, {

} from "react"


import { INGREDIENTS_URL, HEADERS, ORDER_URL } from "../components/utils/constants";

export const getIngredients = () => {
  const fetchData = async () => {
    let data = [];
    let isLoading = true;
    let isError = false;
    try {
   await new Promise((resolve, reject) => {
        fetch(INGREDIENTS_URL, { headers: HEADERS })
          .then(response => {
            if (response.ok) {
             // let cloneresponse = response.clone()
            //  data = cloneresponse.json() // (response.json().data)
            //  console.log(data.data)
              resolve(response.json());
            }
            reject(`Ошибка ${response.status}`);
          });
      });

    }
    catch (error) {
      isError = true;
    }
    isLoading = false;
    console.log(data)
    return [data , isLoading, isError];
  };
  return  fetchData().then((data) => {
    console.log(data); // JSON data parsed by `data.json()` call
  });
  // return [data, isLoading, isError]
}

  /* export const setOrder = (ingredients) => {
    const postData = async () => {
   try { await new Promise((resolve, reject) => {
    fetch( ORDER_URL, {
      method: "POST",
      headers:  HEADERS,
      body: JSON.stringify({ingredients})
    }).then(response => {
      if (response.ok) {
        setData(response.json())
        resolve(response.json())
      }
      reject(`Ошибка ${response.status}`)
    })
  }
  } catch (error) {
    console.log(error);
  }
  postData()
  }
   */
  export const getIngredients2 = async () => {
    return await new Promise((resolve, reject) => {

      fetch(INGREDIENTS_URL)
        .then(response => {
          if (response.ok) {
            resolve(response.json());
          }
          reject(`Ошибка ${response.status}`);
        });
    });
  }

  export async function getData2(query = 'posts') {
    return await fetch(`https://jsonplaceholder.typicode.com/${query}`)
      .then(response => {
        if (response.ok) {
          return { data: response.json().data, success: true }
        }
        throw response;
      }).catch(error => {
        console.error('error with fetch', error);
      }).finally(() => {
        console.log('fetch finished')
        return {
          "success": false,
          "error": true,
          "data": []
        }

      })
  }


  export function getData() {
    return fetch(`https://norma.nomoreparties.space/api/ingredients`)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw response;
      }).catch(error => {
        console.error('error with fetch', error);
      }).finally(() => {
        console.log('fetch finished')
        // return {
        //     "success": false,
        //     "error": true,
        //     "data": [{}]
        // }
        return
      })



  }



  export const getIns = async () => {
    try {
      const res = await fetch(INGREDIENTS_URL)
      if (!res.ok) throw new Error('fetch trouble')
      if (res.ok) {
        const apidata = await res.json()
        console.info('data-ok!', apidata)
        return apidata
      }
    } catch (e) {
      console.info(`облом - ${e.message}`);
      return []
    }
  }

