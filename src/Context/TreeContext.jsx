import { createContext, useContext, useReducer, useState } from "react"
import { reducer } from "../Reducers/NodeReducer"

const NodeContext = createContext()

const initialState = {
    nodes: [],
    edges: []
}


export const NodeProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [nodeActive, setNodeActive] = useState({
        show: false,
        data: {}
    })

    console.log(nodeActive, state);

    const handleShow = (obj) => {
        setNodeActive({
            ...nodeActive,
            show: true,
            data: obj
        })
    }

    const handleClose = () => {
        setNodeActive({
            ...nodeActive,
            show: false,
            data: {}
        })
    }


    return (
        <NodeContext.Provider value={{ state, nodeActive, handleShow, handleClose, dispatch }}>
            {children}
        </NodeContext.Provider>
    )
}

export const useNode = () => useContext(NodeContext)