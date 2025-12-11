/**
 * 
 * @param {never} _value 
 */
export function exhaustedGuard(_value) {
    throw new console.error(`Error! Reached forbidden guard function with unexpected value: ${JSON.stringify(_value)}`);
}