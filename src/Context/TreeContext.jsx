import { createContext, useContext, useEffect, useReducer, useState } from "react"
import { reducer } from "../Reducers/NodeReducer"
import { v4 as uuidv4 } from 'uuid';
import {
    useNodesState,
    useEdgesState
} from '@xyflow/react';
import dagre from '@dagrejs/dagre';

import Account from "../Components/MainScreen/Nodes/Account";
import Loan from "../Components/MainScreen/Nodes/Loan";
import Collateral from "../Components/MainScreen/Nodes/Collateral";
const NodeContext = createContext()

const initialState = {
    nodes: [],
    edges: []
}

const nodeTypes = {
    account: Account,
    loan: Loan,
    collateral: Collateral
};

const nodeWidth = 150;
const nodeHeight = 50;


export const NodeProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [nodeActive, setNodeActive] = useState({
        show: false,
        data: {}
    })


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

    const handleAddAccount = () => {
        let uniqueId = uuidv4()
        const obj = {
            id: uniqueId,
            data: {
                id: uniqueId,
                name: "user",
                address: "xyz",
                type: "account"
            },
            type: "account",
            position: { x: 0, y: 0 }
        }
        dispatch({ type: "ADD_NODE", payload: obj })
    }

    const onAddLoan = (isChild = false) => {
        let uniqueId = uuidv4()
        const obj = {
            id: uniqueId,
            data: {
                id: uniqueId,
                user: nodeActive.data.name,
                amount: "1000",
                type: "loan",
                isChild: isChild
            },
            type: "loan",
            position: { x: 0, y: 0 }
        }

        dispatch({ type: "ADD_NODE", payload: obj })
        if (isChild) {
            const edgeData = {
                id: `${nodeActive.data.id}-${uniqueId}`, source: nodeActive.data.id, target: uniqueId, type: 'smoothstep', animated: true
            }
            dispatch({ type: "ADD_EDGE", payload: edgeData })
        }
    }

    const onAddCollateral = () => {
        let uniqueId = uuidv4()
        const obj = {
            id: uniqueId,
            data: {
                id: uniqueId,
                user: nodeActive.data.name,
                item: "car",
                type: "collateral"
            },
            type: "collateral",
            position: { x: 0, y: 0 }
        }

        const edgeData = {
            id: `${nodeActive.data.id}-${uniqueId}`, source: nodeActive.data.id, target: uniqueId, type: 'smoothstep', animated: true
        }

        dispatch({ type: "ADD_NODE", payload: obj })
        dispatch({ type: "ADD_EDGE", payload: edgeData })
    }

    const handleChange = (e) => {
        let { name, value } = e.target
        if (name === "amount") {
            if (!isNaN(value)) {
                setNodeActive({
                    ...nodeActive,
                    data: {
                        ...nodeActive.data,
                        [name]: value
                    }
                })
            }
        } else {
            setNodeActive({
                ...nodeActive,
                data: {
                    ...nodeActive.data,
                    [name]: value
                }
            })
        }
    }


    const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

    const getLayoutedElements = (nodes, edges, direction = 'LR') => {
        const isHorizontal = direction === 'LR';
        dagreGraph.setGraph({ rankdir: direction });

        nodes.forEach((node) => {
            dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
        });

        edges.forEach((edge) => {
            dagreGraph.setEdge(edge.source, edge.target);
        });

        dagre.layout(dagreGraph);

        const newNodes = nodes.map((node) => {
            const nodeWithPosition = dagreGraph.node(node.id);
            return {
                ...node,
                position: {
                    x: nodeWithPosition.x - nodeWidth / 2,
                    y: nodeWithPosition.y - nodeHeight / 2
                },
                targetPosition: isHorizontal ? 'left' : 'top',
                sourcePosition: isHorizontal ? 'right' : 'bottom',
            };
        });

        return { nodes: newNodes, edges };
    };

    const { nodes: initialNodes, edges: initialEdges } = getLayoutedElements(
        state.nodes,
        state.edges
    );

    const [nodes, setNodes] = useNodesState(initialNodes);
    const [edges, setEdges] = useEdgesState(initialEdges);


    const handleExport = () => {
        const data = {
            nodes,
            edges
        };
        const json = JSON.stringify(data, null, 2);

        const blob = new Blob([json], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'loan_data.json';
        document.body.appendChild(link);
        link.click();
        link.remove();
    }

    useEffect(() => {
        const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
            state.nodes,
            state.edges
        );
        setNodes(layoutedNodes);
        setEdges(layoutedEdges);
    }, [state.nodes, state.edges]);


    return (
        <NodeContext.Provider value={{
            state,
            nodeActive,
            nodeTypes,
            nodes,
            edges,
            setNodeActive,
            handleShow,
            handleClose,
            handleAddAccount,
            onAddLoan,
            onAddCollateral,
            handleChange,
            handleExport,
            dispatch
        }}>
            {children}
        </NodeContext.Provider>
    )
}

export const useNode = () => useContext(NodeContext)