const convertToArray = value => {
  if (typeof value !== 'string') {
    return value;
  }

  try {
    let array = JSON.parse(value);
    if (Array.isArray(array)) {
      return array;
    }
  } catch (error) {
    console.error('Failed to parse JSON:', error);
  }

  return value;
};

convertToArray('["a", "b", "c"]')