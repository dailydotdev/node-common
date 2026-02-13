import { setTimeout } from 'node:timers/promises';

/**
 * Pauses execution for a specified duration.
 * @param delay - The number of milliseconds to sleep.
 * @returns A promise that resolves after the specified delay.
 */
export const sleep = async (delay: number) => await setTimeout(delay);
