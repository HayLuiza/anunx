"use client"

import {
  Button,
  Container,
  Grid,
  Typography,
} from '@mui/material'

import { useTheme } from '@mui/material/styles'
import { getSession } from 'next-auth/client'

import TemplateDefault from '../../../templates/Default'
import ProductsModel from '../../../models/products'
import dbConnect from '../../../utils/dbConnect'
import Card from '../../../components/Card'

const Home = ({ products }) => {
  const theme = useTheme()

  return (
    <TemplateDefault>
      <Container maxWidth="sm">
        <Typography component="h1" variant="h2" align="center" sx={{color: '#000000'}}>
          Meus Anúncios
        </Typography>

        <Button
          variant="contained"
          sx={{
            margin: '30px auto',
            display: 'block',
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.secondary.main,
          }}
        >
          Publicar novo anúncio
        </Button>

      </Container>
      <Container maxWidth="md">
        <Grid container spacing={4} justifyContent="center">
          {
            products.map(product => (
              <Grid key={product._id} sx={{ xs: 12, sm: 6, md: 4 }}>
                <Card
                  image={`/uploads/${product.files[0].name}`}
                  title={product.title}
                  subtitle={product.price}
                  actions={
                    <>
                      <Button size="small" color="primary">
                        Editar
                      </Button>
                      <Button size="small" color="primary">
                        Remover
                      </Button>
                    </>
                  }
                />      
              </Grid>
            ))
          }
        </Grid>
      </Container>
    </TemplateDefault>
  )
}

Home.requireAuth = true

export async function getServerSideProps({ req }) {
  const session = await getSession({ req })
  await dbConnect()

  const products = await ProductsModel.find({ 'user.id': session.userId })

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    }
  }
}

export default Home
