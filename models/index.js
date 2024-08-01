const User = require('./User');
const Favorite = require('./Favorite');

User.hasMany(Favorite);
Favorite.belongsTo(User);

module.exports = {
  User: User,
  Favorite: Favorite
}