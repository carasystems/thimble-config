const { RawConfig } = require('config/raw');

const isObject = (obj) =>
  obj !== null && typeof obj === 'object' && !Array.isArray(obj);

const makeImmutable = (object, property, value) => {
  let properties = null;

  // Backwards compatibility mode where property/value can be specified
  if (typeof property === 'string') {
    return Object.defineProperty(object, property, {
      value: typeof value === 'undefined' ? object[property] : value,
      writable: false,
      configurable: false,
    });
  }

  // Get the list of properties to work with
  if (Array.isArray(property)) {
    properties = property;
  } else {
    properties = Object.keys(object);
  }

  // Process each property
  properties.forEach((propKey) => {
    const prop = object[propKey];
    if (prop instanceof RawConfig) {
      Object.defineProperty(object, propKey, {
        value: prop.resolve(),
        writable: false,
        configurable: false,
      });
    } else if (Array.isArray(prop)) {
      // Ensure object items of this array are also immutable.
      prop.forEach((item) => {
        if (isObject(item) || Array.isArray(item)) {
          makeImmutable(item);
        }
      });

      Object.defineProperty(object, propKey, {
        value: Object.freeze(prop),
      });
    } else {
      Object.defineProperty(object, propKey, {
        value: prop,
        writable: false,
        configurable: false,
      });

      // Ensure new properties can not be added.
      Object.preventExtensions(object);

      // Call recursively if an object.
      if (isObject(prop)) {
        makeImmutable(prop);
      }
    }
  });

  return object;
};

const getEnv = (varName, defaultValue) => {
  return process.env[varName] || defaultValue;
};

module.exports = {
  makeImmutable,
  getEnv,
};
