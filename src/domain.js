export const pad = (n) => String(n).padStart(2, '0');

export function dateKey(date = new Date()) {
  const d = new Date(date);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function addDays(key, amount) {
  const d = new Date(`${key}T12:00:00`);
  d.setDate(d.getDate() + amount);
  return dateKey(d);
}

export function dayName(key, long = false) {
  return new Intl.DateTimeFormat('en-US', { weekday: long ? 'long' : 'short' }).format(new Date(`${key}T12:00:00`));
}

export function prettyDate(key, options = { month: 'short', day: 'numeric' }) {
  return new Intl.DateTimeFormat('en-US', options).format(new Date(`${key}T12:00:00`));
}

export function getNextDue(routine, from = routine.lastCompleted || dateKey()) {
  if (!routine.active) return null;
  if (routine.recurrenceType === 'completion') return addDays(from, Number(routine.intervalDays || 7));
  if (routine.frequency === 'daily') return addDays(from, 1);
  if (routine.frequency === 'monthly') {
    const d = new Date(`${from}T12:00:00`);
    d.setMonth(d.getMonth() + 1);
    return dateKey(d);
  }
  const weekdays = routine.weekdays?.length ? routine.weekdays : [6];
  for (let offset = 1; offset <= 14; offset += 1) {
    const candidate = addDays(from, offset);
    const weekday = new Date(`${candidate}T12:00:00`).getDay();
    if (weekdays.includes(weekday)) return candidate;
  }
  return addDays(from, 7);
}

export function statusFor(routine, today = dateKey()) {
  if (!routine.active) return 'paused';
  if (!routine.nextDue) return 'scheduled';
  if (routine.nextDue < today) return 'overdue';
  if (routine.nextDue === today) return 'today';
  return 'upcoming';
}

export function formatFrequency(routine) {
  if (routine.recurrenceType === 'completion') return `${routine.intervalDays || 7} days after completion`;
  if (routine.frequency === 'daily') return 'Every day';
  if (routine.frequency === 'monthly') return 'Monthly';
  if (routine.weekdays?.length) return `Every ${routine.weekdays.map((d) => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][d]).join(' / ')}`;
  return 'Weekly';
}

export function completeRoutine(routine, completedOn = dateKey()) {
  const completed = { ...routine, lastCompleted: completedOn };
  completed.nextDue = getNextDue(completed, completedOn);
  return completed;
}

export function daysFromNow(key, today = dateKey()) {
  return Math.round((new Date(`${key}T12:00:00`) - new Date(`${today}T12:00:00`)) / 86400000);
}

export function labelDue(key, today = dateKey()) {
  const distance = daysFromNow(key, today);
  if (distance < 0) return `${Math.abs(distance)}d overdue`;
  if (distance === 0) return 'Today';
  if (distance === 1) return 'Tomorrow';
  return prettyDate(key, { month: 'short', day: 'numeric' });
}

