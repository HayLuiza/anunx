import * as React from 'react';
import Link from 'next/link';
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
import MenuIcon from '@mui/icons-material/Menu';
import { AccountCircle } from '@mui/icons-material';

export default function ButtonAppBar() {
  const [anchorUseMenu, setAnchorUseMenu] = React.useState(false)

  const openUserMenu = Boolean(anchorUseMenu)

  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static" elevation={3} sx={{backgroundColor:"#000000"}}>
        <Container maxWidth="lg">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Anunx
            </Typography>
            <Link href="/user/publish" passHref>
              <Button color="inherit" variant="outlined">
                Anunciar e Vender
              </Button>            
            </Link>
            <IconButton sx={{ color: '#ffffff', marginLeft: 2, }} onClick={(e) => setAnchorUseMenu(e.currentTarget)}>
              {
                true === false
                  ? <Avatar src="" />
                  : <AccountCircle />
              }
              <Typography sx={{marginLeft: 1,}} color='#ffffff'>
                Hayra Luiza
              </Typography>
            </IconButton>

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
                <MenuItem>Sair</MenuItem>
              </Link>
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
