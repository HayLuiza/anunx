import Link from 'next/link'

import {
  Container,
  Grid,
  Box,
  Typography,
} from '@mui/material'

const Footer = () => {
  return (
    <Container
      maxWidth="lg"
      component="footer"
      sx={(theme) => ({
        borderTop: `1px solid ${theme.palette.divider}`,
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
          paddingTop: theme.spacing(6),
          paddingBottom: theme.spacing(6),
        }
      })}
    >
      <Grid container spacing={3} justifyContent="space-around">
        <Grid xs={6} sm={3}>
          <Box textAlign="center">
            <Link href="#">
              <Typography color="text.secondary" variant="subtitle1" sx={{textDecoration: 'none'}}>Ajuda e Contato</Typography>
            </Link>
          </Box>
        </Grid>
        <Grid xs={6} sm={3}>
          <Box textAlign="center">
            <Link href="#" passHref>
              <Typography color="text.secondary" variant="subtitle1" sx={{textDecoration: 'none'}}>Dicas de Segurança</Typography>
            </Link>
          </Box>
        </Grid>
        <Grid xs={6} sm={3}>
          <Box textAlign="center">
            <Link href="#" passHref>
              <Typography color="text.secondary" variant="subtitle1" sx={{textDecoration: 'none'}}>Anunciar e Vender</Typography>
            </Link>
          </Box>
        </Grid>
        <Grid xs={6} sm={3}>
          <Box textAlign="center">
            <Link href="#" passHref>
              <Typography color="text.secondary" variant="subtitle1" sx={{textDecoration: 'none'}}>Plano profissional</Typography>
            </Link>
          </Box>
        </Grid>
      </Grid>

    </Container>
  )
}

export default Footer
