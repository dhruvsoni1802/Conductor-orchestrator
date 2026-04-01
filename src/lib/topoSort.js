// Topological sort ensures that all the dependent tasks are executed before the task itself.
export function topoSort(tasks) {
  const idToTask = {};
  tasks.forEach(t => (idToTask[t.id] = t));

  const visited = new Set();
  const result = [];

  function visit(id) {
    if (visited.has(id)) return;
    visited.add(id);
    const task = idToTask[id];

    // If the task has dependencies, visit them first.
    if (task?.dependencies) {
      task.dependencies.forEach(dep => visit(dep));
    }
    result.push(id);
  }

  // Visit all the tasks.
  tasks.forEach(t => visit(t.id));
  return result;
}
