const Cat = require("../models/cat");
const cloudinary = require("../utils/cloudinary");

const uploadCatImages = async (filePath, payload) => {
  console.log("filepath", filePath);
  const result = await cloudinary.uploader.upload(filePath);
  console.log("result", result);
  const cat = new Cat({
    cloudinary_id: result.public_id,
    imageUrl: result.secure_url,
    name: payload.name,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return await cat.save();
};

const getCatImages = async ({
  offset = 0,
  limit = 10,
  sort = { updatedAt: -1 },
  filter,
}) => {
  return await Cat.find().limit(parseInt(limit)).skip(parseInt(offset));
};

const updateCat = async (id, file, payload) => {
  let cat = await Cat.findById(id);
  let result;
  if (file) {
    await cloudinary.uploader.destroy(cat.cloudinary_id); // Delete image from cloudinary
    result = await cloudinary.uploader.upload(file.path); // Upload image to cloudinary
  }
  const data = {
    cloudinary_id: result?.public_id || cat.cloudinary_id,
    updatedAt: new Date(),
    name: payload.name || cat.name,
    imageUrl: result?.secure_url || cat.imageUrl,
  };
  return Cat.findByIdAndUpdate(id, data, { new: true });
};

const getById = async (id) => await Cat.findById(id);

const deleteCat = async (id) => {
  let cat = await Cat.findById(id);
  await cloudinary.uploader.destroy(cat.cloudinary_id); // Delete image from cloudinary
  return await cat.remove(); // Delete Cat from db
};

module.exports = {
  uploadCatImages,
  getCatImages,
  updateCat,
  getById,
  deleteCat,
};
