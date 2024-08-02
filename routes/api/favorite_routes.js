const router = require('express').Router();
const axios = require('axios');
const { User, Favorite } = require('../../models');

// Favorite Search
router.get('/search', async (req, res) => {
  const searchValue = req.query.movie;

  const url = `https://www.omdbapi.com/?apikey=${process.env.OMDB_KEY}&s=${searchValue}`;

  const { data } = await axios.get(url);
  const user = await User.findByPk(req.session.user_id, {
    include: Favorite
  });
  const userFavorites = user.favorites.map(favObj => favObj.imdbID);

  const results = data.Search.map(movieObj => {
    return {
      ...movieObj,
      favorited: userFavorites.includes(movieObj.imdbID)
    }
  });

  res.json(results);
});

// Add Favorite
router.post('/favorite', async (req, res) => {
  const imdbID = req.body.imdbID;
  const url = `https://www.omdbapi.com/?apikey=${process.env.OMDB_KEY}&i=${imdbID}`;
  const { data } = await axios.get(url);

  await Favorite.create({
    title: data.Title,
    release_date: data.Released,
    director: data.Director,
    imdbID: imdbID,
    userId: req.session.user_id
  });

  res.json({
    message: 'Favorited added.'
  });
});

// Set Favorite Rating
router.put('/rate', async (req, res) => {
  const favId = req.body.favId;
  const ratingLevel = req.body.level;

  await Favorite.update(
    {
      rating: ratingLevel
    },
    {
      where: {
        id: favId
      }
    }
  );

  res.json({
    message: 'Rating updated.'
  });
});

// Delete Favorite
router.delete('/unfav', async (req, res) => {
  const favId = req.body.favId;

  await Favorite.destroy({
    where: {
      id: favId
    }
  });

  res.json({
    message: 'Fav removed successfully!'
  });
});

module.exports = router;