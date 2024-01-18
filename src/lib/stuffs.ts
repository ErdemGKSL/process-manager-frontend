export function formatDuration(ms: number, formatting: any) {
  if (isNaN(parseInt(ms as any))) ms = 0;
  if (!formatting) formatting = {
    years: ["year", "years"],
    months: ["month", "months"],
    weeks: ["week", "weeks"],
    days: ["day", "days"],
    hours: ["hour", "hours"],
    minutes: ["minute", "minutes"],
    seconds: ["second", "seconds"]
  };
  const years = Math.floor(ms / 31536000000);
  const months = Math.floor((ms % 31536000000) / 2628000000);
  const weeks = Math.floor((ms % 2628000000) / 604800000);
  const days = Math.floor((ms % 604800000) / 86400000);
  const hours = Math.floor((ms % 86400000) / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const durationArr = [
    years,
    months,
    weeks,
    days,
    hours,
    minutes,
    seconds
  ];
  const formattingArr = [
    formatting.years,
    formatting.months,
    formatting.weeks,
    formatting.days,
    formatting.hours,
    formatting.minutes,
    formatting.seconds
  ];
  let result = durationArr.map((dur, i) => {
    const format = formattingArr[i];
    return dur > 0 ? `${dur} ${dur === 1 ? format[0] : (format[1] ?? format[0])}` : null;
  }).filter(Boolean).join(", ");
  return result;
}