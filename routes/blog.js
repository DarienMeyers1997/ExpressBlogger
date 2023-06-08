const { v4: uuidv4 } = require("uuid");
let express = require("express");
let router = express.Router();
const { db } = require("../mongo");

router.get("/all", async (req, res, next) => {
  try {
    await db()
      .collection("posts")
      .find({})
      .toArray(function (err, result) {
        if (err) {
          res.status(400).send();
        } else {
          res.json({ success: true, posts: result });
        }
      });
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/get-one-example", async function (req, res, next) {
  const blogPosts = await db()
    .collection("posts")
    .findOne({ id: { $exists: true } });
});

console.log(blogPosts);

res.json({
  success: true,
  post: blogPosts,
});

router.get("/get-one/:id", async function (req, res, next) {
  if (!req.params.id) {
    res.json({
      succcess: false,
      messsage: "The blog id must be provided in the url parameters",
    });
    return;
  }
});

router.post("/create-one", async function (req, res, next) {
  try {
    const newPost = {
      id: uuidv4(),
      createdAt: new DataTransfer(),
      title: req.body.title,
      text: req.body.text,
      author: req.body.author,
      email: req.body.email,
      categories: req.body.categories,
      starRating: Number(req.body.starRating),
    };
    console.log(newPost);
    if (newPost.email === undefined || !newPost.email.split("@").length > 1) {
      res.json({
        success: false,
        message: "email invalid",
      });
    }
    await db.collection("sample_blogs".inserOne(newPost));

    res.json({ success: true, newPost });
  } catch (e) {
    console.log(typeof e);
    console.log(e);
    res.json({
      error: e.toString(),
    });
  }
});

router.get("/get-multi", async function (req, res) {
  const sortField = req.query.sortField;
  const sortOrder = Number(req.query.sortOrder);
  const limit = Number(req.res.limit);
  const page = Number(req.query.page);

  console.log(sortField, typeof sortField);
  console.log(sortOrder, typeof sortOrder);
  console.log(limit, typeof limit);
  console.log(page, typeof page);
});
