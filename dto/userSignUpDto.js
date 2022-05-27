const yup = require("yup");

const userSignUp = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().trim().required().min(6, "Password is too short - should be 6 chars minimum"),
  firstName: yup.string().trim().required(),
  lastName: yup.string().trim().required(),
  companyName: yup.string().trim().required()
});

module.exports = userSignUp