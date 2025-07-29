import fs from 'fs'
import path from 'path'
import formidable from 'formidable-serverless'
import ProductsModel from '../../../models/products'
import dbConnect from '../../../utils/dbConnect'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req, res) {
  await dbConnect()

  if (req.method !== 'PUT') {
    res.setHeader('Allow', ['PUT'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  const form = new formidable.IncomingForm({
    multiples: true,
    uploadDir: path.join(process.cwd(), 'public/uploads'),
    keepExtensions: true,
  })

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Erro ao processar o formulário.' })
    }

    const { id } = req.query
    const product = await ProductsModel.findById(id)

    if (!product) {
      return res.status(404).json({ success: false, message: 'Produto não encontrado.' })
    }

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

    product.title = title || product.title
    product.category = category || product.category
    product.description = description || product.description
    product.price = price || product.price

    product.user = {
      id: userId,
      name,
      email,
      phone,
      image,
    }

    product.location = {
      city,
      state,
    }

    let existingFiles = []
    try {
      if (fields.existingFiles) {
        existingFiles = JSON.parse(fields.existingFiles)
      }
    } catch (e) {
      console.error('Erro ao fazer parse de existingFiles:', e)
      return res.status(400).json({ success: false, message: 'Erro ao processar arquivos existentes.' })
    }

    const uploadedFiles = files.newFiles
      ? Array.isArray(files.newFiles)
        ? files.newFiles
        : [files.newFiles]
      : []

    const newFiles = []

    for (const file of uploadedFiles) {
      const filePath = file.filepath || file.path
      const fileName = path.basename(filePath)
      const finalPath = path.join(process.cwd(), 'public/uploads', fileName)

      try {
        await fs.promises.rename(filePath, finalPath)
        newFiles.push({
          name: fileName,
          path: `/uploads/${fileName}`,
        })
      } catch (e) {
        console.error(`Erro ao mover o arquivo ${fileName}:`, e)
      }
    }

    const updatedFiles = [...existingFiles, ...newFiles]
    const oldFileNames = product.files.map(f => f.name)
    const updatedFileNames = updatedFiles.map(f => f.name)

    product.files = updatedFiles

    const filesToDelete = oldFileNames.filter(name => !updatedFileNames.includes(name))

    for (const fileName of filesToDelete) {
      const filePath = path.join(process.cwd(), 'public/uploads', fileName)
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath)
        } catch (e) {
          console.error(`Erro ao deletar arquivo ${fileName}:`, e)
        }
      }
    }

    try {
      const updatedProduct = await product.save()
      return res.status(200).json(updatedProduct)
    } catch (e) {
      return res.status(500).json({ success: false, message: 'Erro ao salvar produto.' })
    }
  })
}
