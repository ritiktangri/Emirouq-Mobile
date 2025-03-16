import defaults from './defaults';

const prefix = '/post';

const post = {
  createPost: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: `${prefix}/:id`,
    },
  },
 
};

export default post;
