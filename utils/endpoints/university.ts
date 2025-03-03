import defaults from './defaults';

const prefix = '/university';

const university = {
  getDetails: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: `${prefix}`,
    },
  },
};

export default university;
