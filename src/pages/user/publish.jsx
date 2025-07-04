"use client"
import { Formik } from 'formik'
import { object, string, number, date, InferType } from 'yup'

import {
  Box,
  Container,
  Select,
  TextField,
  Input,
  Typography,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
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
})


const Publish = () => {
  const theme = useTheme()
  
  const inputLabel = {
    fontWeight: '400',
    color: theme.palette.primary.main,
  }

  const [files, setFiles] = useState([])

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFile) => {
      const newFiles = acceptedFile.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      }))
      setFiles([...files, ...newFiles])
    }
  })

  const handleRemoveFile = fileName => {
    const newFileState = files.filter(file => file.name !== fileName)
    setFiles(newFileState)
  }

  return (
    <TemplateDefault>
      <Formik
        initialValues={{
          title: '',
          category: '',
          description: '',
        }}
        validationSchema={validationSchema}
      >
        {
          ({
            values,
            errors,
            handleChange,
            handleSubmit,
          }) => {
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
                    <FormControl error={errors.title} fullWidth>
                      <InputLabel>ex.: Bicicleta Aro 18 com garantia</InputLabel>
                      <Input
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                      />
                      <FormHelperText>
                        { errors.title }
                      </FormHelperText>
                    </FormControl>

                    <br /><br />

                    <FormControl error={errors.category} variant="outlined" fullWidth>
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
                        { errors.category }
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
                        <input {...getInputProps()} />
                        <Typography variant="body2" color="textPrimary">
                          Clique para adicionar ou arraste a imagem para aqui
                        </Typography>
                      </Box>

                      {files.map((file, index) => (
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
                    <FormControl error={errors.description} fullWidth>
                      <Input
                      name="description"
                        multiline rows={6} 
                        variant="outlined" 
                      />
                      <FormHelperText>
                        { errors.description }
                      </FormHelperText>
                    </FormControl>

                  </Box>
                </Container>

                <Container maxWidth="md" sx={{ paddingBottom: theme.spacing(3) }}>
                  <Box sx={{ backgroundColor: theme.palette.common.white, padding: theme.spacing(3) }}>
                    <Typography component="h6" variant="h6" color="textPrimary" gutterBottom>
                      Preço
                    </Typography>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Valor</InputLabel>
                      <OutlinedInput
                        onChange={() => {}}
                        startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                        label="Valor"
                      />
                    </FormControl>
                  </Box>
                </Container>

                <Container maxWidth="md" sx={{ paddingBottom: theme.spacing(3) }}>
                  <Box sx={{ backgroundColor: theme.palette.common.white, padding: theme.spacing(3) }}>
                    <Typography component="h6" variant="h6" color="textPrimary" gutterBottom>
                      Dados de Contato
                    </Typography>
                    <TextField label="Nome" variant="outlined" size="small" fullWidth />
                    <br /><br />
                    <TextField label="E-mail" variant="outlined" size="small" fullWidth />
                    <br /><br />
                    <TextField label="Telefone" variant="outlined" size="small" fullWidth />
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
