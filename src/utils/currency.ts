const vndFormatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  maximumFractionDigits: 0,
});

export function formatCurrency(value?: number | null) {
  if (typeof value !== 'number') {
    return 'N/A';
  }

  return vndFormatter.format(value);
}

export function formatCompactCurrency(value?: number | null) {
  if (typeof value !== 'number') {
    return 'N/A';
  }

  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(2)} Ty VND`;
  }

  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)} Trieu VND`;
  }

  return formatCurrency(value);
}

export const formatVnd = formatCurrency;
export const formatCompactVnd = formatCompactCurrency;
