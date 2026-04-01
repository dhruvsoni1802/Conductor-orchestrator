import { useState } from "react";

export function useQueue(tasks) {
  const [queue, setQueue] = useState([]);

  function initQueue() {
    const initial = tasks.map(task => ({ ...task, queueStatus: "queued" }));
    setQueue(initial);
    runQueue(initial);
  }

  function getReadyTasks(currentQueue) {
    const done = new Set(
      currentQueue
        .filter(t => t.queueStatus === "done")
        .map(t => t.id)
    );

    return currentQueue.filter(
      t =>
        t.queueStatus === "queued" &&
        t.dependencies.every(dep => done.has(dep))
    );
  }

  function updateTaskStatus(currentQueue, taskId, status) {
    return currentQueue.map(t =>
      t.id === taskId ? { ...t, queueStatus: status } : t
    );
  }

  async function runQueue(currentQueue) {
    let q = currentQueue;

    while (true) {
      const ready = getReadyTasks(q);
      if (ready.length === 0) break;

      for (const task of ready) {
        q = updateTaskStatus(q, task.id, "in-progress");
        setQueue([...q]);

        await delay(1500);

        q = updateTaskStatus(q, task.id, "done");
        setQueue([...q]);
      }
    }
  }

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  return { queue, initQueue };
}