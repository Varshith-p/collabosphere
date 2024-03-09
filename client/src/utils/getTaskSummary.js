function getTasksSummary(projects, assignee) {
  let total = 0;
  let completed = 0;

  // Iterate through each project
  projects.forEach((project) => {
    // Iterate through tasks in each project
    project.tasks.forEach((task) => {
      if (task.assignee === assignee) {
        total++;
        if (task.status === "Done") {
          completed++;
        }
      }
    });
  });

  const pending = total - completed;

  return {
    total: total,
    completed: completed,
    pending: pending,
  };
}

export default getTasksSummary;
