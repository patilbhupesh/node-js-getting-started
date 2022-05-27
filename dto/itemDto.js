const yup = require("yup");

const itemAdd = yup.object().shape({
  name: yup.string().trim().required(),
  price: yup.number().required(),
  desc: yup.string().trim(),
  item_image_url: yup.array().nullable(),
  isDeleted: yup.boolean().default(false),
});

module.exports = itemAdd