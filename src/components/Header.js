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
import Image from 'next/image';

export default function ButtonAppBar() {
  const [anchorUserMenu, setAnchorUseMenu] = React.useState(false)
  const [ session ] = useSession()

  const openUserMenu = Boolean(anchorUserMenu)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={3} sx={{backgroundColor:"#0B0B3D"}}>
        <Container maxWidth="lg" sx={{ width: '100%', padding: 0 }}>
          <Toolbar disableGutters>            
            <Box sx={{ flexGrow: 1 }}>
              <Link href="/" passHref>
                <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <Image
                    src="/images/logo_anunx.png"
                    width={150}
                    height={100}
                    alt="Logo Anunx"
                    style={{ objectFit: 'contain' }}
                  />
                </Box>
              </Link>
            </Box>
            <Link href={session ? '/user/publish' : '/auth/signin'} passHref>
              <Button color="inherit" variant="outlined" 
                sx={{ 
                  textDecoration: 'none',
                  fontSize: {
                    xs: '0.7rem',  
                    sm: '0.9rem',
                  },
                  padding: {
                    xs: '4px 6px',
                    sm: '6px 12px',
                  },
                  margin: {
                    xs: 'auto 1px',
                    sm: 2,
                  }
                }}
              >
                Anunciar e Vender
              </Button>            
            </Link>
            {
              session
                ? (
                  <IconButton sx={{ color: '#ffffff'}} onClick={(e) => setAnchorUseMenu(e.currentTarget)}>
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
              anchorEl={anchorUserMenu}
              open={openUserMenu}
              onClose={() => setAnchorUseMenu(null)}
              anchorOrigin={{
                vertical: 'bottom',
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
  )
}
