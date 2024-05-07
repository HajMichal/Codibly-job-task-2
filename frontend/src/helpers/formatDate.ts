export function formatDate(dateAsString: string) {
  const inputDate = new Date(dateAsString);
  const day = inputDate.getDate();
  const month = inputDate.getMonth() + 1; // January is 0
  const year = inputDate.getFullYear();

  // Pad single digits with leading zero
  const formattedDay = day < 10 ? "0" + day : day;
  const formattedMonth = month < 10 ? "0" + month : month;

  return `${formattedDay}/${formattedMonth}/${year}`;
}
