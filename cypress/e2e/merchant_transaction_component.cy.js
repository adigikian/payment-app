describe('MerchantTransactions Component', () => {
    beforeEach(() => {
        // Log in as a merchant and navigate to the landing page
        cy.request({
            method: 'POST',
            url: '/users/sign_in',
            body: {
                user: {
                    email: 'merchant@gmail.com',
                    password: '123456789'
                }
            },
        }).then((response) => {
            const token = response.headers.authorization;
            cy.window().then((window) => {
                window.localStorage.setItem('token', token);
            });
        });
        cy.visit('/');
    });

    it('should display transaction list and create transaction button', () => {
        // Click on the "Transactions" link in the Landing page
        cy.contains('Transactions').click();

        // Verify the transaction list and create transaction button
        cy.contains('Transaction List').should('be.visible');
        cy.contains('Create Transaction').should('be.visible');
    });

    it('should create a new transaction', () => {
        // Navigate to the merchant transactions page

        // Click on the create transaction button
        cy.contains('Create Transaction').click();

        // Fill in the transaction form
        cy.get('input[name="amount"]').type('100');
        cy.get('select[name="type"]').select('AuthorizeTransaction');
        cy.get('input[name="description"]').type('Test transaction');
        cy.get('button[type="submit"]').click();

        // Verify the created transaction appears in the list
        cy.contains('Authorize Transactions').should('be.visible');
        cy.contains('Test transaction').should('be.visible');
    });

    it('should edit a transaction', () => {
        // Navigate to the merchant transactions page

        // Click on the Edit button of a transaction
        cy.contains('Edit').first().click();

        // Update the transaction form
        cy.get('input[name="description"]').clear().type('Updated transaction');
        cy.get('button[type="submit"]').click();

        // Verify the updated transaction appears in the list
        cy.contains('Authorize Transactions').should('be.visible');
        cy.contains('Updated transaction').should('be.visible');
    });
});
