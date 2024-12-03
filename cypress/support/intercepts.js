export const interceptLogin = () => cy.intercept('/users/login');
export const interceptUserAvatar = () => cy.intercept('/users/me/avatar');
