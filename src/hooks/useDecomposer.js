import { useState } from "react";
import { topoSort } from "../lib/toposort";
import { DecomposePrompt } from "../lib/prompt";
import { callOpenRouter } from "../lib/llm";

export function useDecomposer() {
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("idle"); // idle, loading, done, error

  async function decompose(requirement) {
    setStatus("loading");
    setTasks([]);

    try {
      // Call the LLM to decompose the requirement into tasks.
      const res = await callOpenRouter(DecomposePrompt(requirement));

      // Parse the response into a JSON object.
      const text = res.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(text);

      // Sort the tasks by dependencies.
      const order = topoSort(parsed.tasks);
      const ranked = order.map((id, i) => ({
        ...parsed.tasks.find(t => t.id === id),
        step: i + 1,
      }));

      // Set the tasks and status.
      setTasks(ranked);
      setStatus("done");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return { tasks, status, decompose };
}