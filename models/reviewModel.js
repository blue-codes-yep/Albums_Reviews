const db = require('./conn');

class reviewModel {
    constructor(name) {
        this.name = name;
    }
    static async getAllAlbums() {
        try {
            const response = await db.any(`SELECT id, name FROM albums;`);
            return response; 
        }
        catch (error) {
            console.log("ERROR: ", error);
            return error;
        }
    }
    static async getOneAlbum(id) {
        try {
            const response = await db.any(`
                SELECT * FROM albums
                WHERE albums.id = ${id};
            `);
            return response; 
        }
        catch (error) {
            console.log("ERROR: ", error);
            return error;
        }
    }
    static async getReviews(id) {
        try {
            const response = await db.any(`
            SELECT review.stars, albums.name, review.review, review.title,users.name as username FROM albums
            INNER JOIN review ON albums.id = review.albums_id
            INNER JOIN users ON review.users_id = users.id
            WHERE review.albums_id = ${id};
            `);
            return response; 
        }
        catch (error) {
            console.log("ERROR: ", error);
            return error;
        }
    }

    static async addReview(user_id, album_id, review_title, review_review, stars) {
        try {
            const response = await db.one(
                `INSERT INTO review (users_id, albums_id, title, review, stars) VALUES ($1,$2,$3,$4,$5) RETURNING id`, 
                [user_id, album_id, review_title, review_review, stars]
            );
            return response;
        }
        catch (error) {
            console.error('ERROR', error);
            return error;
        }
    }
};

module.exports = reviewModel;