const Item = require("../model/items");

class ItemController {
  async addItem(req, res) {
    try {
      const { name } = req.body;
      let product = await Item.findOne({
        name
      });
      if (product) {
        return res.status(400).json({
          message: ["Product Already Exists"]
        });
      }
      let reqObj = req.body
      if (req?.file?.path) {
        reqObj.item_image_url = req.file.path
      }
      reqObj.createdAt = new Date();
      reqObj.updatedAt = new Date();
      reqObj.createdBy = req.user.id;
      reqObj.updatedBy = req.user.id;
      product = new Item(reqObj);

      let response = await product.save();
      res.status(201).json(response);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in Saving");
    }
  }

  async deleteItem(req, res) {
    try {
      const { name } = req.body;
      let product = await Item.findById(
        req.params.id
      );
      if (!product) {
        return res.status(400).json({
          message: ["Product not found"]
        });
      }
      product.isDeleted = true;
      await product.save();
      res.status(201).json({ message: "Successfully deleted" });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in Saving");
    }
  }


  async updateItem(req, res) {
    try {
      const { name, desc, price } = req.body;
      let product = await Item.findById(
        req.params.id
      );
      if (!product) {
        return res.status(400).json({
          message: ["Product not found"]
        });
      }

      if (req?.file?.path) {
        product.item_image_url = req.file.path
      }
      if (name) {
        product.name = name
      }
      if (price) {
        product.price = price
      }
      if (desc) {
        product.desc = desc
      }
      product.updatedAt = new Date();
      product.updatedBy = req.user.id;
      product = new Item(product);

      let response = await product.save();
      res.status(201).json(response);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in Saving");
    }
  }

}

module.exports = new ItemController();