import {
  Box,
  Typography,
  IconButton,
} from '@mui/material'

import { useTheme } from '@mui/material/styles'
import { useDropzone } from 'react-dropzone'
import { DeleteForever } from '@mui/icons-material'
import { useEffect, useRef } from 'react'

const FileUpload = ({ files, errors, touched, setFieldValue }) => {
  const theme = useTheme()
  const prevFilesRef = useRef(files)

  
  useEffect(() => {
    
    if (JSON.stringify(prevFilesRef.current) !== JSON.stringify(files)) {
      prevFilesRef.current = files 
      setFieldValue('files', files) 
    }
  }, [files, setFieldValue])

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
    },
    onDrop: (acceptedFiles) => {
      const newFiles = acceptedFiles.map(file =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      )
      setFieldValue('files', [...files, ...newFiles])
    },
  })

  const handleRemoveFile = (fileToRemove) => {
    setFieldValue(
      'files',
      files.filter(file => {
        if (file instanceof File) {
          return file.preview !== fileToRemove.preview
        } else {
          return file.name !== fileToRemove.name
        }
      })
    )
  }

  return (
    <>
      <Typography component="h6" variant="h6" color="textPrimary">
        Imagens
      </Typography>
      <Typography variant="body2" color="textPrimary">
        A primeira imagem é a foto principal do seu anúncio
      </Typography>
      {errors && touched && (
        <Typography variant="body2" color="error" gutterBottom>
          {errors}
        </Typography>
      )}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 4 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            p: 2,
            width: 200,
            height: 150,
            mr: 2,
            mb: 2,
            backgroundColor: theme.palette.background.default,
            border: '2px dashed black',
            cursor: 'pointer',
          }}
          {...getRootProps()}
        >
          <input name="files" {...getInputProps()} />
          <Typography variant="body2" color={errors && touched ? 'error' : 'textPrimary'}>
            Clique para adicionar ou arraste
          </Typography>
        </Box>

        {files.map((file, index) => {
          const imageUrl = file.preview || `/uploads/${file.name}`

          return (
            <Box
              key={imageUrl}
              sx={{
                backgroundImage: `url(${imageUrl})`,
                width: 200,
                height: 150,
                mr: 2,
                mb: 2,
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
                      p: '6px 10px',
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
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  height: '100%',
                  width: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                }}
              >
                <IconButton color="secondary" onClick={() => handleRemoveFile(file)}>
                  <DeleteForever fontSize="large" />
                </IconButton>
              </Box>
            </Box>
          )
        })}
      </Box>
    </>
  )
}

export default FileUpload
