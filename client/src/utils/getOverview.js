function getTasksByMonthStatus(projects, assigneeId) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const tasksByMonth = {};

  months.forEach((monthName) => {
    tasksByMonth[monthName] = 0;
  });

  projects.forEach((project) => {
    project.tasks?.forEach((task) => {
      if (task.status === "Done" && task.assignee === assigneeId) {
        const month = new Date(task.updatedAt).getMonth();
        const monthName = months[month];
        tasksByMonth[monthName]++;
      }
    });
  });

  const resultArray = months.map((monthName) => ({
    name: monthName,
    total: tasksByMonth[monthName],
  }));

  return resultArray;
}

export default getTasksByMonthStatus;
