// Testing Pure Functions


// 🐨 import the function that we're testing
import cases from 'jest-in-case'
import {isPasswordAllowed} from '../auth'
// 🐨 write tests for valid and invalid passwords
// 💰 here are some you can use:
//

function casify(obj) {
    return Object.entries(obj).map(([name, password]) => ({
        name: `${password} - ${name}`,
        password,
    }))
}

cases(
    'isPasswordAllowed valid passwords',
    ({password}) => {
        expect(isPasswordAllowed(password)).toBe(true)
    },
    casify({'valid password':'!aBc123' })
)
cases(
    'isPasswordAllowed invalid passwords',
    ({password}) => {
        expect(isPasswordAllowed(password)).toBe(false)
    },
    casify({
        'too short': 'a2c!',
        'no letters': '123456!',
        'no uppercase letters': `abc123!`,
        'no lowercase letters': `ABC123!`,
        'no non-alphanumeric characters': 'ABCdef123'

    })
)
