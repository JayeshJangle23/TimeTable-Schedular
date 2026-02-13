exports.generateMorningEmail = (userName, day, tasks) => {
  if (!tasks || tasks.length === 0) {
    return `
Good morning ${userName} 🌅

You have no scheduled tasks for ${day}.
Take some rest or plan something productive 💪
`;
  }

  let taskList = tasks
    .map(
      (t, index) => `${index + 1}. ${t.title} (${t.startTime} - ${t.endTime})`,
    )
    .join("\n");

  return `
Good morning ${userName} 🌞

Here is your schedule for ${day}:

${taskList}

Stay consistent. Small steps every day lead to big success 🚀
`;
};
