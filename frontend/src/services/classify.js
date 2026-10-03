export function classifyAirQuality(value) {
  if (value < 300) return { label: 'GOOD', color: '#10b981' };
  if (value < 500) return { label: 'MODERATE', color: '#f59e0b' };
  return { label: 'POOR', color: '#ef4444' };
}

export function classifyTemperature(value) {
  if (value < 18) return { label: 'COLD', color: '#3b82f6' };
  if (value < 26) return { label: 'NORMAL', color: '#10b981' };
  if (value < 30) return { label: 'WARM', color: '#f59e0b' };
  return { label: 'HOT', color: '#ef4444' };
}

export function classifyHumidity(value) {
  if (value < 30) return { label: 'DRY', color: '#f59e0b' };
  if (value < 60) return { label: 'NORMAL', color: '#10b981' };
  return { label: 'HUMID', color: '#3b82f6' };
}