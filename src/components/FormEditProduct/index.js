"use client"
import { Formik } from 'formik'
import {
  Box,
  Container,
  Select,
  Input,
  Typography,
  FormControl,
  InputLabel,
  InputAdornment,
  MenuItem,
  FormHelperText,
  Button,
} from '@mui/material'

import { useTheme } from '@mui/material/styles'
import { defaultFormValues, validationSchema } from './formValues'
import FileUpload from '../FileUpload'
import useToasty from '../../contexts/Toasty'
import axios from 'axios'

const FormEditProduct = ({ formValues, onSuccess }) => {
  const theme = useTheme()
  const { setToasty } = useToasty()

  const initialValues = {
    ...defaultFormValues,
    ...formValues,
    city: formValues?.location?.city || '',
    state: formValues?.location?.state || '',
    name: formValues?.user?.name || '',
    email: formValues?.user?.email || '',
    phone: formValues?.user?.phone || '',
    userId: formValues?.user?.id || '',
  }

  const statesList = [
    "Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Espírito Santo",
    "Goiás", "Maranhão", "Mato Grosso", "Mato Grosso do Sul", "Minas Gerais",
    "Pará", "Paraíba", "Paraná", "Pernambuco", "Piauí", "Rio de Janeiro",
    "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia", "Roraima", "Santa Catarina",
    "São Paulo", "Sergipe", "Tocantins"
  ]

  const inputLabel = {
    fontWeight: '400',
    color: theme.palette.primary.main,
  }

  const inputDisabled = {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    p: 1,
  }

  const handleSuccess = (updatedProduct) => {
    setToasty({ open: true, text: 'Anúncio alterado com sucesso', severity: 'success' })
    if (onSuccess) onSuccess(updatedProduct)
  }

  const handleError = () => {
    setToasty({ open: true, text: 'Ocorreu um erro, tente novamente.', severity: 'error' })
  }

  const handleSubmit = async (values) => {
    const formData = new FormData()

    const existingFiles = []
    const newFiles = []

    values.files.forEach(file => {
      if (file instanceof File) {
        newFiles.push(file)
      } else {
        existingFiles.push({ name: file.name, path: file.path })
      }
    })

    formData.append('existingFiles', JSON.stringify(existingFiles))

    newFiles.forEach(file => {
      formData.append('newFiles', file)
    })

    formData.append('title', values.title)
    formData.append('description', values.description)
    formData.append('price', values.price)
    formData.append('city', values.city)
    formData.append('state', values.state)
    formData.append('userId', values.userId)
    formData.append('name', values.name)
    formData.append('email', values.email)
    formData.append('phone', values.phone)

    try {
      const response = await axios.put(`/api/products/edit?id=${formValues._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      handleSuccess(response.data)
    } catch {
      handleError()
    }
  }


  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} enableReinitialize>
      {({ touched, values, errors, handleChange, handleSubmit, setFieldValue }) => (
        <form onSubmit={handleSubmit}>
          <Container maxWidth="md">
            <Box sx={{ backgroundColor: theme.palette.common.white, p: 3 }}>
              <Typography variant="h6" gutterBottom>Título do Anúncio</Typography>
              <FormControl error={errors.title && touched.title} fullWidth>
                <InputLabel>ex.: Bicicleta Aro 18 com garantia</InputLabel>
                <Input name="title" value={values.title} onChange={handleChange} />
                <FormHelperText>{ errors.title && touched.title ? errors.title : null }</FormHelperText>
              </FormControl>
              <br /><br />
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="category-label" sx={inputLabel}>Categoria</InputLabel>
                <Select labelId="category-label" label="Categoria" id="category" name="category" value={values.category} fullWidth sx={inputDisabled} disabled>
                  <MenuItem value={values.category}>{values.category}</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Container>

          <Container maxWidth="md">
            <Box sx={{ backgroundColor: theme.palette.common.white, p: 3 }}>
              <FileUpload
                files={values.files.map(file => {
                  if (file instanceof File) return file
                  return {
                    ...file,
                    preview: file.preview || file.path || `/uploads/${file.name}`,
                  }
                })}
                errors={errors.files}
                touched={touched.files}
                setFieldValue={setFieldValue}
              />
            </Box>
          </Container>

          <Container maxWidth="md">
            <Box sx={{ backgroundColor: theme.palette.common.white, p: 3 }}>
              <Typography variant="h6" gutterBottom>Descrição</Typography>
              <FormControl error={!!(errors.description && touched.description)} fullWidth>
                <Input name="description" value={values.description} onChange={handleChange} multiline rows={5} />
                <FormHelperText>{touched.description && errors.description}</FormHelperText>
              </FormControl>
            </Box>
          </Container>

          <Container maxWidth="md">
            <Box sx={{ backgroundColor: theme.palette.common.white, p: 3 }}>
              <Typography variant="h6" gutterBottom>Preço</Typography>
              <FormControl error={!!(errors.price && touched.price)} fullWidth>
                <Input name="price" value={values.price} onChange={handleChange} startAdornment={<InputAdornment position="start">R$</InputAdornment>} />
                <FormHelperText>{touched.price && errors.price}</FormHelperText>
              </FormControl>
            </Box>
          </Container>

          <Container maxWidth="md">
            <Box sx={{ backgroundColor: theme.palette.common.white, p: 3 }}>
              <Typography variant="h6" gutterBottom>Localização</Typography>
              <FormControl error={errors.city && touched.city} fullWidth>
                <InputLabel sx={inputLabel}>Cidade</InputLabel>
                <Input name="city" value={values.city} onChange={handleChange} />
                <FormHelperText>{ errors.city && touched.city ? errors.city : null }</FormHelperText>
              </FormControl>
              <br /><br />
              <FormControl error={errors.state && touched.state} fullWidth>
                <InputLabel sx={inputLabel}>Estado</InputLabel>
                <Select name="state" value={values.state} onChange={handleChange} label="Estado">
                  {statesList.map((state, index) => (<MenuItem key={index} value={state}>{state}</MenuItem>))}
                </Select>
                <FormHelperText>{errors.state && touched.state ? errors.state : null}</FormHelperText>
              </FormControl>
            </Box>
          </Container>

          <Container maxWidth="md" sx={{ pb: 3 }}>
            <Box sx={{ backgroundColor: theme.palette.common.white, p: 3 }}>
              <Typography variant="h6" gutterBottom>Dados de Contato</Typography>
              <FormControl fullWidth>
                <InputLabel sx={inputLabel}>Nome</InputLabel>
                <Input name="name" value={values.name} sx={inputDisabled} disabled />
              </FormControl>
              <br /><br />
              <FormControl fullWidth>
                <InputLabel sx={inputLabel}>E-mail</InputLabel>
                <Input name="email" value={values.email} sx={inputDisabled} disabled />
              </FormControl>
              <br /><br />
              <FormControl fullWidth>
                <InputLabel sx={inputLabel}>Telefone</InputLabel>
                <Input name="phone" value={values.phone} sx={inputDisabled} disabled />
              </FormControl>
            </Box>
          </Container>

          <Container maxWidth="md" sx={{ pb: 3 }}>
            <Box textAlign="right">
              <Button type="submit" variant="contained" color="primary">
                Alterar
              </Button>
            </Box>
          </Container>
        </form>
      )}
    </Formik>
  )
}

export default FormEditProduct