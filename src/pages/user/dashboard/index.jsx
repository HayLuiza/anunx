"use client"
import * as React from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/router'

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

import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'

import { useTheme } from '@mui/material/styles'
import { getSession } from 'next-auth/client'

import TemplateDefault from '../../../templates/Default'
import ProductsModel from '../../../models/products'
import dbConnect from '../../../utils/dbConnect'
import Card from '../../../components/Card'
import { formatCurrency } from '../../../utils/currency'
import useToasty from '../../../contexts/Toasty'
import FormEditProduct from '../../../components/FormEditProduct'

const Home = ({ products: initialProducts }) => {
  const theme = useTheme()
  const { setToasty } = useToasty()
  const router = useRouter()
  const [productId, setProductId] = React.useState()
  const [products, setProducts] = React.useState(initialProducts)
  const [removedProducts, setRemovedProducts] = React.useState([])
  const [openConfirmModal, setOpenConfirmModal] = React.useState(false)
  const [openEditForm, setOpenEditForm] = React.useState(false)
  const [selectedProduct, setSelectedProduct] = React.useState(null)

  const handleCloseModal = () => setOpenConfirmModal(false)
  const handleCloseEditForm = () => setOpenEditForm(false)

  const handleClickEdit = (product) => {
    setSelectedProduct(product)
    setOpenEditForm(true)
  }

  const handleClickRemove = (productId) => {
    setProductId(productId)
    setOpenConfirmModal(true)
  }

  const handleConfirmRemove = () => {
    axios.delete('/api/products/delete', {
      data: { id: productId }
    })
      .then(() => {
        setRemovedProducts(prev => [...prev, productId])
        setToasty({ open: true, severity: 'success', text: 'Anúncio removido com sucesso!' })
      })
      .catch(() => {
        setToasty({ open: true, severity: 'error', text: 'Erro ao remover anúncio.' })
      })
      .finally(() => setOpenConfirmModal(false))
  }

  const handleEditSuccess = (updatedProduct) => {
    setProducts(prev =>
      prev.map(prod => prod._id === updatedProduct._id ? updatedProduct : prod)
    )

    setToasty({ open: true, severity: 'success', text: 'Anúncio alterado com sucesso!' })
    handleCloseEditForm()
  }

  return (
    <TemplateDefault>
      <Dialog open={openConfirmModal} onClose={handleCloseModal}>
        <DialogTitle>Deseja realmente remover este anúncio?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ao confirmar a operação, não poderá voltar atrás.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancelar</Button>
          <Button onClick={handleConfirmRemove} autoFocus>Remover</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openEditForm}
        onClose={handleCloseEditForm}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Editar publicação
          <IconButton
            aria-label="close"
            onClick={handleCloseEditForm}
            sx={{ position: 'absolute', right: 8, top: 8, color: theme.palette.grey[500] }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent
          sx={{
            maxHeight: '80vh',
            overflowY: 'auto',
            '&::-webkit-scrollbar': { width: '10px' },
            '&::-webkit-scrollbar-track': { backgroundColor: '#f1f1f1', borderRadius: '4px' },
            '&::-webkit-scrollbar-thumb': { backgroundColor: '#c1c1c1', borderRadius: '4px' },
            '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#a8a8a8' },
          }}
        >
          {selectedProduct && (
            <FormEditProduct
              formValues={selectedProduct}
              onClose={handleCloseEditForm}
              onSuccess={handleEditSuccess}
            />
          )}
        </DialogContent>
      </Dialog>

      <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
        <Typography component="h1" variant="h2" align="center" sx={{ color: '#000000' }}>
          Meus Anúncios
        </Typography>

        <Link href="/user/publish" passHref>
          <Button
            variant="contained"
            sx={{ margin: '30px auto 50px auto', display: 'inline-block', backgroundColor: theme.palette.primary.main, color: theme.palette.secondary.main }}
          >
            Publicar novo anúncio
          </Button>
        </Link>
      </Container>

      <Container maxWidth="lg">
        {products.length === 0 ? (
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography gutterBottom>Nenhum anúncio publicado</Typography>
          </Box>
        ) : (
          <Grid container spacing={4} justifyContent="center">
            {products.map(product => {
              if (removedProducts.includes(product._id)) return null

              return (
                <Grid key={product._id} sx={{ xs: 12, sm: 5, md: 3 }}>
                  <Card
                    image={`/uploads/${product.files?.[0]?.name}`}
                    title={product.title}
                    subtitle={formatCurrency(product.price)}
                    actions={(
                      <>
                        <Button size="small" color="primary" onClick={() => handleClickEdit(product)}>
                          Editar
                        </Button>
                        <Button size="small" color="primary" onClick={() => handleClickRemove(product._id)}>
                          Remover
                        </Button>
                      </>
                    )}
                  />
                </Grid>
              )
            })}
          </Grid>
        )}
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
      products: JSON.parse(JSON.stringify(products))
    }
  }
}

export default Home
