
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  CardMedia,
  Chip,
  Container,
  Grid,
  Typography,
} from '@mui/material'

import Carousel from 'react-material-ui-carousel'

import { useTheme } from '@mui/material/styles'

import TemplateDefault from '../../templates/Default'

const Product = () => {
  const theme = useTheme()

  const boxStyle = {
    backgroundColor: theme.palette.background.white,
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
  }

  return (
    <TemplateDefault>
      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="center">
          <Grid xs={12} md={9}>
            <Box sx={boxStyle}>
              <Carousel
                autoPlay={false}
                animation="slide"
                navButtonsProps={{          
                  style: {
                    color: 'white'
                  }
                }} 
              >
                <Card sx={{ height: '100%' }}>
                  <CardMedia
                    sx={{ paddingTop: '56%' }}
                    image="https://picsum.photos/600/400?random=1"
                    title="Título da imagem"
                  />
                </Card>
                <Card sx={{ height: '100%' }}>
                  <CardMedia
                    sx={{ paddingTop: '56%' }}
                    image="https://picsum.photos/600/400?random=2"
                    title="Título da imagem"
                  />
                </Card>
              </Carousel>
            </Box>

            <Box sx={boxStyle} textAlign="left">
              <Typography component="span" variant="caption">Publicado 16 de junho de 2021</Typography>
              <Typography component="h4" variant="h4" sx={{ margin: '15px 0' }}>
                Jaguar XE 2.0 D R-Sport Aut.
              </Typography>
              <Typography component="h4" variant="h4" sx={{ fontWeight: 'bold', marginBottom: 3 }}>
                R$ 50.000,00
              </Typography>
              <Chip label="Categoria" />
            </Box>

            <Box sx={boxStyle} textAlign="left">
              <Typography component="h6" variant="h6">Descrição</Typography>
              <Typography component="p" variant="body2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit...
              </Typography>
            </Box>
          </Grid>

          <Grid xs={12} md={3}>
            <Card elevation={0} sx={boxStyle}>
              <CardHeader
                avatar={<Avatar>H</Avatar>}
                title="Hayra Luiza"
                subheader="hayra@gmail.com"
              />
              <CardMedia
                image="https://picsum.photos/600/400"
                title="Hayra Luiza"
              />
            </Card>

            <Box sx={boxStyle}>
              <Typography component="h6" variant="h6">
                Localização
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </TemplateDefault>
  )
}

export default Product