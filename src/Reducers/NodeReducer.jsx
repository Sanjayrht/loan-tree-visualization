export const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_NODE":
            return {
                ...state,
                nodes: [...state.nodes, action.payload]
            }

        case "ADD_EDGE":
            return {
                ...state,
                edges: [...state.edges, action.payload]
            }
        case "UPDATE_NODE":
            return {
                ...state,
                nodes: state.nodes.map((curElem) => {
                    if (curElem.id === action.payload.id) {
                        return {
                            ...curElem,
                            data: action.payload
                        }
                    } else {
                        return curElem
                    }
                })
            }

        case "DELETE_NODE":
            const nodeIdToDelete = action.payload;

            const getAllDescendants = (id, edges, acc = new Set()) => {
                edges.forEach(edge => {
                    if (edge.source === id && !acc.has(edge.target)) {
                        acc.add(edge.target);
                        getAllDescendants(edge.target, edges, acc);
                    }
                });
                return acc;
            };

            const allDescendants = getAllDescendants(nodeIdToDelete, state.edges);
            const nodesToDelete = new Set([nodeIdToDelete, ...allDescendants]);

            return {
                ...state,
                nodes: state.nodes.filter(node => !nodesToDelete.has(node.id)),
                edges: state.edges.filter(
                    edge => !nodesToDelete.has(edge.source) && !nodesToDelete.has(edge.target)
                ),
            };

        default:
            return state
    }
}