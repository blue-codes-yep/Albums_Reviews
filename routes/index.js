const express = require('express'),
  router = express.Router(),
  reviewModel = require('../models/reviewModel');

/* GET home page. */
router.get('/', async (req, res) => {
  let dataArray = [];
  dataArray = await reviewModel.getAllAlbums();

  res.render('template', {
    locals: {
      title: "Home",
      dataArray: dataArray
    },
    partials: {
      partial: 'partial-home'
    } 
    
});
});





module.exports = router;
