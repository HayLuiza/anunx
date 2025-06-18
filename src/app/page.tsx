"use client"
import {
  Paper,
  Container,
  IconButton,
  InputBase,
  Typography,
  Grid,
  CardContent,
  Card,
  CardMedia,
} from '@mui/material'

import SearchIcon from '@mui/icons-material/Search';

import TemplateDefault from '../templates/Default'

const Home = () => {
  return (
    <TemplateDefault sx={{ backgroundColor: '#ffffff' }}>
      <Container maxWidth="md" sx={{py: 6}}>
        <Typography component="h1" variant="h3" align="center" color="textPrimary">
          O que deseja encontrar?
        </Typography>
        <Paper sx={{display: 'flex', justifyContent: 'center', padding: '0px 10px', marginTop: 5}}>
          <InputBase
            placeholder="Ex.: Iphone 12 com garantia"
            fullWidth
          />
          <IconButton>
            <SearchIcon />
          </IconButton>
        </Paper>       
      </Container>

      <Container maxWidth="md" sx={{py: 6}}>
        <Typography component="h2" variant="h4" align="center" color="textPrimary">
          Destaques
        </Typography>
        <br />
        <Grid container spacing={4} justifyContent="center">
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
            </Card>
          </Grid>
        </Grid>
      </Container>
    </TemplateDefault>
  )
}

export default Home
