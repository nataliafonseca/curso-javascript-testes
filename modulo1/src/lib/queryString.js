const keyValueToString = ([key, value]) => {
  if (typeof value === 'object' && !Array.isArray(value)) {
    throw new Error('Please check your parameters');
  }

  return `${key}=${value}`;
};

const stringToKeyValue = item => {
  let [key, value] = item.split('=');

  if (value.indexOf(',') > -1) {
    value = value.split(',');
  }

  return [key, value];
};

export function queryString(obj) {
  return Object.entries(obj).map(keyValueToString).join('&');
}

export function parse(qs) {
  return Object.fromEntries(qs.split('&').map(stringToKeyValue));
}
