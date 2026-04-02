
# Conductor Orchestrator

A proof of concept that sits above Conductor's multi-agent system.

Describe a feature requirement in plain English. The orchestrator breaks it into independent coding tasks, resolves dependencies using topological sort, visualizes the task graph, and simulates dispatching each task to a Conductor workspace in the correct order.

## How it works

1. **Decompose** — An LLM breaks your requirement into concrete coding tasks, each with a name, description, dependencies, files touched, and a ready-to-use agent prompt
2. **Sort** — Tasks are ordered using topological sort (Kahn's algorithm) so no task runs before its dependencies are complete
3. **Visualize** — A DAG shows the relationships between tasks at a glance
4. **Run** — The queue simulation dispatches tasks in order, a task only starts when all its dependencies are done

## Stack

- React + Vite
- OpenRouter (LLM provider)
- React Flow (DAG visualization)
