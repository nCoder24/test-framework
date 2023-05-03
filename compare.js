const areEqual = function(data1, data2) {
  return data1 === data2;
}

const areEqualArray = function(array1, array2) {
  if(array1.length !== array2.length) return false;

  let index = 0;

  while(index < array1.length) {
    if(array1[index] !== array2[index]) return false;
    index++;
  }

  return true;
}

const areEqualArrayOfArray = function(array1, array2) {
  if(array1.length !== array2.length) return false;

  let index = 0;

  while(index < array1.length) {
    if(!areEqualArray(array1[index], array2[index])) return false;
    index++;
  }

  return true;
}

const areEqualObject = function(object1, object2) {
  if(Object.keys(object1).length !== Object.keys(object2).length) return false;

  let index = 0;

  while(index < array1.length) {
    if(array1[index] !== array2[index]) return false;
    index++;
  }

  return true;
}

const areEqualArrayOfObject = function(array1, array2) {
  if(array1.length !== array2.length) return false;

  let index = 0;

  while(index < array1.length) {
    if(!areEqualObject(array1[index], array2[index])) return false;
    index++;
  }

  return true;
}

exports.areEqual = areEqual;
exports.areEqualArray = areEqualArray;
exports.areEqualObject = areEqualObject;
exports.areEqualArrayOfArray = areEqualArrayOfArray;
exports.areEqualArrayOfObject = areEqualArrayOfObject;
