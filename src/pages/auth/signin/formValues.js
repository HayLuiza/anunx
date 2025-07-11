import { object, string,} from 'yup'

const initialValues = {
  email: '',
  password: '',
}

const validationSchema = object({

  email: string()
    .email('Digite um e-mail válido')
    .required('Campo obrigatório*'),

  password: string()
    .min(8, 'Mínimo de 8 caracteres')
    .required('Campo obrigatório*'),
})

export {
  initialValues,
  validationSchema,
}
