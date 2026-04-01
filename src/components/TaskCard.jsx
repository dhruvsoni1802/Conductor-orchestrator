import "./TaskCard.css";

export default function TaskCard({ task }) {
  return (
    <div className="card">
      <div className="header">
        <span className="id">{task.id}</span>
        <span className="step">step {task.step}</span>
        <span className="name">{task.name}</span>
        {task.queueStatus && (
          <span className={`queue-status ${task.queueStatus}`}>
            {task.queueStatus}
          </span>
        )}
      </div>

      <p className="description">{task.description}</p>

      <div className="meta">
        <span className="meta-label">deps:</span>
        {task.dependencies.length > 0
          ? task.dependencies.map(dep => (
              <span key={dep} className="badge">{dep}</span>
            ))
          : <span className="none">none</span>
        }
      </div>

      <div className="meta">
        <span className="meta-label">files:</span>
        <span className="meta-value">{task.files.join(", ")}</span>
      </div>

      <pre className="prompt">{task.prompt}</pre>
    </div>
  );
}