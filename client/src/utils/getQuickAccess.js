function getQuickAccess(projects, assigneeId) {
  let tasks = [];

  projects.forEach((project) => {
    const projectTasks = project.tasks
      .filter((task) => task.assignee === assigneeId)
      .map((task) => ({
        ...task,
        projectName: project.name,
        addedBy: project.participants.find(
          (participant) => participant.id === task.addedBy
        ),
      }));

    tasks = tasks.concat(projectTasks);
  });

  tasks.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  return tasks;
}

export default getQuickAccess;
