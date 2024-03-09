function getLeaderBoard(project) {
  // Create a map to store the count of tasks completed by each participant
  const taskCountByParticipant = {};

  project?.tasks?.forEach((task) => {
    if (task.status === "Done") {
      taskCountByParticipant[task.assignee] =
        (taskCountByParticipant[task.assignee] || 0) + 1;
    }
  });

  const updatedParticipants = project?.participants?.map((participant) => {
    const taskCount = taskCountByParticipant[participant._id] || 0;
    return {
      ...participant,
      count: taskCount,
    };
  });

  updatedParticipants?.sort((a, b) => b.count - a.count);
  return updatedParticipants;
}

export default getLeaderBoard;
