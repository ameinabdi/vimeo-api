import models from './models';

let cached = models();

/**
 * Initializes the connection to the Database
 */
export function databaseInit() {
  return cached;
}
