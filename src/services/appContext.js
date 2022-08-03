import React from "react";

export const TotalPriceContext = React.createContext(null);
export const DataContext = React.createContext([]);
export const OrderContext = React.createContext([]);

const [data, dataDispatcher] = React.useReducer(
    reducer,
    [],
);

const reducer = (data, action) => {
    console.dir(action)
    const { type, payload, state } = action;
    console.log(data)
    console.log(state)
    data = state
    switch (type) {
        case "DELETE":
            return {
                data:
                    data.filter((item) => item._id !== payload._id),
            };
        default:
            throw new Error(`Wrong type of action: ${type}`);
    }
};

