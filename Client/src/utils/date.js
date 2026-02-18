export const isoToday = () => new Date().toISOString().slice(0, 10);

export const formatDate = (d) =>
  new Date(d).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
