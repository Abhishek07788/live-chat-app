export function convertTo12HourFormat(time24: string) {
  // Splitting the time string into hours and minutes
  const [hours, minutes] = time24.split(":").map(Number);

  // Determining if it's AM or PM
  const period = hours >= 12 ? "pm" : "am";

  // Converting hours to 12-hour format
  const hours12 = hours % 12 || 12;

  // Formatting minutes to always have 2 digits
  const formattedMinutes = (minutes < 10 ? "0" : "") + minutes;

  // Constructing the string in 12-hour format
  return `${hours12}:${formattedMinutes} ${period}`;
}
