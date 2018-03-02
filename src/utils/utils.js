export default {
  isObject: function(obj) {
    return obj === Object(obj);
  },
  gameAllDone: function(scores) {
    const gameAllDone = Object.keys(scores).every(function(key) {
      return (scores[key] !== null);
    });

    return gameAllDone;
  }
};
