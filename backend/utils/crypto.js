const crypto = require('crypto');

const hashPassword = async (password) => {
    try {
        const salt = crypto.randomBytes(16).toString('hex');
        const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
        return `${salt}:${hash}`;
    } catch (error) {
        throw new Error('Error al cifrar la contraseña');
    }
};

const verifyPassword = async (password, hashedPassword) => {
    try {
        const [salt, hash] = hashedPassword.split(':');
        const hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
        return hash === hashVerify;
    } catch (error) {
        throw new Error('Error al verificar la contraseña');
    }
};

module.exports = {
    hashPassword,
    verifyPassword
};
