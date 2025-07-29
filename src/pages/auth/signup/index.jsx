"use client"

import { Formik } from 'formik'
import axios from 'axios'
import { useRouter } from 'next/router'

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
} from '@mui/material'

import { useTheme } from '@mui/material/styles'

import TemplateDefault from '../../../templates/Default'
import { initialValues, validationSchema } from './formValues'
import UseToasty from '../../../contexts/Toasty'
import Link from 'next/link'

const Signup = () => {
  const theme = useTheme()
  const router = useRouter()
  const { setToasty } = UseToasty()

  const handleFormSubmit = async values => {
    const response = await axios.post('/api/users', values)

    if (await response.data.success) {
      setToasty({
        open: true,
        severity: 'success',
        text: 'Cadastro realizado com sucesso!'
      })

      router.push('/auth/signin')
    }
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
                <Container maxWidth="sm" >
                  <Typography component="h1" variant="h2" align="center" color="textPrimary">
                    Crie sua conta
                  </Typography>
                  <Typography component="h5" variant="h5" align="center" color="textPrimary">
                    E anuncie para todo o Brasil
                  </Typography>
                </Container>

                <br /><br />

                <Container maxWidth="md" sx={{ paddingBottom: theme.spacing(3) }}>
                  <Box sx={{ backgroundColor: theme.palette.common.white, padding: theme.spacing(3) }}>

                    <FormControl error={errors.name && touched.name} fullWidth>
                      <InputLabel sx={inputLabel}>Nome</InputLabel>
                      <Input
                        name="name"
                        value={values.name}
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

                    <br /><br />

                    <FormControl error={errors.passwordConf && touched.passwordConf} fullWidth>
                      <InputLabel sx={inputLabel}>Confirmação de senha</InputLabel>
                      <Input
                        name="passwordConf" 
                        type="password"
                        value={values.passwordConf} 
                        onChange={handleChange} 
                      />
                      <FormHelperText>
                        { errors.passwordConf && touched.passwordConf ? errors.passwordConf : null }
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
                            CADASTRAR
                          </Button>
                        )
                    }

                    <Link href="/auth/signin">
                      <Typography>
                        Já tem uma conta? Entre aqui
                      </Typography>
                    </Link>
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

export default Signup
