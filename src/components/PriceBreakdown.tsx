import {
  calculateEstimatedTotal,
  calculatePlatformFee,
  calculateRentalSubtotal,
  formatCurrency,
} from "../utils/pricing";

type PriceBreakdownProps = {
  pricePerDay: number;
  depositAmount: number;
  rentalDays: number;
};

export function PriceBreakdown({ pricePerDay, depositAmount, rentalDays }: PriceBreakdownProps) {
  const rentalSubtotal = calculateRentalSubtotal(pricePerDay, rentalDays);
  const platformFee = calculatePlatformFee(rentalSubtotal);
  const estimatedTotal = calculateEstimatedTotal(rentalSubtotal, depositAmount);

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-card">
      <h3 className="text-base font-bold text-slate-950">Price breakdown</h3>
      <div className="mt-4 space-y-3 text-sm">
        <div className="flex justify-between gap-4">
          <span className="text-slate-600">Daily rate</span>
          <span className="font-semibold text-slate-950">{formatCurrency(pricePerDay)}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-slate-600">Number of days selected</span>
          <span className="font-semibold text-slate-950">{rentalDays || 0}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-slate-600">Rental subtotal</span>
          <span className="font-semibold text-slate-950">{formatCurrency(rentalSubtotal)}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-slate-600">Platform fee placeholder</span>
          <span className="font-semibold text-slate-950">{formatCurrency(platformFee)}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-slate-600">Refundable deposit</span>
          <span className="font-semibold text-slate-950">{formatCurrency(depositAmount)}</span>
        </div>
      </div>
      <div className="mt-5 border-t border-slate-200 pt-4">
        <div className="flex justify-between gap-4">
          <span className="font-bold text-slate-950">Estimated total due today</span>
          <span className="text-lg font-black text-forest-700">
            {formatCurrency(estimatedTotal)}
          </span>
        </div>
        <p className="mt-2 text-xs leading-5 text-slate-500">
          Payment collection is intentionally disabled in this MVP. This estimate shows how checkout
          would be presented once payments are connected.
        </p>
      </div>
    </div>
  );
}
