import { addDays, dateKey, getNextDue } from './domain.js';

const photos = {
  kitchen: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85',
  bathroom: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=85',
  bedroom: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=85',
  living: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85',
  laundry: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=900&q=85',
  supplies: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=1200&q=85',
};

export function seedState() {
  const today = dateKey();
  const rooms = [
    { id: 'kitchen', name: 'Kitchen', kind: 'Kitchen', photo: photos.kitchen, note: 'Keep the counters clear so dinner feels easy.', accent: 'clay' },
    { id: 'bathroom', name: 'Bathroom', kind: 'Bathroom', photo: photos.bathroom, note: 'Shower liner needs replacing soon.', accent: 'olive' },
    { id: 'bedroom', name: 'Bedroom', kind: 'Bedroom', photo: photos.bedroom, note: 'Fresh sheets make the whole room feel new.', accent: 'sand' },
    { id: 'living', name: 'Living room', kind: 'Living room', photo: photos.living, note: 'Dust gathers fastest around the media console.', accent: 'clay' },
    { id: 'laundry', name: 'Laundry', kind: 'Laundry', photo: photos.laundry, note: 'Lint filter is on the monthly rhythm.', accent: 'olive' },
  ];
  const routines = [
    { id: 'r1', roomId: 'kitchen', title: 'Wipe kitchen counters', frequency: 'daily', recurrenceType: 'fixed', weekdays: [], lastCompleted: addDays(today, -1), estimatedMinutes: 8, note: 'Clear appliances first.', active: true },
    { id: 'r2', roomId: 'kitchen', title: 'Clean the sink', frequency: 'weekly', recurrenceType: 'fixed', weekdays: [5], lastCompleted: addDays(today, -7), estimatedMinutes: 7, note: 'Use the soft scrub.', active: true },
    { id: 'r3', roomId: 'kitchen', title: 'Sweep kitchen floor', frequency: 'weekly', recurrenceType: 'fixed', weekdays: [5], lastCompleted: addDays(today, -7), estimatedMinutes: 10, note: 'Get under the table.', active: true },
    { id: 'r4', roomId: 'bathroom', title: 'Deep clean bathroom', frequency: 'weekly', recurrenceType: 'fixed', weekdays: [6], lastCompleted: addDays(today, -9), estimatedMinutes: 25, note: 'Sink, toilet, shower, floor.', active: true },
    { id: 'r5', roomId: 'bedroom', title: 'Change sheets', frequency: 'weekly', recurrenceType: 'fixed', weekdays: [0], lastCompleted: addDays(today, -5), estimatedMinutes: 15, note: '', active: true },
    { id: 'r6', roomId: 'living', title: 'Dust living room', frequency: 'weekly', recurrenceType: 'fixed', weekdays: [2], lastCompleted: addDays(today, -6), estimatedMinutes: 18, note: 'Bookshelves and media console.', active: true },
    { id: 'r7', roomId: 'laundry', title: 'Clean washing machine', frequency: 'completion', recurrenceType: 'completion', intervalDays: 30, weekdays: [], lastCompleted: addDays(today, -22), estimatedMinutes: 12, note: 'Wipe gasket and detergent drawer.', active: true },
  ].map((routine) => ({ ...routine, nextDue: getNextDue(routine) }));
  return {
    version: 1,
    onboardingComplete: true,
    user: { name: 'Dustin' },
    rooms,
    routines,
    completions: [
      { id: 'c1', routineId: 'r1', roomId: 'kitchen', completedAt: addDays(today, -1), source: 'routine' },
      { id: 'c2', routineId: 'r5', roomId: 'bedroom', completedAt: addDays(today, -5), source: 'routine' },
      { id: 'c3', routineId: 'r6', roomId: 'living', completedAt: addDays(today, -6), source: 'routine' },
    ],
    resets: [{ id: 'reset-1', roomId: 'kitchen', startedAt: addDays(today, -1), completedAt: addDays(today, -1), durationMinutes: 24, routineIds: ['r1', 'r2', 'r3'] }],
    supplies: [
      { id: 's1', name: 'All-purpose cleaner', category: 'Cleaners', quantity: 1, unit: 'bottle', threshold: 1, storage: 'Under kitchen sink', roomIds: ['kitchen', 'living'] },
      { id: 's2', name: 'Glass cleaner', category: 'Cleaners', quantity: 0, unit: 'bottle', threshold: 1, storage: 'Laundry shelf', roomIds: ['bathroom', 'living'] },
      { id: 's3', name: 'Dish soap', category: 'Consumables', quantity: 1, unit: 'bottle', threshold: 1, storage: 'Kitchen sink', roomIds: ['kitchen'] },
      { id: 's4', name: 'Microfiber cloths', category: 'Consumables', quantity: 3, unit: 'cloths', threshold: 2, storage: 'Linen closet', roomIds: ['kitchen', 'bathroom', 'living'] },
      { id: 's5', name: 'Scrub sponges', category: 'Consumables', quantity: 1, unit: 'sponge', threshold: 2, storage: 'Kitchen sink', roomIds: ['kitchen'] },
      { id: 's6', name: 'Vacuum', category: 'Tools', quantity: 1, unit: 'tool', threshold: 0, storage: 'Hall closet', roomIds: ['bedroom', 'living'] },
      { id: 's7', name: 'Toilet cleaner', category: 'Cleaners', quantity: 2, unit: 'bottle', threshold: 1, storage: 'Bathroom cabinet', roomIds: ['bathroom'] },
    ],
    shoppingItems: [{ id: 'shop-1', supplyId: 's2', name: 'Glass cleaner', quantity: 1, complete: false }],
    notes: [{ id: 'n1', roomId: 'bathroom', text: 'Need to replace the shower liner.', createdAt: today }],
  };
}

