const db = require('./conn'),
    bcrypt = require('bcryptjs');


class userModel {
    constructor(id, first_name, last_name, user_email, user_password) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.user_email = user_email;
        this.password = user_password;
    }

    checkPassword(hashedPassword) {
        return modbcrypt.compareSync(this.password, hashedPassword);
    }

    async addUser() {
        console.log('adding user', this);
        try {
            const response = await db.one(`
                INSERT INTO users (firstname, lastname, email, password) VALUES ($1,$2,$3,$4) RETURNING id
                `, [this.first_name,this.last_name,this.user_email,this.password]);
            return response; 
        }
        catch (error) {
            console.error("ERROR: ", error);
            return error;
        }
    }
    async loginUser() {
        try {
            const response = await db.one(`SELECT id, firstname, lastname, password FROM users WHERE email = $1`, [this.user_email]);
            console.log('response', response);
            const isValid = this.checkPassword(response.password);
            if (!!isValid) {
                console.log("successful login WOOT", isValid);
            } else {
                console.log("not valid email/password combo", isValid);
            }
        } catch (error) {
            console.error("ERROR: ", error);
            return error;
        }
    }
}

module.exports = userModel;