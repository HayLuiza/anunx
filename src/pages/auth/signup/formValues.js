import { object, ref, string,} from 'yup'

const initialValues = {
  name: '',
  email: '',
  password: '',
  passwordConf: '',
}

const validationSchema = object({
  name: string()
    .required('Campo obrigatório*'),

  email: string()
    .email('Digite um e-mail válido')
    .required('Campo obrigatório*'),

  password: string()
    .min(8, 'Mínimo de 8 caracteres')
    .required('Campo obrigatório*'),

  passwordConf: string()
    .oneOf([ref('password')], 'As senhas precisam ser iguais')
    .required('Campo obrigatório*')
})

export {
  initialValues,
  validationSchema,
}
