"use client"
import { Formik } from 'formik'
import { useRouter } from 'next/router'

import {
  Box,
  Container,
  Select,
  Input,
  Typography,
  Button,
  FormControl,
  InputLabel,
  InputAdornment,
  MenuItem,
  FormHelperText,
  CircularProgress,
} from '@mui/material'

import { useTheme } from '@mui/material/styles'

import TemplateDefault from '../../../templates/Default'
import { initialValues, validationSchema } from './formValues'
import FileUpload from '../../../components/FileUpload'
import useToasty from '../../../contexts/Toasty'
import axios from 'axios'
import { getSession } from 'next-auth/client'

const Publish = ({ userId, image }) => {
  const theme = useTheme()
  const { setToasty } = useToasty()
  const router = useRouter()

  const formValues = {
    ...initialValues,
  }

  formValues.userId = userId
  formValues.image = image

  console.log(formValues)

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

  const handleSuccess = () => {
    setToasty({
      open: true,
      text: 'Anúncio cadastrado com sucesso',
      severity: 'success',
    })

    router.push('/user/dashboard')
  }

  const handleError = () => {
    setToasty({
      open: true,
      text: 'Ocorreu um erro, tente novamente.',
      severity: 'error',
    })
  }

  const handleSubmit = async (values) => {
    const formData = new FormData()
    
    for(let field in values) {
      if (field === 'files') {
        values.files.forEach(file => {
          formData.append('files', file)
        })
      } else {
        formData.append(field, values[field])
      }
    }

    axios.post('/api/products/add', formData)
      .then(handleSuccess)
      .catch(handleError)
  }
  

  return (
    <TemplateDefault>
      <Formik
        initialValues={formValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {
          ({
            touched,
            values,
            errors,
            handleChange,
            handleSubmit,
            setFieldValue,
            isSubmitting,
          }) => {

            return (
              <form onSubmit={handleSubmit}>
                <Input type="hidden" name="userId" value={values.userId} />
                <Input type="hidden" name="image" value={values.image} />

                {/*TÍTULO DA PÁGINA*/}
                <Container maxWidth="sm" >
                  <Typography component="h1" variant="h2" align="center" color="textPrimary">
                    Publicar Anúncio
                  </Typography>
                  <Typography component="h5" variant="h5" align="center" color="textPrimary">
                    Quanto mais detalhado, melhor!
                  </Typography>
                </Container>

                <br/> <br/>

                {/*TITULO E CATEGORIA DO PRODUTO*/}
                <Container maxWidth="md" sx={{ paddingBottom: theme.spacing(3) }}>
                  <Box sx={{ backgroundColor: theme.palette.common.white, padding: theme.spacing(3) }}>

                    <Typography component="h6" variant="h6" color="textPrimary" gutterBottom>
                      Título do Anúncio
                    </Typography>
                    <FormControl error={errors.title && touched.title} fullWidth>
                      <InputLabel>ex.: Bicicleta Aro 18 com garantia</InputLabel>
                      <Input
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                      />
                      <FormHelperText>
                        { errors.title && touched.title ? errors.title : null }
                      </FormHelperText>
                    </FormControl>

                    <br /><br />

                    <FormControl error={errors.category && touched.category} variant="outlined" fullWidth>
                      <InputLabel id="category-label" sx={inputLabel}>Categoria</InputLabel>
                      <Select
                        labelId="category-label"
                        id="category"
                        name="category"
                        value={values.category}
                        fullWidth
                        onChange={handleChange}
                        label="Categoria"
                      >
                        <MenuItem value="Bebê e Criança">Bebê e Criança</MenuItem>
                        <MenuItem value="Agricultura">Agricultura</MenuItem>
                        <MenuItem value="Moda">Moda</MenuItem>
                        <MenuItem value="Carros, Motos e Barcos">Carros, Motos e Barcos</MenuItem>
                        <MenuItem value="Serviços">Serviços</MenuItem>
                        <MenuItem value="Lazer">Lazer</MenuItem>
                        <MenuItem value="Animais">Animais</MenuItem>
                        <MenuItem value="Móveis, Casa e Jardim">Móveis, Casa e Jardim</MenuItem>
                        <MenuItem value="Imóveis">Imóveis</MenuItem>
                        <MenuItem value="Equipamentos e Ferramentas">Equipamentos e Ferramentas</MenuItem>
                        <MenuItem value="Instrumentos Musicais">Instrumentos Musicais</MenuItem>
                        <MenuItem value="Celulares e Tablets">Celulares e Tablets</MenuItem>
                        <MenuItem value="Esporte">Esporte</MenuItem>
                        <MenuItem value="Tecnologia">Tecnologia</MenuItem>
                        <MenuItem value="Emprego">Emprego</MenuItem>
                        <MenuItem value="Outros">Outros</MenuItem>
                      </Select>
                      <FormHelperText>
                        { errors.category && touched.category ? errors.category : null }
                      </FormHelperText>
                    </FormControl>
                  </Box>
                </Container>

                {/*ARQUIVOS*/}
                <Container maxWidth="md" sx={{ paddingBottom: theme.spacing(3) }}>
                  <Box sx={{ backgroundColor: theme.palette.common.white, padding: theme.spacing(3) }}>
                    <FileUpload 
                      files={values.files}
                      errors={errors.files}
                      touched={touched.files}
                      setFieldValue={setFieldValue}
                    />
                  </Box>
                </Container>

                {/*DESCRICAO*/}
                <Container maxWidth="md" sx={{ paddingBottom: theme.spacing(3) }}>
                  <Box sx={{ backgroundColor: theme.palette.common.white, padding: theme.spacing(3) }}>
                    <Typography component="h6" variant="h6" color="textPrimary">
                      Descrição
                    </Typography>
                    <Typography component="div" variant="body2" color="textPrimary">
                      Escreva os detalhes do que está vendendo
                    </Typography>
                    <FormControl error={errors.description && touched.description} fullWidth>
                      <Input
                        name="description"
                        multiline rows={5} 
                        variant="outlined"
                        onChange={handleChange}
                      />
                      <FormHelperText>
                        { errors.description && touched.description ? errors.description : null }
                      </FormHelperText>
                    </FormControl>

                  </Box>
                </Container>

                {/*PRECO*/}
                <Container maxWidth="md" sx={{ paddingBottom: theme.spacing(3) }}>
                  <Box sx={{ backgroundColor: theme.palette.common.white, padding: theme.spacing(3) }}>
                    <Typography component="h6" variant="h6" color="textPrimary" gutterBottom>
                      Preço
                    </Typography>
                    <FormControl error={errors.price && touched.price} fullWidth variant="outlined">
                      <Input
                        name="price"
                        variant="outlined" 
                        onChange={handleChange}
                        startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                        label="Valor"
                      />
                      <FormHelperText>
                        { errors.price && touched.price ? errors.price : null }
                      </FormHelperText>
                    </FormControl>
                  </Box>
                </Container>

                {/*LOCALIZACAO*/}
                <Container maxWidth="md" sx={{ paddingBottom: theme.spacing(3) }}>
                  <Box sx={{ backgroundColor: theme.palette.common.white, padding: theme.spacing(3) }}>
                    <Typography component="h6" variant="h6" color="textPrimary" gutterBottom>
                      Localização
                    </Typography>

                    <FormControl error={errors.city && touched.city} fullWidth>
                      <InputLabel sx={inputLabel}>Cidade</InputLabel>
                      <Input
                        name="city"
                        value={values.city}
                        onChange={handleChange}
                      />
                      <FormHelperText>
                        { errors.city && touched.city ? errors.city : null }
                      </FormHelperText>
                    </FormControl>

                    <br /><br />
                    
                    <FormControl error={errors.state && touched.state} fullWidth>
                      <InputLabel sx={inputLabel}>Estado</InputLabel>
                      <Select
                        name="state"
                        value={values.state}
                        onChange={handleChange}
                        label="Estado"
                      >
                        {statesList.map((state, index) => (
                          <MenuItem key={index} value={state}>
                            {state}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>
                        {errors.state && touched.state ? errors.state : null}
                      </FormHelperText>
                    </FormControl>
                  </Box>
                </Container>
                
                {/*CONTATO*/}
                <Container maxWidth="md" sx={{ paddingBottom: theme.spacing(3) }}>
                  <Box sx={{ backgroundColor: theme.palette.common.white, padding: theme.spacing(3) }}>
                    <Typography component="h6" variant="h6" color="textPrimary" gutterBottom>
                      Dados de Contato
                    </Typography>

                    <FormControl error={errors.name && touched.name} fullWidth>
                      <InputLabel sx={inputLabel}>Nome</InputLabel>
                      <Input
                        name="name"
                        onChange={handleChange} 
                      />
                      <FormHelperText>
                        { errors.name && touched.name ? errors.name : null }
                      </FormHelperText>
                    </FormControl>

                    <br /><br />
                    
                    <FormControl error={errors.email && touched.email} fullWidth>
                      <InputLabel sx={inputLabel}>E-mail</InputLabel>
                      <Input
                        name="email"
                        onChange={handleChange} 
                      />
                      <FormHelperText>
                        { errors.email && touched.email ? errors.email : null }
                      </FormHelperText>
                    </FormControl>

                    <br /><br />

                    <FormControl error={errors.phone && touched.phone} fullWidth>
                      <InputLabel sx={inputLabel}>Telefone</InputLabel>
                      <Input
                        name="phone" 
                        onChange={handleChange} 
                      />
                      <FormHelperText>
                        { errors.phone && touched.phone ? errors.phone : null }
                      </FormHelperText>
                    </FormControl>

                  </Box>
                </Container>
                
                {/*BOTAO PUBLICAR*/}
                <Container maxWidth="md" sx={{ paddingBottom: theme.spacing(3) }}>
                  <Box textAlign="right">
                    {
                      isSubmitting
                        ? <CircularProgress sx={{
                          display: 'block',
                          margin:'10px auto',
                        }} />
                        : <Button type="submit" variant="contained" color="primary">
                          Publicar novo anúncio
                          </Button>
                    }
                  </Box>
                </Container>
              </form>
            )
          }
        }
      </Formik>
    
    </TemplateDefault>
  )
}

Publish.requireAuth = true

export async function getServerSideProps({ req }) {
  const { userId, user } = await getSession({ req })

  return {
    props: {
      userId,
      image: user.image,
    }
  }
}

export default Publish
