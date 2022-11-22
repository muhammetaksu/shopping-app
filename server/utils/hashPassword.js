const bcrypt = require("bcrypt");
const saltRounds = 10;

const encodePassword = async (password) => {
    try {
        const newPass = await bcrypt.hash(password, saltRounds);
        return newPass;
        // console.log(newPass);
    } catch (error) {
        return error;
    }
};

const comparePassword = async (password, hash) => {
    try {
        const result = await bcrypt.compare(password, hash);
        return result;
    } catch (error) {
        return error;
    }
};

module.exports = { encodePassword, comparePassword };
