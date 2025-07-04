"use client"

import {
  Paper,
  Container,
  IconButton,
  InputBase,
  Typography,
  Grid,
} from '@mui/material'

import SearchIcon from '@mui/icons-material/Search';

import TemplateDefault from '../templates/Default'
import Card from '../components/Card'

const Home = () => {
  return (
    <TemplateDefault>
      <Container maxWidth="md">
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

      <Container maxWidth="lg" sx={{py: 6}}>
        <Typography component="h2" variant="h4" align="center" color="textPrimary">
          Destaques
        </Typography>
        <br />
        <Grid container spacing={4} justifyContent="center">
          <Grid sx={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              image={'https://picsum.photos/600/400?random=1'}
              title={'Produto W'}
              subtitle={'R$ 80,00'}
            />      
          </Grid>

          <Grid sx={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              image={'https://picsum.photos/600/400?random=2'}
              title={'Produto X'}
              subtitle={'R$ 60,00'}
            />
          </Grid>          
          
          <Grid sx={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              image={'https://picsum.photos/600/400?random=3'}
              title={'Produto Y'}
              subtitle={'R$ 70,00'}
            />
          </Grid>

          <Grid sx={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              image={'https://picsum.photos/600/400?random=4'}
              title={'Produto Z'}
              subtitle={'R$ 90,00'}
            />
          </Grid>
        </Grid>
      </Container>
    </TemplateDefault>
  )
}

export default Home
