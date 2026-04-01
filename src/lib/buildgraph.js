export function buildGraph(tasks) {

  // Build the nodes for the graph.
  const nodes = tasks.map((task, i) => ({
    id: task.id,
    position: { x: i * 200, y: task.dependencies.length === 0 ? 0 : 200 * task.dependencies.length },
    data: { label: `${task.id}: ${task.name}` },
  }));

  // Build the edges for the graph. The edges are the dependencies between the tasks.
  const edges = tasks.flatMap(task =>
    task.dependencies.map(dep => ({
      id: `${dep}-${task.id}`,
      source: dep,
      target: task.id,
      animated: true,
    }))
  );

  return { nodes, edges };
}