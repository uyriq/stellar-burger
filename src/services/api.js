import React , {  useContext, useState   } from "react"

const apiBaseUrl = 'https://norma.nomoreparties.space/api'
const apiEndpoints = {
    ingredients: '/ingredients',
    orders: '/orders'
 }

export const  getIngredients = async () => {
    try {
        const res = await fetch(`${apiBaseUrl}${apiEndpoints.ingredients}`)
        if (!res.ok) throw new Error('fetch trouble')
        if (res.ok) {
            const apidata = await res.json()
            setIngredients(ingredients => ({...ingredients, success: apidata.success, data: apidata.data}))
        }
    } catch (e) {
        console.info(`облом - ${e.message}`);
        setIngredients(ingredients => ({ ...ingredients, error: true }))
    }
}

export const  getOrder = async () => {
    try {
        const res = await fetch(`${apiBaseUrl}${apiEndpoints.ingredients}`)
        if (!res.ok) throw new Error('fetch trouble')
        if (res.ok) {
            const apidata = await res.json()
            setIngredients(ingredients => ({ ...ingredients, success: apidata.success, data: apidata.data }))
        }
    } catch (e) {
        console.info(`облом - ${e.message}`);
        setIngredients(ingredients => ({ ...ingredients, error: true }))
    }
}
