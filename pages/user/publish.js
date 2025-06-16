import {
  Box,
  Container,
  Select,
  TextField,
  Typography,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from '@mui/material'

import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import TemplateDefault from '../../src/templates/Default'
import theme from '../../src/theme'
import { DeleteForever } from '@mui/icons-material'

const Publish = () => {
  const [files, setFiles] = useState([])

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFile) => {
      const newFiles = acceptedFile.map(file => {
        return Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      })

      setFiles([
        ...files,
        ...newFiles,
      ])
    }
  })

  const handleRemoveFile = fileName => {
    const newFileState = files.filter(file => file.name !== fileName)
    setFiles(newFileState)
  }

  return (
    <TemplateDefault>
      <Container maxWidth="sm" sx={{ py: 6, paddingBottom: theme.spacing(3)}}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary">
          Publicar Anúncio
        </Typography>
        <Typography component="h5" variant="h5" align="center" color="textPrimary">
          Quanto mais detalhado, melhor!
        </Typography>
      </Container>

      <Container maxWidth="md" sx={{ paddingBottom: theme.spacing(3)}}>
        <Box sx={{
          backgroundColor: theme.palette.background.white,
          padding: theme.spacing(3),
        }}>
          <Typography component="h6" variant="h6" color="textPrimary" gutterBottom>
            Título do Anúncio
          </Typography>
          <TextField 
            label="ex.: Bicicleta Aro 18 com garantia"
            size="small"
            fullWidth
          />
          <br /><br />
          <Typography component="h6" variant="h6" color="textPrimary">
            Categoria
          </Typography>
          <Select
            native
            value=""
            fullWidth 
            onChange={() => {}}
            inputProps={{
              name: 'age'
            }} 
          >
            <option value="">Selecione</option>
            <option value={1}>Bebê e Criança</option>
            <option value={2}>Agricultura</option>
            <option value={3}>Moda</option>
            <option value={3}>Carros, Motos e Barcos</option>
            <option value={3}>Serviços</option>
            <option value={3}>Lazer</option>
            <option value={3}>Animais</option>
            <option value={3}>Moveis, Casa e Jardim</option>
            <option value={3}>Imóveis</option>
            <option value={3}>Equipamentos e Ferramentas</option>
            <option value={3}>Celulares e Tablets</option>
            <option value={3}>Esporte</option>
            <option value={3}>Tecnologia</option>
            <option value={3}>Emprego</option>
            <option value={3}>Outros</option>
          </Select>
        </Box>
      </Container>

      <Container maxWidth="md" sx={{ paddingBottom: theme.spacing(3) }}>
        <Box sx={{
          backgroundColor: theme.palette.background.white,
          padding: theme.spacing(3),
        }}>
          <Typography component="h6" variant="h6" color="textPrimary">
            Imagens
          </Typography>
          <Typography component="div" variant="body2" color="textPrimary">
            A primeira imagem é a foto principal do seu anúncio
          </Typography>

          <Box 
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            marginTop: 4,
          }}>
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
            }} {...getRootProps()}>
              <input {...getInputProps()} />
              <Typography variant="body2" color="textPrimary">
                Clique para adicionar ou arraste a imagem para aqui
              </Typography>
            </Box>

            {
              files.map((file, index) => (
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
                  '&:hover .mask': {
                    display: 'flex',
                  }, 
                }}>
                  {
                    index === 0 ?
                      <Box>
                        <Typography variant="body" color="secondary" sx={{
                          backgroundColor: 'rgb(14, 102, 215)',
                          padding: '6px 10px',
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                        }}>
                          Principal
                        </Typography>
                      </Box> 
                    : null                  
                  }

                  <Box className="mask" 
                  sx={{
                    display: 'none',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    height: '100%',
                    width: '100%',
                  }}>
                    <IconButton color="secondary" onClick={() => handleRemoveFile(file.name)}>
                      <DeleteForever fontSize="large" />
                    </IconButton>
                  </Box>
                </Box>
              ))
            }

          </Box>
        </Box>
      </Container>

      <Container maxWidth="md" sx={{ paddingBottom: theme.spacing(3)}}>
        <Box sx={{
          backgroundColor: theme.palette.background.white,
          padding: theme.spacing(3),
        }}>
          <Typography component="h6" variant="h6" color="textPrimary">
            Descrição 
          </Typography>
          <Typography component="div" variant="body2" color="textPrimary">
            Escreva os detalhes do que está vendendo
          </Typography>
          <TextField 
            multiline
            rows={6}
            variant="outlined"
            fullWidth          
          />
        </Box>
      </Container>
      
      <Container maxWidth="md" sx={{ paddingBottom: theme.spacing(3)}}>
        <Box sx={{
          backgroundColor: theme.palette.background.white,
          padding: theme.spacing(3),
        }}>
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

      <Container maxWidth="md" sx={{ paddingBottom: theme.spacing(3)}}>
        <Box sx={{
          backgroundColor: theme.palette.background.white,
          padding: theme.spacing(3),
        }}>
          <Typography component="h6" variant="h6" color="textPrimary" gutterBottom>
            Dados de Contato 
          </Typography>
          <TextField 
            label="Nome"
            variant="outlined"
            size="small"
            fullWidth
          />
          <br/><br/>
          <TextField 
            label="E-mail"
            variant="outlined"
            size="small"
            fullWidth
          />
          <br/><br/>
          <TextField 
            label="Telefone"
            variant="outlined"
            size="small"
            fullWidth
          />
        </Box>
      </Container>

      <Container maxWidth="md" sx={{ paddingBottom: theme.spacing(3)}}>
        <Box textAlign="right">
          <Button variant="contained" color="primary">
              Publicar novo anúncio
            </Button>          
        </Box>
      </Container>

    </TemplateDefault>
  )
}

export default Publish