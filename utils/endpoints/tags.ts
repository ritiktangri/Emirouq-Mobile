import defaults from './defaults';

const prefix = '/tags';

const tags = {
  getAllTags: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: `${prefix}`,
    },
  },
  getTagList: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: `${prefix}/:id`,
    },
  },
  addTag: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: `${prefix}`,
    },
  },
  updateTag: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: `${prefix}/:id`,
    },
  },
  deleteTag: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: `${prefix}/:id`,
    },
  },
};

export default tags;
