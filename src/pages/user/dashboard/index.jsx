"use client"
import * as React from 'react'
import Link from 'next/link'
import axios from 'axios'

import {
  Button,
  Container,
  Grid,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
} from '@mui/material'

import { useTheme } from '@mui/material/styles'
import { getSession } from 'next-auth/client'

import TemplateDefault from '../../../templates/Default'
import ProductsModel from '../../../models/products'
import dbConnect from '../../../utils/dbConnect'
import Card from '../../../components/Card'
import { formatCurrency } from '../../../utils/currency'
import useToasty from '../../../contexts/Toasty'

const Home = ({ products }) => {
  const theme = useTheme()
  const { setToasty } = useToasty()
  const [productId, setProductId] = React.useState()
  const [removedProducts, setRemovedProducts] = React.useState([])
  const [openConfirmModal, setOpenConfirmModal] = React.useState(false)

  const handleCloseModal = () => setOpenConfirmModal(false)

  const handleClickRemove = (productId) => {
    setProductId(productId)
    setOpenConfirmModal(true)
  } 

  const handleConfirmRemove = () => {
    axios.delete('/api/products/delete', {
      data: {
        id: productId
      }
    })
      .then(handleSuccess)
      .catch(handleError)
  }

  const handleSuccess = () => {
    console.log('blz, deletou')

    setOpenConfirmModal(false)
    setRemovedProducts([...removedProducts, productId ])

    setToasty({
      open: true,
      severity: 'success',
      text: 'Anúncio removido com sucesso!'
    })
  }

  const handleError = () => {
    console.log('ops, deu erro')
    setOpenConfirmModal(false)
    setToasty({
      open: true,
      severity: 'error',
      text: 'Ops, ocorreu um erro!'
    })
  }

  return (
    <TemplateDefault>
      <Dialog
        open={openConfirmModal}
        onClose={handleCloseModal}
      >
        <DialogTitle>Deseja realmente remover este anúncio?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Ao confirmar a operação, não poderá voltar atrás.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancelar</Button>
          <Button onClick={handleConfirmRemove} autoFocus>Remover</Button>
        </DialogActions>
      </Dialog>

      <Container maxWidth="sm" sx={{ textAlign: 'center', }}>
        <Typography component="h1" variant="h2" align="center" sx={{color: '#000000'}}>
          Meus Anúncios
        </Typography>

        <Link href={'/user/publish'} passHref>
          <Button
            variant="contained"
            sx={{
              margin: '30px auto 50px auto',
              display: 'inline-block',
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.secondary.main,
            }}
          >
            Publicar novo anúncio
          </Button>        
        </Link>
      </Container>
      <Container maxWidth="md">
        {
          products.length === 0 ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Typography gutterBottom>
                Nenhum anúncio publicado
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={4} justifyContent="center">
              {
                products.map(product => {
                  if (removedProducts.includes(product._id)) return null

                  return (
                    <Grid key={product._id} sx={{ xs: 12, sm: 6, md: 4 }}>
                      <Card
                        image={`/uploads/${product.files[0].name}`}
                        title={product.title}
                        subtitle={formatCurrency(product.price)}
                        actions={
                          <>
                            <Button size="small" color="primary">
                              Editar
                            </Button>
                            <Button size="small" color="primary" onClick={() => handleClickRemove(product._id)}>
                              Remover
                            </Button>
                          </>
                        }
                      />      
                    </Grid>
                  )
                })
              }
            </Grid>
          )
        }
      </Container>
    </TemplateDefault>
  )
}

Home.requireAuth = true

export async function getServerSideProps({ req }) {
  const session = await getSession({ req })
  await dbConnect()

  const products = await ProductsModel.find({ 'user.id': session.userId })

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    }
  }
}

export default Home
