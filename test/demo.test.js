// This is test file to exemplify the validation of email addressess using jest

// q: What is GitHub Copilot? Tell me in the style of a pirate in a short sentence.
// a: GitHub Copilot be a pirate's first mate, helpin' ye write code faster than a parrot can squawk "pieces of eight!"

// write a function to validate email addresses
// function name is validateEmail and receives a string as an argument
function validateEmail(email) {
  // use a regular expression to check if the email is valid
  // return the result of the test
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// write a test for the validateEmail function
// describe the test suite
describe('validateEmail', () => {
    // write a test for a valid email address
    it('returns true for valid email addresses', () => {
        // define a valid email address
        const email = 'cipriano.sanchez@sap.com'
        // expect the result of the validateEmail function to be true
        expect(validateEmail(email)).toBe(true)  
    })

    // write a test for an invalid email address
    it('returns false for invalid email addresses', () => {
        // define an invalid email address
        const email = 'cipriano.sanchez@sap'
        // expect the result of the validateEmail function to be false
        expect(validateEmail(email)).toBe(false)
    })

    // write a test case for the valideEmail function
    // it should iterate over an array of email addresses which are invalid
    it('returns false for invalid email addresses', () => {
        
        // define an array of invalid email addresses
        // Example: cipriano sanchez, jon doe, harry potter with an sap.com domain
        const invalidEmails = [
            'cipriano.sanchez',
            'jon.doe',
            'harry.potter@sap'
        ]

        // iterate over the array of invalid email addresses
        // for each email address, expect the result of the validateEmail function to be false
        invalidEmails.forEach(email => {
            expect(validateEmail(email)).toBe(false)
        })
    })
})