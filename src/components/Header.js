import * as React from 'react'
import { signOut, useSession } from 'next-auth/client'
import Link from 'next/link'
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Container,
  Avatar,
  Menu,
  Divider,
  MenuItem, 
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';

export default function ButtonAppBar() {
  const [anchorUseMenu, setAnchorUseMenu] = React.useState(false)
  const [ session ] = useSession()

  const openUserMenu = Boolean(anchorUseMenu)

  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static" elevation={3} sx={{backgroundColor:"#000000"}}>
        <Container maxWidth="lg">
          <Toolbar>
            
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link  href={'/'}>
                Anunx 
              </Link>
            </Typography>
            <Link href={session ? '/user/publish' : '/auth/signin'} passHref>
              <Button color="inherit" variant="outlined" sx={{ textDecoration: 'none'}}>
                Anunciar e Vender
              </Button>            
            </Link>
            {
              session
                ? (
                  <IconButton sx={{ color: '#ffffff', marginLeft: 2, }} onClick={(e) => setAnchorUseMenu(e.currentTarget)}>
                    {
                      session.user.image
                        ? <Avatar src={session.user.image} />
                        : <AccountCircle />
                    }
                    <Typography sx={{marginLeft: 1,}} color='#ffffff'>
                      {session.user.name}
                    </Typography>
                  </IconButton>                  
                ) : null
            }

            <Menu
              anchorEl={anchorUseMenu}
              open={openUserMenu}
              onClose={() => setAnchorUseMenu(null)}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <Link href="/user/dashboard" passHref>
                <MenuItem>Meus anúncios</MenuItem>
              </Link>
              <Link href="/user/publish" passHref>
                <MenuItem>Publicar novo anúncio</MenuItem>
              </Link>

              <Divider sx={{margin: '8px 0'}} />
              <Link href="" passHref>
                <MenuItem onClick={() => signOut({
                  callbackUrl: '/'
                })}>Sair</MenuItem>
              </Link>
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
