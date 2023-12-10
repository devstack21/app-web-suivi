export const formatDateToYYYYMMDD = (today = new Date()) => {
  // Get year, month, and day
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is zero-based
  const day = String(today.getDate()).padStart(2, '0');

  // Format the date
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}

export function formatDate(inputDate) {
  // Parse the input date as a Date object
  const dateObj = new Date(inputDate);

  // Extract year, month, and day
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(dateObj.getDate()).padStart(2, '0');

  // Create the formatted date string
  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
}



// Function to get the start date of the current week
export function getStartOfWeek() {
  const now = new Date();
  const dayOfWeek = now.getDay(); // Sunday is 0, Monday is 1, ..., Saturday is 6
  const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust when Sunday
  return new Date(now.setDate(diff));
}

export function formatDateTime(originalDateString) {
  const originalDate = new Date(originalDateString);

  const day = originalDate.getDate().toString().padStart(2, '0');
  const month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
  const year = originalDate.getFullYear();

  const hours = originalDate.getHours().toString().padStart(2, '0');
  const minutes = originalDate.getMinutes().toString().padStart(2, '0');

  const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}`;

  return formattedDateTime;
}

export function getEndOfWeek() {
  const today = new Date();
  const endOfWeek = new Date(today);

  // Calculate the difference in days between today and the end of the week (Sunday)
  const diff = 7 - today.getDay();

  // Set the date to the end of the week
  endOfWeek.setDate(today.getDate() + diff);

  // Adjust hours, minutes, seconds, and milliseconds to the last moment of the day
  endOfWeek.setHours(23, 59, 59, 999);

  return endOfWeek;
}


export function formatDateRange(dateRange) {
  const startDate = new Date(dateRange.debut);
  const endDate = new Date(dateRange.fin);

  // Format day and month with leading zeros
  const formattedStartDate = startDate.getDate().toString().padStart(2, '0');
  const formattedEndDate = (endDate.getDate()).toString().padStart(2, '0');

  // Format the complete date range string
  const formattedString = `${formattedStartDate} - ${formattedEndDate}/${endDate.getMonth() + 1}/${endDate.getFullYear()}`;

  return formattedString;
}

