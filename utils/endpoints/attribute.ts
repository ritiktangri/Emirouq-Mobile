import defaults from './defaults';

const prefix = '/attributes';

const attributes = {
  getAttribute: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: `${prefix}/:subCategoryId`,
    },
  },
  getAttributeOptions: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: `${prefix}/:attributeId/options`,
    },
  },
  getParentAttributeOptions: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: `${prefix}/:parentId/options/children`,
    },
  },
};

export default attributes;
