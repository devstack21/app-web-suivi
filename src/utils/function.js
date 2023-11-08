export const formatDateToYYYYMMDD = (today = new Date()) => {
  // Get year, month, and day
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is zero-based
  const day = String(today.getDate()).padStart(2, '0');

  // Format the date
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}

// Function to get the start date of the current week
export function getStartOfWeek() {
  const now = new Date();
  const dayOfWeek = now.getDay(); // Sunday is 0, Monday is 1, ..., Saturday is 6
  const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust when Sunday
  return new Date(now.setDate(diff));
}

