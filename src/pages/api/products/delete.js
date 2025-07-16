import nextConnect from 'next-connect'
import { remove } from '../../../controllers/products'

const route = nextConnect()

route.delete(remove)

export default route
