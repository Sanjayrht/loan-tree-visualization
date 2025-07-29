import React, { useEffect } from 'react';
import {
    Background,
    ReactFlow,
    addEdge,
    ConnectionLineType,
    useNodesState,
    useEdgesState
} from '@xyflow/react';
import dagre from '@dagrejs/dagre';
import '@xyflow/react/dist/style.css';

import Account from './Nodes/Account';
import Loan from './Nodes/Loan';
import Collateral from './Nodes/Collateral';
import { useNode } from '../../Context/TreeContext';

const nodeTypes = {
    account: Account,
    loan: Loan,
    collateral: Collateral
};

const nodeWidth = 180;
const nodeHeight = 70;

const MainScreen = () => {
    const { state } = useNode();
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

    // Initialize layout
    const { nodes: initialNodes, edges: initialEdges } = getLayoutedElements(
        state.nodes,
        state.edges
    );

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    // Re-layout on context update
    useEffect(() => {
        const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
            state.nodes,
            state.edges
        );
        setNodes(layoutedNodes);
        setEdges(layoutedEdges);
    }, [state.nodes, state.edges]);

    const onConnect = (params) => {
        setEdges((eds) => addEdge({ ...params, type: 'smoothstep' }, eds));
    };

    return (
        <div className='min-h-[80vh] w-full border-2 m-4 rounded-2xl border-[var(--primary)]'>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                // onNodesChange={onNodesChange}
                // onEdgesChange={onEdgesChange}
                // onConnect={onConnect}
                nodeTypes={nodeTypes}
                connectionLineType={ConnectionLineType.SmoothStep}
                fitView
            >
                <Background />
            </ReactFlow>
        </div>
    );
};

export default MainScreen;
