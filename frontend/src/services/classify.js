export function classifyAirQuality(value) {
  if (value < 300) return { label: 'GOOD', color: '#34d399' };
  if (value < 500) return { label: 'MODERATE', color: '#fbbf24' };
  return { label: 'POOR', color: '#f87171' };
}

export function classifyTemperature(value) {
  if (value < 18) return { label: 'COLD', color: '#60a5fa' };
  if (value < 26) return { label: 'NORMAL', color: '#34d399' };
  if (value < 30) return { label: 'WARM', color: '#fbbf24' };
  return { label: 'HOT', color: '#f87171' };
}

export function classifyHumidity(value) {
  if (value < 30) return { label: 'DRY', color: '#fbbf24' };
  if (value < 60) return { label: 'NORMAL', color: '#34d399' };
  return { label: 'HUMID', color: '#60a5fa' };
}