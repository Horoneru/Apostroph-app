export default {
  popBack: function (array) {
    let newArray = [];
    for (let index = 0; index < array.length; index++) {
      if (index === 0) {
        newArray[array.length - 1] = array[0];
      }
      else {
        newArray[index - 1] = array[index];
      }
    }
    return newArray;
  },

  pushBack: function (array) {
    let newArray = [];
    for (let index = 0; index < array.length; index++) {
      if (index === array.length - 1) {
        newArray[0] = array[index];
      }
      else {
        newArray[index + 1] = array[index];
      }
    }

    return newArray;
  }
};
