const defaultFormValues = {
  title: '',
  category: '',
  description: '',
  price: '',
  name: '',
  email: '',
  phone: '',
  files: [],
  state: '',
  city: '',
  userId: '',
  image: '',
}

import { object, string, number, array } from 'yup'

const validationSchema = object({
  title: string().required('Campo obrigatório*').min(6).max(100),
  description: string().required('Campo obrigatório*').min(50).max(5000),
  price: number().required('Campo obrigatório*'),
  files: array().min(1, 'Envie pelo menos uma foto'),
  state: string().required('Campo obrigatório*'),
  city: string().required('Campo obrigatório*'),
})

export { defaultFormValues, validationSchema }
