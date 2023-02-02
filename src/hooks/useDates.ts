const today = new Date();
const oneYearAgo = (() => {
  let date = new Date();
  date.setFullYear(date.getFullYear() - 1);
  return date;
})();

export function useDates() {
  const dates = [];

  for (let date = new Date(oneYearAgo); date <= today; date.setDate(date.getDate() + 1)) {
    dates.push(new Date(date));
  }

  return dates.map(date => date.toLocaleDateString("en-US"));
}