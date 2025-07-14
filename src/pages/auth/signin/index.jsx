"use client"

import Image from 'next/image'
import { Formik } from 'formik'
import axios from 'axios'
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/client'

import {
  Box,
  Container,
  Input,
  Typography,
  Button,
  FormControl,
  InputLabel,
  FormHelperText,
  CircularProgress,
  Alert,
} from '@mui/material'

import { useTheme } from '@mui/material/styles'

import TemplateDefault from '../../../templates/Default'
import { initialValues, validationSchema } from './formValues'
import UseToasty from '../../../contexts/Toasty'

const Signin = () => {
  const theme = useTheme()
  const router = useRouter()
  const { setToasty } = UseToasty()
  const [ session ] = useSession()

  const handleFormSubmit = async values => {
    signIn('credentials', {
      email: values.email,
      password: values.password,
      callbackUrl: 'http://localhost:3000/user/dashboard',
    })
  }

  const handleGoogleLogin = () => {
    signIn('google', {
      callbackUrl: 'http://localhost:3000/user/dashboard',
    })
  }

  const inputLabel = {
    fontWeight: '200',
    color: theme.palette.primary.main,
  }

  return (
    <TemplateDefault>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {
          ({
            touched,
            values,
            errors,
            handleChange,
            handleSubmit,
            isSubmitting,
          }) => {
            
            return (
              <form onSubmit={handleSubmit}>
                {
                  router.query.i === '1'
                    ? (
                      <Alert severity="error" sx={{ margin: '20px 0'}}>
                        Usuário ou senha inválidos
                      </Alert>
                    )
                    : null
                }
                <Container maxWidth="sm" >
                  <Typography component="h1" variant="h2" align="center" color="textPrimary">
                    Entre na sua conta
                  </Typography>
                </Container>

                <br /><br />

                <Container maxWidth="md" sx={{ paddingBottom: theme.spacing(3) }}>
                  <Box sx={{ backgroundColor: theme.palette.common.white, padding: theme.spacing(3) }}>
                    <Box display="flex" justifyContent="center">
                      <Button 
                        variant="contained"
                        color="primary"
                        startIcon={
                          <Image 
                            src="/images/logo_google.png"
                            width={20}
                            height={20}
                            alt="Login com Google"
                          />
                        }
                        onClick={handleGoogleLogin}
                      >
                        Entrar com Google
                      </Button>
                    </Box>

                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        height: 1,
                        my: 4,
                        '&::before, &::after': {
                          content: '""',
                          flex: 1,
                          height: '1px',
                          backgroundColor: '#ccc',
                        },
                        '& span': {
                          backgroundColor: 'white',
                          padding: '0 30px',
                          color: '#666',
                        },
                      }}
                    >
                      <span>ou</span>
                    </Box>
                  
                    <FormControl error={errors.email && touched.email} fullWidth>
                      <InputLabel sx={inputLabel}>E-mail</InputLabel>
                      <Input
                        name="email"
                        type="email"
                        value={values.email}
                        onChange={handleChange} 
                      />
                      <FormHelperText>
                        { errors.email && touched.email ? errors.email : null }
                      </FormHelperText>
                    </FormControl>

                    <br /><br />

                    <FormControl error={errors.password && touched.password} fullWidth>
                      <InputLabel sx={inputLabel}>Senha</InputLabel>
                      <Input
                        name="password" 
                        type="password"
                        value={values.password} 
                        onChange={handleChange} 
                      />
                      <FormHelperText>
                        { errors.password && touched.password ? errors.password : null }
                      </FormHelperText>
                    </FormControl>

                    {
                      isSubmitting
                        ? (
                          <CircularProgress sx={{
                            display: 'block',
                            margin:'10px auto',
                          }} />
                        ) : (
                          <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary" 
                            sx={{
                              width: '100%', 
                              marginBottom: 2, 
                              marginTop: 5,
                              }}>
                            Entrar
                          </Button>
                        )
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

export default Signin
