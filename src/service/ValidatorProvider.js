import games from './GameProvider';
import artists from './ArtistProvider';
const validators = {
  game: function(game) {
    return game in games;
  },
  level: function(game, level) {
    return level in games[game].levels;
  },
  artist: function(artist) {
    return artist in artists;
  },
  piece: function(artist, piece) {
    return piece in artists[artist].pieces;
  }
};

export default validators;
