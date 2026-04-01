import { useState } from "react";
import { useDecomposer } from "./hooks/useDecomposer";
import TaskCard from "./components/TaskCard";
import "./App.css";

export default function App() {
  const [requirement, setRequirement] = useState("");
  const { tasks, status, decompose } = useDecomposer();

  function handleSubmit() {
    if (requirement.trim()) decompose(requirement);
  }

  return (
    <div className="app">
      <h1 className="title">Conductor Orchestrator</h1>
      <p className="subtitle">Describe a feature and we'll break it into parallel agent tasks</p>

      <textarea
        className="textarea"
        placeholder="e.g. Build a user authentication system with signup, login and password reset"
        value={requirement}
        onChange={e => setRequirement(e.target.value)}
      />

      <div className="row">
        <button
          className="button"
          onClick={handleSubmit}
          disabled={status === "loading"}
        >
          {status === "loading" ? "Decomposing..." : "Decompose"}
        </button>
        {status === "done" && (
          <span className="status">{tasks.length} tasks · sorted by dependency</span>
        )}
        {status === "error" && (
          <span className="status">Something went wrong, try again</span>
        )}
      </div>

      {tasks.length > 0 && (
        <>
          <p className="section-label">Tasks in execution order</p>
          <div className="task-list">
            {tasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}