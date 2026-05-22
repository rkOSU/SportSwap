export function validateDateRange(startDate: string, endDate: string): string | null {
  if (!startDate) {
    return "Start date is required.";
  }

  if (!endDate) {
    return "End date is required.";
  }

  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return "Enter valid rental dates.";
  }

  if (end < start) {
    return "End date cannot be before start date.";
  }

  return null;
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
