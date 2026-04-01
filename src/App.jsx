import { useState } from "react";
import { useDecomposer } from "./hooks/useDecomposer";
import { useQueue } from "./hooks/useQueue";
import TaskCard from "./components/TaskCard";
import TaskGraph from "./components/TaskGraph";
import "./App.css";

export default function App() {
  const [requirement, setRequirement] = useState("");
  const [apiKey, setApiKey] = useState("");
  const { tasks, status, decompose } = useDecomposer();
  const { queue, initQueue } = useQueue(tasks);

  function handleSubmit() {
    if (requirement.trim() && apiKey.trim()) decompose(requirement, apiKey);
  }

  return (
    <div className="app">
      <h1 className="title">Conductor Orchestrator</h1>
      <p className="subtitle">Describe a feature and we'll break it into parallel agent tasks</p>

      <input
        className="input"
        type="password"
        placeholder="OpenRouter API key (sk-or-...)"
        value={apiKey}
        onChange={e => setApiKey(e.target.value)}
        autoComplete="off"
      />

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
          disabled={status === "loading" || !apiKey.trim()}
        >
          {status === "loading" ? "Decomposing..." : "Decompose"}
        </button>

        {status === "done" && (
          <button className="button-secondary" onClick={initQueue}>
            Run Queue
          </button>
        )}

        {status === "done" && (
          <span className="status">{tasks.length} tasks · sorted by dependency</span>
        )}
        {status === "error" && (
          <span className="status">Something went wrong, try again</span>
        )}
      </div>

      {tasks.length > 0 && (
        <>
          <TaskGraph tasks={tasks} />
          <p className="section-label">Tasks in execution order</p>
          <div className="task-list">
            {(queue.length > 0 ? queue : tasks).map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}