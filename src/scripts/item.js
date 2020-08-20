import cuid from 'cuid';

const validateUrl = function (url) {
  if (!url) throw new TypeError('Url must not be blank');
};

const create = function (title, rating, url, description) {
  return {
    id: cuid(),
    title,
    rating,
    url,
    description,
    expanded: false
  };
};

export default {
  validateUrl,
  create
};