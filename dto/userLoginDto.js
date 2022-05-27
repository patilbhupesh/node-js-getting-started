const yup = require("yup");

const userLogin = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().trim().required(),
});

module.exports = userLogin