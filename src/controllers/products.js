import fs from 'fs'
import path from 'path'
import formidable from 'formidable-serverless'
import ProductsModel from '../models/products'
import dbConnect from '../utils/dbConnect'

const post = async (req, res) => {
  await dbConnect()

  const form = new formidable.IncomingForm({
    multiples: true,
    uploadDir: 'public/uploads',
    keepExtensions: true,
  })

  form.parse(req, async (error, fields, data) => {
    if (error) {
      return res.status(500).json({ success: false })
    }

    const { files } = data

    const filesToRename = files instanceof Array 
      ? files
      : [files]

    const filesToSave = []

    await Promise.all(filesToRename.map(file => {
      const extension = path.extname(file.name)
      const filename = `${Date.now()}_${Math.floor(Math.random() * 99999999)}${extension}`
      const oldpath = file.path
      const newpath = path.join(process.cwd(), form.uploadDir, filename)

      filesToSave.push({
        name: filename,
        path: newpath,
      })

      return fs.promises.rename(oldpath, newpath)
    }))

    const {
      title,
      category,
      description,
      price,
      name,
      email,
      phone,
      userId,
      image,
      state,
      city,
    } = fields

    const product = new ProductsModel({
      title,
      category,
      description,
      price,
      user: {
        id: userId,
        name,
        email,
        phone,
        image,
      },
      location: {
        state,
        city,
      },
      files: filesToSave,
    })

    const register = await product.save()

    if (register) {
      res.status(201).json({ success: true })
    } else {
      res.status(500).json({ success: false })
    }
  })
}

const remove = async (req, res) => {
  await dbConnect()

  const id = req.body.id

  const deleted = await ProductsModel.findOneAndDelete({ _id: id })

  if (deleted) {
    return res.status(200).json({ sucess: true })
  } else {
    return res.status(500).json({ sucess: false })
  }
}

export {
  post,
  remove,
}