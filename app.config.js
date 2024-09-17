import 'dotenv/config';

export default {
  expo: {
    extra: {
      UID: process.env.UID,
      SECRET: process.env.SECRET,
    },
  },
};