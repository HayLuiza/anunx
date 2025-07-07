"use client"
import {
  Box,
  Typography,
  IconButton,
} from '@mui/material'

import { useTheme } from '@mui/material/styles'

import { useDropzone } from 'react-dropzone'
import { DeleteForever } from '@mui/icons-material'

const FileUpload = ({ files, errors, touched, setFieldValue }) => {

  const theme = useTheme()

  const { getRootProps, getInputProps } = useDropzone({
                accept: 'image/*',
                onDrop: (acceptedFile) => {
                  const newFiles = acceptedFile.map(file => Object.assign(file, {
                    preview: URL.createObjectURL(file)
                  }))
  
                  setFieldValue('files', [
                    ...files, 
                    ...newFiles,
                  ])
                }
              })
  
              const handleRemoveFile = filePath => {
                const newFileState = files.filter(file => file.path !== filePath)
                setFieldValue('files', newFileState)
              }

  return (
    <>
      <Typography component="h6" variant="h6" color="textPrimary">
        Imagens
      </Typography>
      <Typography component="div" variant="body2" color="textPrimary">
        A primeira imagem é a foto principal do seu anúncio
      </Typography>
      {
        errors && touched
          ? <Typography variant="body2" color="error" gutterBottom>{errors}</Typography>
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
          <Typography variant="body2" color={errors && touched ? 'error' : 'textPrimary'}>
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
              <IconButton color="secondary" onClick={() => handleRemoveFile(file.path)}>
                <DeleteForever fontSize="large" />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Box>    
    </>
  )

}

export default FileUpload