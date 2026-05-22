const millisecondsPerDay = 1000 * 60 * 60 * 24;

export function calculateRentalDays(startDate: string, endDate: string): number {
  if (!startDate || !endDate) {
    return 0;
  }

  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);
  const diff = end.getTime() - start.getTime();

  if (Number.isNaN(diff) || diff < 0) {
    return 0;
  }

  return Math.max(1, Math.floor(diff / millisecondsPerDay) + 1);
}

export function calculateRentalSubtotal(pricePerDay: number, rentalDays: number): number {
  return pricePerDay * rentalDays;
}

export function calculatePlatformFee(rentalSubtotal: number): number {
  return Math.round(rentalSubtotal * 0.08);
}

export function calculateEstimatedTotal(rentalSubtotal: number, depositAmount: number): number {
  return rentalSubtotal + calculatePlatformFee(rentalSubtotal) + depositAmount;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
