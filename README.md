# 🌳 Loan Tree Visualization

A visual tool to represent a hierarchical structure of **Accounts**, **Loans**, and **Collaterals** using [React Flow](https://reactflow.dev/). This project helps visualize complex financial relationships in an interactive, editable tree structure.

---

## 📦 1. Data Model — Tree Structure

The core structure is an object with two arrays: `nodes` and `edges`.

### 🔹 Node Array
Each node object follows this structure:

```js
{
  id: string, // Unique identifier for each node
  type: 'account' | 'loan' | 'collateral', // Determines the node component
  position: { x: number, y: number }, // Auto-calculated via Dagre layout
  data: {
    id: string,       // Same as node ID
    name?: string,    // For Account nodes
    address?: string, // For Account nodes
    amount?: string,  // For Loan nodes
    item?: string,    // For Collateral nodes
    user?: string,    // Associated parent user
    type: 'account' | 'loan' | 'collateral',
    isChild?: boolean // Indicates child node (used for edge linking, only for Loan)
  }
}
```

### 🔹 Edge Array
Each edge object follows this structure:

```js
{
  id: string,       // Format: `${sourceId}-${targetId}`
  source: string,   // Parent node ID
  target: string,   // Child node ID
  type: 'smoothstep', // React Flow edge type
  animated: true    // Animation for better user experience
}
```

### 🧩 Example Representation:

```
Nodes: [Account A1, Loan L1, Collateral C1]
Edges: [A1 → L1, A1 → C1]
```

---

## 🧱 2. Node Types — Definition & Rendering

Node types are mapped using a `nodeTypes` object:

```js
const nodeTypes = {
  account: Account,       // Component to render Account node
  loan: Loan,             // Component to render Loan node
  collateral: Collateral  // Component to render Collateral node
};
```

React Flow uses this mapping internally to render the correct component based on the `type` property of each node:

```jsx
<ReactFlow
  nodes={nodes}
  edges={edges}
  nodeTypes={nodeTypes}
/>
```

This modular structure makes it easy to add more node types in the future.

---

## 🧩 3. UX Decisions — Side Panel, Add/Delete Flow

### 🔸 Side Panel Behavior:
- Appears when a node is selected.
- Displays node details such as name, address, amount, or item depending on the node type.
- Provides inline editable fields to update node data.
- Shows relevant **"Add Child Node"** buttons based on the selected node type.

### 🔸 Node Addition:
- Child node options are conditionally rendered:
  - You can only add `Loan` or `Collateral` to an `Account`.
  - `Loan` nodes cannot have any child nodes.
- This ensures logical and valid tree structures.

### 🔸 Node Deletion:
- Node deletion is available via the **Side Panel**.
- Deleting a node also deletes all its **child nodes recursively**, maintaining structural integrity.
- Prevents creation of orphaned or disconnected nodes in the tree.

---

## ⚠️ 4. Limitations & Trade-offs

| Limitation                      | Description                                                                 |
|--------------------------------|-----------------------------------------------------------------------------|
| Limited Node Types             | Currently supports only three node types: `Account`, `Loan`, and `Collateral`. |
| Fixed Layout Direction         | Tree is rendered using Dagre in a **left-to-right** (LR) direction. |
