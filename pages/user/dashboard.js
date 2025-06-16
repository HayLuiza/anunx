import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography
} from '@mui/material'

import TemplateDefault from '../../src/templates/Default'

export default function Home() {
  return (
    <TemplateDefault>
      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Typography component="h1" variant="h2" align="center">
          Meus Anúncios
        </Typography>

        <Button variant="contained"
          sx={{
            margin: '30px auto',
            display: 'block', 
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
