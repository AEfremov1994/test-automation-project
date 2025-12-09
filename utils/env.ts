export const environment = {
  get BASE_URL() {
    return process.env.BASE_URL;
  },
  get EXISTING_USER_EMAIL() {
    return process.env.EXISTING_USER_EMAIL;
  },
  get EXISTING_USER_PASSWORD() {
    return process.env.EXISTING_USER_PASSWORD;
  },
  get NEW_USER_EMAIL() {
    return process.env.NEW_USER_EMAIL;
  },
  get NEW_USER_PASSWORD() {
    return process.env.NEW_USER_PASSWORD;
  },
};