const express = require("express");
const multer = require("multer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../middleware/auth");
const Items = require("../model/items");
const constant = require('../constants/Constants');
const itemController = require("../controller/itemController");
const validateDto = require("../middleware/validate-dto");
const itemDto = require("../dto/itemDto");

/**
 * @swagger
 * /products:
 *  get:
 *    description: Use to request all products
 *    responses:
 *      '200':
 *        description: A successful response
 */

router.get("/", auth, async (req, res) => {

  try {
    // request.user is getting fetched from Middleware after token authentication
    const limit = parseInt(req.query.pageSize) || constant.pageSize;
    const page = parseInt(req.query.pageNo) - 1 || constant.pageNo;

    const results = {}

    var query = {};

    if (req.query.search) {
      query = { name: { $regex: req.query.search.toLowerCase(), $options: "$i" }, isDeleted: false }
    } else {
      query = { isDeleted: false }
    }
    results.pagination = {
      totalCount: await Items.find(query).count(true),
      page: parseInt(req.query.pageNo) || constant.pageNo+1,
      limit: limit
    }
    try {
      results.data = await Items.find(query).skip(page).limit(limit).sort({ createdAt: -1 }).exec()
      res.paginatedResults = results;
      res.json(results);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  } catch (e) {
    console.log(e);
    res.send({ message: "Error in Fetching Product" });
  }
});



/**
 * @swagger
 * /products/add:
 *  post:
 *    description: Add Product
 *    responses:
 *      '201':
 *        description: A successful response
 */


 const productFileStoreEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images/products")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '--' + file.originalname);
  }
})
const maxSize = 5 * 1024 * 1024;
const productUpload = multer({
  storage: productFileStoreEngine, fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
  limits: { fileSize: maxSize },
})


router.post("/add", [auth, productUpload.single('item_image_url'), validateDto(itemDto)], itemController.addItem)

/**
 * @swagger
 * /products/:id:
 *  delete:
 *    description: Delete Product
 *    responses:
 *      '200':
 *        description: A successful response
 */


router.delete("/:id", [auth], itemController.deleteItem)

/**
 * @swagger
 * /products/:id:
 *  put:
 *    description: Update Product
 *    responses:
 *      '200':
 *        description: A successful response
 */


router.put("/:id", [auth, productUpload.single('images')], itemController.updateItem)

module.exports = router;