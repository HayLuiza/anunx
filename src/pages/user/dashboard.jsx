"use client"

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@mui/material'

import { useTheme } from '@mui/material/styles'

import TemplateDefault from '../../../templates/Default'

export default function Home() {
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
            <Card>
              <CardMedia
                sx={{
                  paddingTop: '56%',
                  width: 250,
                }}
                image="https://picsum.photos/600/400"
                title="Título da imagem"
              />
              <CardContent>
                <Typography variant="h5" component="h2">
                  Produto W
                </Typography>
                <Typography>
                  R$ 80,00
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Editar
                </Button>
                <Button size="small" color="primary">
                  Remover
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid sx={{ xs: 12, sm: 6, md: 4 }}>
            <Card>
              <CardMedia
                sx={{
                  paddingTop: '56%',
                  width: 250,
                }}
                image={'https://picsum.photos/600/400'}
                title="Título da imagem"
              />
              <CardContent>
                <Typography variant="h5" component="h2">
                  Produto X
                </Typography>
                <Typography>
                  R$ 60,00
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Editar
                </Button>
                <Button size="small" color="primary">
                  Remover
                </Button>
              </CardActions>
            </Card>
          </Grid>
          
          <Grid sx={{ xs: 12, sm: 6, md: 4 }}>
            <Card>
              <CardMedia
                sx={{
                  paddingTop: '56%',
                  width: 250,
                }}
                image={'https://picsum.photos/600/400'}
                title="Título da imagem"
              />
              <CardContent>
                <Typography variant="h5" component="h2">
                  Produto Y
                </Typography>
                <Typography>
                  R$ 100,00
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Editar
                </Button>
                <Button size="small" color="primary">
                  Remover
                </Button>
              </CardActions>
            </Card>
          </Grid>
          
          
          <Grid sx={{ xs: 12, sm: 6, md: 4 }}>
            <Card>
              <CardMedia
                sx={{
                  paddingTop: '56%',
                  width: 250,
                }}
                image={'https://picsum.photos/600/400'}
                title="Título da imagem"
              />
              <CardContent>
                <Typography variant="h5" component="h2">
                  Produto Z
                </Typography>
                <Typography>
                  R$ 90,00
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Editar
                </Button>
                <Button size="small" color="primary">
                  Remover
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </TemplateDefault>
  )
}
