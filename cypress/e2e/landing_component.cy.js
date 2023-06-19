describe('Landing Page', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should display Sign Up and Sign In buttons when user is not logged in', () => {
        cy.contains('Sign Up').should('be.visible');
        cy.contains('Sign In').should('be.visible');
    });

    it('should display Logout button and correct navigation links when user is logged in as a merchant', () => {
        cy.request({
            method: 'POST',
            url: '/users/sign_in',
            body: {
                user: {
                    email: 'merchant@gmail.com',
                    password: '123456789',
                },
            },
        }).then((response) => {
            const merchantToken = response.headers.authorization;

            cy.window().then((window) => {
                window.localStorage.setItem('token', merchantToken);
            });
            cy.visit('/');


            cy.contains('Logout').should('be.visible');
            cy.contains('Transactions').should('be.visible');
            cy.contains('Merchants').should('not.exist');
        });
    });

    it('should display Logout button and correct navigation links when user is logged in as an admin', () => {
        cy.request({
            method: 'POST',
            url: '/users/sign_in',
            body: {
                user: {
                    email: 'admin@gmail.com',
                    password: '123456789',
                },
            },
        }).then((response) => {
            const adminToken = response.headers.authorization;

            cy.window().then((window) => {
                window.localStorage.setItem('token', adminToken);
            });
            cy.visit('/');

            cy.contains('Logout').should('be.visible');
            cy.contains('Transactions').should('not.exist');
            cy.contains('Merchants').should('be.visible');
        });
    });

    it('should log out the user when Logout button is clicked', () => {
        cy.request({
            method: 'POST',
            url: '/users/sign_in',
            body: {
                user: {
                    email: 'admin@gmail.com',
                    password: '123456789',
                },
            },
        }).then((response) => {
            const token = response.headers.authorization;

            cy.window().then((window) => {
                window.localStorage.setItem('token', token);
            });
            cy.visit('/');
            cy.contains('Logout').click();
            cy.contains('Sign Up').should('be.visible');
            cy.contains('Sign In').should('be.visible');
            cy.contains('Logout').should('not.exist');
        });
    });
});
