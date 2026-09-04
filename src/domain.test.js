import test from 'node:test';
import assert from 'node:assert/strict';
import { addDays, completeRoutine, getNextDue, statusFor } from './domain.js';

test('fixed weekday recurrence chooses the next matching weekday', () => {
  const routine = { recurrenceType: 'fixed', frequency: 'weekly', weekdays: [6], active: true, lastCompleted: '2026-09-04' };
  assert.equal(getNextDue(routine), '2026-09-05');
});

test('completion-based recurrence is anchored to completion date', () => {
  const routine = { recurrenceType: 'completion', intervalDays: 10, active: true, lastCompleted: '2026-09-01' };
  assert.equal(getNextDue(routine), '2026-09-11');
  assert.equal(completeRoutine(routine, '2026-09-04').nextDue, '2026-09-14');
});

test('status and date helpers identify overdue work', () => {
  assert.equal(addDays('2026-09-04', 3), '2026-09-07');
  assert.equal(statusFor({ active: true, nextDue: '2026-09-03' }, '2026-09-04'), 'overdue');
});
