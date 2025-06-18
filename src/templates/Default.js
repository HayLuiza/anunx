import { Box } from '@mui/material'
import Header from '../components/Header'

const Default = ({ children, sx }) => {
  return (
    <Box sx={{ minHeight: '100vh', ...sx }}>
      <Header />
      {children}
      <footer>FOOTER</footer>
    </Box>
  )
}

export default Default
