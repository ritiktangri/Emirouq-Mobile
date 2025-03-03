import defaults from './defaults';

const prefix = '/coupon';

const coupon = {
  applyCoupon: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: `${prefix}/apply`,
    },
  },
};

export default coupon;
