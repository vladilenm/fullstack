const Category = require('../models/category')
const Position = require('../models/position')
const errorHandler = require('../utils/error')

module.exports.getAll = async function(req, res) {
  try {
    const categories = await Category.find({user: req.user.id})
    res.status(200).json(categories)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.create = async function(req, res) {
  const category = new Category({
    name: req.body.name,
    imageSrc: req.file ? req.file.path : '',
    user: req.user.id
  })

  try {
    await category.save()
    res.status(201).json(category)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.getById = async function(req, res) {
  try {
    const category = await Category.findById(req.params.id)
    res.status(200).json(category)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.delete = async function(req, res) {
  try {
    await Category.remove({_id: req.params.id})
    await Position.find({category: req.params.id})
    res.status(200).json({message: 'Удалено'})
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.update = async function(req, res) {
  const updated = {
    name: req.body.name
  }
  if (req.file) {
    updated.imageSrc = req.file.path
  }
  try {
    const category = await Category.findOneAndUpdate({_id: req.params.id}, {$set: updated}, {new: true})
    res.status(200).json(category)
  } catch (e) {
    errorHandler(res, e)
  }
}
