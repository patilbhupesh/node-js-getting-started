const Category = require("../model/category");

class CategoryController {
  async addCategory(req, res) {
    try {
      const { name } = req.body;
      let category = await Category.findOne({
        name
      });
      if (category) {
        return res.status(400).json({
          message: ["Category Already Exists"]
        });
      }
      let reqObj = req.body
      if (req?.file?.path) {
        reqObj.images = req.file.path
      }
      reqObj.createdAt = new Date();
      reqObj.updatedAt = new Date();
      reqObj.createdBy = req.user.id;
      reqObj.updatedBy = req.user.id;
      category = new Category(reqObj);

      let response = await category.save();
      res.status(201).json(response);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in Saving");
    }
  }

  async deleteCategory(req, res) {
    try {
      const { name } = req.body;
      let category = await Category.findById(
        req.params.id
      );
      if (!category) {
        return res.status(400).json({
          message: ["Category not found"]
        });
      }
      category.isDeleted = true;
      await category.save();
      res.status(201).json({ message: "Successfully deleted" });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in Saving");
    }
  }


  async updateCategory(req, res) {
    try {
      const { name } = req.body;
      let category = await Category.findById(
        req.params.id
      );
      if (!category) {
        return res.status(400).json({
          message: ["Category not found"]
        });
      }

      if (req?.file?.path) {
        category.images = req.file.path
      }
      if (name) {
        category.name = name
      }
      category.updatedAt = new Date();
      category.updatedBy = req.user.id;
      category = new Category(category);

      let response = await category.save();
      res.status(201).json(response);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in Saving");
    }
  }

}

module.exports = new CategoryController();