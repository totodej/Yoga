/// <reference types="cypress" />

import { User } from './types';

declare global {
  namespace Cypress {
    interface Chainable {
      login(user?: User, sessions?: any[]): Chainable<void>;
    }
  }
}

export {};