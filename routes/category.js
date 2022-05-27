const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Category = require("../model/category");
const constant = require('../constants/Constants');
const multer = require("multer");
const categoryController = require("../controller/categoryController");
const categoryDto = require("../dto/categoryDto")
const validateDto = require("../middleware/validate-dto");

/**
 * @swagger
 * /category:
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
      totalCount: await Category.find(query).count(true),
      page: parseInt(req.query.pageNo) || constant.pageNo+1,
      limit: limit
    }
    try {
      results.data = await Category.find(query).skip(page).limit(limit).sort({ createdAt: -1 }).exec()
      res.paginatedResults = results;
      res.json(results);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  } catch (e) {
    console.log(e);
    res.send({ message: "Error in Fetching Category" });
  }
});


/**
 * @swagger
 * /category/add:
 *  post:
 *    description: Add Category
 *    responses:
 *      '201':
 *        description: A successful response
 */


const categoryFileStoreEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images/category")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '--' + file.originalname);
  }
})
const maxSize = 5 * 1024 * 1024;
const categoryUpload = multer({
  storage: categoryFileStoreEngine, fileFilter: (req, file, cb) => {
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


router.post("/add", [auth, categoryUpload.single('images'), validateDto(categoryDto)], categoryController.addCategory)

/**
 * @swagger
 * /category/:id:
 *  delete:
 *    description: Delete Category
 *    responses:
 *      '200':
 *        description: A successful response
 */


router.delete("/:id", [auth], categoryController.deleteCategory)

/**
 * @swagger
 * /category/:id:
 *  put:
 *    description: Update Category
 *    responses:
 *      '200':
 *        description: A successful response
 */


router.put("/:id", [auth, categoryUpload.single('images')], categoryController.updateCategory)

module.exports = router;