import { ReactFlow, Background, Controls } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { buildGraph } from "../lib/buildgraph";
import "./TaskGraph.css";

export default function TaskGraph({ tasks }) {
  const { nodes, edges } = buildGraph(tasks);

  return (
    <div className="graph-wrapper">
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}