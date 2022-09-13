const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

//Done and working
router.get("/", async (req, res) => {
  // find all categories
  try {
    const CategoriesData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(CategoriesData);
  } catch (err) {
    res.status(500).json(err);
  }

  // be sure to include its associated Products
});

//working
router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  try {
    const CategoriesData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!CategoriesData) {
      res.status(404).json({ message: "No categories found with this id!" });
      return;
    }
    res.status(200).json(CategoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

//working
router.post("/", async (req, res) => {
  // create a new category
  try {
    const CategoriesData = await Category.create(req.body);
    res.status(200).json(CategoriesData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//working
router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(400).json(error);
  }
});

//working
router.delete("/:id", async (req, res) => {
  try {
    const CategoriesData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json(CategoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
