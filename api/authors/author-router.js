const router = require("express").Router();
const Author = require("../authors/author-model");

router.get("/", async (req, res) => {
  try {
    const authors = await Author.get();
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const author = await Author.getById(id);
    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const foundedUser = await Author.getByName(name);
    if (foundedUser) {
      res.status(422).json({ message: "Yazar zaten var" });
    } else {
      const author = await Author.insert({ name: name });
      res.status(201).json(author);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { name } = req.body;
    const author = await Author.update({ name: name }, req.params.id);
    res.status(201).json(author);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const author = await Author.remove(req.params.id);
    res.status(201).json(author);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
