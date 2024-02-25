const getTasksGroupedbyColumns = (tasks) => {
  let columns;
  if (tasks) {
    columns = tasks.reduce((acc, task) => {
      if (!acc.get(task.status)) {
        acc.set(task.status, { id: task.status, tasks: [] });
      }
      acc.get(task.status).tasks.push(task);
      return acc;
    }, new Map());
  } else {
    columns = new Map();
  }

  const columnTypes = ["Todo", "In Progress", "Done"];
  for (const columnType of columnTypes) {
    if (!columns.get(columnType)) {
      columns.set(columnType, {
        id: columnType,
        tasks: [],
      });
    }
  }

  const sortedColumns = new Map(
    Array.from(columns.entries()).sort(
      (a, b) => columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
    )
  );

  return sortedColumns;
};

export { getTasksGroupedbyColumns };
