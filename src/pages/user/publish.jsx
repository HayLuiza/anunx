"use client"
import { Formik } from 'formik'
import { object, string, number, date, InferType, array } from 'yup'

import {
  Box,
  Container,
  Select,
  Input,
  Typography,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  InputAdornment,
  MenuItem,
  FormHelperText,
} from '@mui/material'

import { useTheme } from '@mui/material/styles'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import TemplateDefault from '../../templates/Default'
import { DeleteForever } from '@mui/icons-material'

const validationSchema = object({
  title: string()
    .min(6, 'Escreva um título maior')
    .max(100, 'Título muito grande')
    .required('Campo obrigatório*'),

  category: string().required('Campo obrigatório*'),

  description: string()
    .min(50, 'Escreva uma descrição com pelo menos 50 caracteres.')
    .max(5000, 'Descrição muito grande')
    .required('Campo obrigatório*'),

  price: number().required('Campo obrigatório*'),

  name: string().required('Campo obrigatório*'),

  email: string().email('Digite um e-mail válido').required('Campo obrigatório*'),

  phone: number().required('Campo obrigatório*'),

  files: array().min(1, 'Envie pelo menos uma foto').required('Campo obrigatório*'),

})


const Publish = () => {
  const theme = useTheme()
  
  const inputLabel = {
    fontWeight: '400',
    color: theme.palette.primary.main,
  }

  return (
    <TemplateDefault>
      <Formik
        initialValues={{
          title: '',
          category: '',
          description: '',
          price: '',
          name: '',
          email: '',
          phone: '',
          files: [],
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log('ok, enviou o form', values)
        }}
      >
        {
          ({
            touched,
            values,
            errors,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => {

            const { getRootProps, getInputProps } = useDropzone({
              accept: 'image/*',
              onDrop: (acceptedFile) => {
                const newFiles = acceptedFile.map(file => Object.assign(file, {
                  preview: URL.createObjectURL(file)
                }))

                setFieldValue('files', [
                  ...values.files, 
                  ...newFiles,
                ])
              }
            })

            const handleRemoveFile = fileName => {
              const newFileState = values.files.filter(file => file.name !== fileName)
              setFieldValue('files', newFileState)
            }

            return (
              <form onSubmit={handleSubmit}>
                <Container maxWidth="sm" >
                  <Typography component="h1" variant="h2" align="center" color="textPrimary">
                    Publicar Anúncio
                  </Typography>
                  <Typography component="h5" variant="h5" align="center" color="textPrimary">
                    Quanto mais detalhado, melhor!
                  </Typography>
                </Container>

                <br/> <br/>

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

                <Container maxWidth="md" sx={{ paddingBottom: theme.spacing(3) }}>
                  <Box sx={{ backgroundColor: theme.palette.common.white, padding: theme.spacing(3) }}>
                    <Typography component="h6" variant="h6" color="textPrimary">
                      Imagens
                    </Typography>
                    <Typography component="div" variant="body2" color="textPrimary">
                      A primeira imagem é a foto principal do seu anúncio
                    </Typography>
                    {
                      errors.files && touched.files
                        ? <Typography variant="body2" color="error" gutterBottom>{errors.files}</Typography>
                        : null
                    }
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', marginTop: 4 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          textAlign: 'center',
                          padding: 2,
                          width: 200,
                          height: 150,
                          margin: '0 15px 15px 0',
                          backgroundColor: theme.palette.background.default,
                          border: '2px dashed black',
                        }}
                        {...getRootProps()}
                      >
                        <input name="files" {...getInputProps()} />
                        <Typography variant="body2" color={errors.files && touched.files ? 'error' : 'textPrimary'}>
                          Clique para adicionar ou arraste a imagem para aqui
                        </Typography>
                      </Box>

                      {values.files.map((file, index) => (
                        <Box
                          key={file.name}
                          sx={{
                            backgroundImage: `url(${file.preview})`,
                            width: 200,
                            height: 150,
                            margin: '0 15px 15px 0',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center center',
                            position: 'relative',
                            '&:hover .mask': { display: 'flex' },
                          }}
                        >
                          {index === 0 && (
                            <Box>
                              <Typography
                                variant="body2"
                                color="secondary"
                                sx={{
                                  backgroundColor: 'rgb(14, 102, 215)',
                                  padding: '6px 10px',
                                  position: 'absolute',
                                  bottom: 0,
                                  left: 0,
                                }}
                              >
                                Principal
                              </Typography>
                            </Box>
                          )}

                          <Box
                            className="mask"
                            sx={{
                              display: 'none',
                              justifyContent: 'center',
                              alignItems: 'center',
                              textAlign: 'center',
                              backgroundColor: 'rgba(0, 0, 0, 0.7)',
                              height: '100%',
                              width: '100%',
                            }}
                          >
                            <IconButton color="secondary" onClick={() => handleRemoveFile(file.name)}>
                              <DeleteForever fontSize="large" />
                            </IconButton>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Container>

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

                <Container maxWidth="md" sx={{ paddingBottom: theme.spacing(3) }}>
                  <Box textAlign="right">
                    <Button type="submit" variant="contained" color="primary">
                      Publicar novo anúncio
                    </Button>
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

export default Publish
