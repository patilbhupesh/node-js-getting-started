const yup = require("yup");

const categoryAdd = yup.object().shape({
  name: yup.string().trim().required(),
  images: yup.array().nullable(),
  predefined: yup.boolean().default(false),
  isDeleted: yup.boolean().default(false),
});

module.exports = categoryAdd