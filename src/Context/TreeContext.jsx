import { createContext, useContext, useEffect, useReducer, useState, useMemo, useCallback } from "react";
import { reducer } from "../Reducers/NodeReducer";
import { v4 as uuidv4 } from 'uuid';
import { useNodesState, useEdgesState } from '@xyflow/react';
import dagre from '@dagrejs/dagre';

import Account from "../Components/MainScreen/Nodes/Account";
import Loan from "../Components/MainScreen/Nodes/Loan";
import Collateral from "../Components/MainScreen/Nodes/Collateral";

const NodeContext = createContext();

const initialState = {
    nodes: [],
    edges: []
};

const nodeTypes = {
    account: Account,
    loan: Loan,
    collateral: Collateral
};

const nodeWidth = 150;
const nodeHeight = 50;

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

export const NodeProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [nodeActive, setNodeActive] = useState({ show: false, data: {} });

    const { nodes: initialNodes, edges: initialEdges } = useMemo(() => (
        getLayoutedElements(state.nodes, state.edges)
    ), [state.nodes, state.edges]);

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const handleShow = useCallback((obj) => {
        setNodeActive(prev => ({ ...prev, show: true, data: obj }));
    }, []);

    const handleClose = useCallback(() => {
        setNodeActive(prev => ({ ...prev, show: false, data: {} }));
    }, []);

    const handleAddAccount = useCallback(() => {
        const id = uuidv4();
        const node = {
            id,
            data: { id, name: "user", address: "xyz", type: "account" },
            type: "account",
            position: { x: 0, y: 0 }
        };
        dispatch({ type: "ADD_NODE", payload: node });
    }, [dispatch]);

    const onAddLoan = useCallback((isChild = false) => {
        const id = uuidv4();
        const node = {
            id,
            data: {
                id,
                user: nodeActive.data.name,
                amount: "1000",
                type: "loan",
                isChild
            },
            type: "loan",
            position: { x: 0, y: 0 }
        };
        dispatch({ type: "ADD_NODE", payload: node });

        if (isChild) {
            dispatch({
                type: "ADD_EDGE",
                payload: {
                    id: `${nodeActive.data.id}-${id}`,
                    source: nodeActive.data.id,
                    target: id,
                    type: 'smoothstep',
                    animated: true
                }
            });
        }
    }, [dispatch, nodeActive]);

    const onAddCollateral = useCallback(() => {
        const id = uuidv4();
        dispatch({
            type: "ADD_NODE",
            payload: {
                id,
                data: {
                    id,
                    user: nodeActive.data.name,
                    item: "car",
                    type: "collateral"
                },
                type: "collateral",
                position: { x: 0, y: 0 }
            }
        });

        dispatch({
            type: "ADD_EDGE",
            payload: {
                id: `${nodeActive.data.id}-${id}`,
                source: nodeActive.data.id,
                target: id,
                type: 'smoothstep',
                animated: true
            }
        });
    }, [dispatch, nodeActive]);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        if (name === "amount" && isNaN(value)) return;
        setNodeActive(prev => ({
            ...prev,
            data: {
                ...prev.data,
                [name]: value
            }
        }));
    }, []);

    const handleExport = useCallback(() => {
        const data = JSON.stringify({ nodes, edges }, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'loan_data.json';
        document.body.appendChild(link);
        link.click();
        link.remove();
    }, [nodes, edges]);

    useEffect(() => {
        const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
            state.nodes,
            state.edges
        );
        setNodes(layoutedNodes);
        setEdges(layoutedEdges);
    }, [state.nodes, state.edges, setNodes, setEdges]);

    const value = useMemo(() => ({
        state,
        nodeActive,
        nodeTypes,
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
        setNodeActive,
        handleShow,
        handleClose,
        handleAddAccount,
        onAddLoan,
        onAddCollateral,
        handleChange,
        handleExport,
        dispatch
    }), [state, nodeActive, nodes, edges, handleShow, handleClose, handleAddAccount, onAddLoan, onAddCollateral, handleChange, handleExport, dispatch]);

    return (
        <NodeContext.Provider value={value}>
            {children}
        </NodeContext.Provider>
    );
};

export const useNode = () => useContext(NodeContext);
