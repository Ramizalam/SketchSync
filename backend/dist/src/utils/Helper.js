export class Helper {
    static generateRandomString(length = 9, options) {
        let text = options.start || "";
        const remainingLength = length - text.length;
        if (remainingLength <= 0) {
            return text;
        }
        let dictionary = "";
        if (options.includeLowerCase) {
            dictionary += "abcdefghijklmnopqrstuvwxyz";
        }
        if (options.includeUpperCase) {
            dictionary += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        }
        if (options.includeNumbers) {
            dictionary += "1234567890";
        }
        if (options.includeSpecialCharacters) {
            dictionary += "!@#$%^&*()";
        }
        for (let i = 0; i < length; i++) {
            text += dictionary.charAt(Math.floor(Math.random() * dictionary.length));
        }
        return text;
    }
    // this function will choose any random player as a drawer
    static getRandom(arr) {
        const randomIndex = Math.floor(Math.random() * arr.length);
        return arr[randomIndex];
    }
}
//# sourceMappingURL=Helper.js.map