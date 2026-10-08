const TZ = 'America/New_York';

// Offset (ms) of the neighborhood's timezone from UTC at a given instant.
function offsetAt(date) {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', {
      timeZone: TZ, hourCycle: 'h23',
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    }).formatToParts(date).map((x) => [x.type, x.value])
  );
  const asUtc = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
  return asUtc - Math.floor(date.getTime() / 1000) * 1000;
}

// "2026-11-14" + "09:30" (Eastern wall clock) -> Date
export function easternToDate(dateStr, timeStr = '00:00') {
  const [y, mo, d] = dateStr.split('-').map(Number);
  const [h, mi] = timeStr.split(':').map(Number);
  const guess = new Date(Date.UTC(y, mo - 1, d, h, mi));
  return new Date(guess.getTime() - offsetAt(new Date(guess.getTime() - offsetAt(guess))));
}

// Midnight Eastern at the end of the event's day: when the event disappears.
export function endOfEasternDay(dateStr) {
  const [y, mo, d] = dateStr.split('-').map(Number);
  const next = new Date(Date.UTC(y, mo - 1, d + 1)).toISOString().slice(0, 10);
  return easternToDate(next, '00:00');
}
