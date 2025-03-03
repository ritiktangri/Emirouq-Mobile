import defaults from './defaults';

const prefix = '/category';

const category = {
  getSingleCategory: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: `${prefix}/:id`,
    },
  },
  // in this api, we are fetching only categories data
  getCategories: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: `${prefix}`,
    },
  },
  // in this api, we are fetching categories with tags  as well
  getCategoryWithTags: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: `${prefix}/tags`,
    },
  },
  createCategory: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: `${prefix}`,
    },
  },
  updateCategory: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: `${prefix}/:id`,
    },
  },
  deleteCategory: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: `${prefix}/:id`,
    },
  },
};

export default category;
