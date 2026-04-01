export const DecomposePrompt = (requirement) => `You are a software task decomposer for a multi-agent coding system.

Break the following feature requirement into independent coding tasks that can be assigned to parallel agents.

Rules:
- Each task must be a concrete coding unit (e.g. "Create User model", "Build login API endpoint")
- Identify real dependencies between tasks (task B depends on task A if B needs A's code to exist first)
- Keep tasks small and focused
- Return ONLY valid JSON, no markdown, no explanation

Return this exact JSON structure:
{
  "tasks": [
    {
      "id": "T1",
      "name": "short task name",
      "description": "what this task implements",
      "dependencies": [],
      "files": ["list of files likely touched"],
      "prompt": "the exact prompt to give a Claude Code agent for this task"
    }
  ]
}

Feature requirement: ${requirement}`;