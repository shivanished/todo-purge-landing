import { CodeFile, LinearTicket } from './types';

export const CLI_INSTALL_CMD = 'npm i -g todo-purge';

export const DEMO_CODE_FILE: CodeFile = {
  name: 'src/controllers/dispenser.ts',
  language: 'typescript',
  todoLine: 14,
  content: `import { db } from '../db';
import { hardware } from '../drivers';

export async function dispenseCoffee(userId: string, selection: CoffeeType) {
  const user = await db.users.get(userId);
  
  if (user.credits < selection.price) {
    throw new Error("Insufficient credits");
  }


  // If the user mashes the button, we might deduct credits once
  // but dispense multiple drinks because the hardware await
  // doesn't block the second request fast enough.
  // Need to implement a distributed lock or optimistic concurrency control.
  
  await user.deductCredits(selection.price);
  await hardware.dispense(selection);
  
  await db.analytics.logDispense({
    userId,
    sku: selection.sku,
    timestamp: Date.now()
  });
}`
};

export const INITIAL_TICKET: LinearTicket = {
  id: 'REA-392',
  title: 'Fix race condition in coffee dispensing logic',
  description: 'The current implementation of `dispenseCoffee` contains a race condition where a user can trigger multiple dispense operations for a single credit deduction by sending concurrent requests (e.g., button mashing). \n\nThe hardware dispense operation is awaited after credit deduction, but there is no locking mechanism preventing a second request from passing the credit check before the first deduction completes.\n\n**Suggested Fix**\nImplement a Redis-based mutex lock on the `userId` key during the transaction, or switch to an atomic `decrement` operation in the database that returns the new balance.',
  status: 'Todo',
  priority: 'High',
  assignee: 'You',
  team: 'Really Good Coffee',
  labels: ['Bug', 'Security', 'Hardware'],
  project: 'Q2 Stability',
  codeContext: {
    file: 'src/controllers/dispenser.ts',
    line: 15,
    snippet: `export async function dispenseCoffee(userId: string, selection: CoffeeType) {
  const user = await db.users.get(userId);
  
  if (user.credits < selection.price) {
    throw new Error("Insufficient credits");
  }

  await user.deductCredits(selection.price);
  await hardware.dispense(selection);
  
  await db.analytics.logDispense({
    userId,
    sku: selection.sku,
    timestamp: Date.now()
  });
}`
  }
};