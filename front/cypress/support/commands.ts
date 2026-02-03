// ***********************************************
// This example namespace declaration will help
// with Intellisense and code completion in your
// IDE or Text Editor.
// ***********************************************
// declare namespace Cypress {
//   interface Chainable<Subject = any> {
//     customCommand(param: any): typeof customCommand;
//   }
// }
//
// function customCommand(param: any): void {
//   console.warn(param);
// }
//
// NOTE: You can use it like so:
// Cypress.Commands.add('customCommand', customCommand);
//
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import { User } from "./types";

Cypress.Commands.add('login', (user: User = {
  id: 1,
  username: 'user1',
  firstName: 'firstname1',
  lastName: 'lastname1',
  email: 'yoga@studio.com',
  admin: false
}, sessions = []) => {
  cy.intercept('POST', 'api/auth/login', { statusCode: 200, body: user }).as('loginUser');

  cy.intercept('GET', '/api/session', sessions).as('getSession');

  cy.visit('/login');
  cy.get('input[formControlName=email]').clear().type('yoga@studio.com');
  cy.get('input[formControlName=password]').clear().type('test!1234');
  cy.get('button[type="submit"]').click();

  cy.wait('@loginUser');
  cy.wait('@getSession');
  cy.url().should('include', '/sessions');
});