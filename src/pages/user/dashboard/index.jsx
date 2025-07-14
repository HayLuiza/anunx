"use client"

import {
  Button,
  Container,
  Grid,
  Typography,
} from '@mui/material'

import { useTheme } from '@mui/material/styles'

import TemplateDefault from '../../../templates/Default'
import Card from '../../../components/Card'

const Home = () => {
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
          <Grid sx={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              image={'https://picsum.photos/600/400'}
              title={'Produto W'}
              subtitle={'R$ 80,00'}
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

          
          <Grid sx={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              image={'https://picsum.photos/600/400'}
              title={'Produto X'}
              subtitle={'R$ 60,00'}
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
          
          <Grid sx={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              image={'https://picsum.photos/600/400'}
              title={'Produto Y'}
              subtitle={'R$ 70,00'}
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

          <Grid sx={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              image={'https://picsum.photos/600/400'}
              title={'Produto Z'}
              subtitle={'R$ 90,00'}
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
        </Grid>
      </Container>
    </TemplateDefault>
  )
}

Home.requireAuth = true

export default Home
