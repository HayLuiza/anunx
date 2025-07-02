"use client"
import { Box } from '@mui/material'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Default = ({ children }) => {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'rgb(242, 244, 245)' }}>
      <Header />
      <Box sx={{py: 8}}>
      {children}
      </Box>
      <Footer />
    </Box>
  )
}

export default Default