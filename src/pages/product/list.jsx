import {
  Paper,
  Container,
  IconButton,
  InputBase,
  Box,
  Grid,
  Typography,
} from '@mui/material'

import { useTheme } from '@mui/material/styles'

import SearchIcon from '@mui/icons-material/Search';

import TemplateDefault from '../../templates/Default'
import Card from '../../components/Card'

const List = () => {
  const theme = useTheme()

  return (
    <TemplateDefault>
      <Container maxWidth="lg">
        <Paper sx={{display: 'flex', justifyContent: 'center', padding: '0px 10px'}}>
          <InputBase
            placeholder="Ex.: Iphone 12 com garantia"
            fullWidth
          />
          <IconButton>
            <SearchIcon />
          </IconButton>
        </Paper>       
      </Container>

      <Container maxWidth="lg" sx={{py: 3}}>
        <Box sx={{
          backgroundColor: theme.palette.background.white,
          padding: theme.spacing(3),
          marginBottom: theme.spacing(3),
        }}>
          <Typography component="h6" variant="h6">
            Anúncios
          </Typography>
          <Typography component="span" variant="subtitle2">
            ENCONTRADOS 200 ANÚNCIOS
          </Typography>
          <Grid container spacing={3} sx={{ marginTop: theme.spacing(2)}} justifyContent="center">
            <Grid sx={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                image={'https://picsum.photos/600/400?random=1'}
                title={'Produto X'}
                subtitle={'R$ 60,00'}
              />
            </Grid>          
            
            <Grid sx={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                image={'https://picsum.photos/600/400?random=2'}
                title={'Produto Y'}
                subtitle={'R$ 70,00'}
              />
            </Grid>

            <Grid sx={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                image={'https://picsum.photos/600/400?random=3'}
                title={'Produto Z'}
                subtitle={'R$ 90,00'}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </TemplateDefault>
  )
}

export default List