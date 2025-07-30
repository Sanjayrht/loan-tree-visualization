import {
    Background,
    ReactFlow,
    ConnectionLineType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { useNode } from '../../Context/TreeContext';



const MainScreen = () => {
    const { nodeTypes, nodes, edges } = useNode()

    return (
        <div className='min-h-[80vh] w-full border-2 m-4 rounded-2xl border-[var(--primary)]'>
            <ReactFlow
                nodes={nodes}
                edges={edges}
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
