const router = require("express").Router();
const upload = require("../utils/multer");
const {
  uploadCatImages,
  getCatImages,
  updateCat,
  deleteCat,
} = require("../services/catService");
const { formatResponse } = require("../utils/utils");

router.post("/", upload.single("image"), async (req, res, next) => {
  try {
    console.log("image", req.file, req.body);
    const data = await uploadCatImages(req?.file, req.body);
    return res.status(201).json(data);
  } catch (e) {
    console.log("exception", e.message);
    next(e);
  }
});

router.get("/", async (req, res, next) => {
  try {
    return res.status(200).json(getCatImages(req?.query));
  } catch (err) {
    console.log(err);
    next({ status: 400, message: "Failed to fetch list of Cats" });
  }
});

router.put("/:id", upload.single("image"), async (req, res, next) => {
  try {
    return formatResponse(
      res,
      200,
      await updateCat(req.params.id, req.file, req.body)
    );
  } catch (err) {
    console.log(err);
    next({ status: 400, message: "Failed to update Cat" });
  }
});

// update
router.patch("/:id", async (req, res, next) => {
  try {
    return formatResponse(
      res,
      200,
      await updateCat(req.params.id, undefined, req.body)
    );
  } catch (err) {
    console.log(err);
    next({ status: 400, message: "Failed to update Cat" });
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    return formatResponse(res, 200, await deleteCat(req.params.id));
  } catch (err) {
    console.log(err);
    next({ status: 400, message: "Failed to delete cat" });
  }
});

module.exports = router;
