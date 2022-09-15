import { createContext, useContext, useReducer } from "react";

const initialState = {
    update: false,
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_TRUE':
            state.update = true
            return state
            break;
        case 'UPDATE_FALSE':
            state.update = false
            return state
            break;
        default:
            return state
    }
}

const Context = createContext()

export const usePostContext = ()=>{
    return useContext(Context)
}


const ContextProvider = ({children}) => {
    const [ state, dispatch ] = useReducer(reducer, initialState)
    
    const value = {
        dispatch,
        state
    }

    return (
        <Context.Provider
            value={value}
        >
            {children}
        </Context.Provider>
    )
}

export default ContextProvider