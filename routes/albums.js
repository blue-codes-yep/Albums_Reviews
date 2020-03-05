const express = require('express'),
    router = express.Router(),
    reviewModel = require('../models/reviewModel');

/* GET home page. */
router.get('/:id?', async (req, res) => {
    const { id } = req.params;
    let dataArray = [], partial = "",
        reviewArray = [];

    if (!!id) {
        dataArray = await reviewModel.getOneAlbum(id);
        partial = "partial-id";
        reviewArray = await reviewModel.getReviews(id);
    } else {
        dataArray = await reviewModel.getAllAlbums();
        partial = "partial-index";
    };

    res.render('template', {
        locals: {
            title: "Home",
            dataArray: dataArray,
            reviewArray: reviewArray
        },
        partials: {
            partial: partial
        }

    });
});


router.post('/', async (req, res) => {
    const { user_id, album_id, review_title, review_review, star_rating } = req.body;
    const postData = await reviewModel.addReview(user_id, album_id, review_title, review_review, star_rating);
    console.log(postData);
    res.status(200).redirect(`/albums/${album_id}`);
});



module.exports = router;
