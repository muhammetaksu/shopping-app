import { createContext, useState } from "react";

export const todoContext = createContext(null)


export const TodoProvider = ({children}) => {

    const [todos, setTodos] = useState([]);


    const values = {
        todos,
        setTodos
    }

    return <todoContext.Provider value={values}>{children}</todoContext.Provider>
}