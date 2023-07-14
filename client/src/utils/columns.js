const tasks = [
  {
    id: 1,
    title: "Work it",
    status: "todo",
  },
  {
    id: 2,
    title: "Enchanted",
    status: "inProgress",
  },
  {
    id: 3,
    title: "Wasted",
    status: "done",
  },
  {
    id: 4,
    title: "Hello Boy",
    status: "todo",
  },
  {
    id: 5,
    title: "Idiot",
    status: "done",
  },
];

const getTasksGroupedbyColumns = () => {
  const columns = tasks.reduce((acc, task) => {
    if (!acc.get(task.status)) {
      acc.set(task.status, { id: task.status, tasks: [] });
    }
    acc.get(task.status).tasks.push(task);
    return acc;
  }, new Map());

  const columnTypes = ["todo", "inProgress", "done"];
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

getTasksGroupedbyColumns();

export { getTasksGroupedbyColumns };
