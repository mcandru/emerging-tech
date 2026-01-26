// Todo list data - note the specific property names
const todoItems = [
  {
    taskDescription: "Buy groceries",
    isCompleted: false,
    priorityLevel: "high",
  },
  {
    taskDescription: "Call dentist",
    isCompleted: true,
    priorityLevel: "medium",
  },
  {
    taskDescription: "Finish report",
    isCompleted: false,
    priorityLevel: "high",
  },
  { taskDescription: "Water plants", isCompleted: false, priorityLevel: "low" },
  {
    taskDescription: "Reply to emails",
    isCompleted: true,
    priorityLevel: "high",
  },
];

// TODO: Implement getIncomplete()
// Returns an array of todos where isCompleted is false

// TODO: Implement getHighPriority()
// Returns an array of todos where priorityLevel is "high"

// Test the functions
console.log("Incomplete tasks:", getIncomplete());
console.log("High priority tasks:", getHighPriority());
