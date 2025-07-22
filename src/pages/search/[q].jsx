import React from 'react'
import Link from 'next/link'
import slugify from 'slugify'
import { useRouter } from 'next/router'

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

import SearchIcon from '@mui/icons-material/Search'

import TemplateDefault from '../../templates/Default'
import Card from '../../components/Card'
import ProductsModel from '../../models/products'
import { formatCurrency } from '../../utils/currency'

const List = ({ products, q }) => {
  const router = useRouter()
  const [search, setSearch] = React.useState()
  const theme = useTheme()

  const handleSubmitSearch = () => {
    router.push({
      pathname: `/search/${search}`,
    })
  }

  return (
    <TemplateDefault>
      <Container maxWidth="lg">
        <Paper sx={{display: 'flex', justifyContent: 'center', padding: '0px 10px'}}>
          <InputBase
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Ex.: Iphone 12 com garantia"
            fullWidth
          />
          <IconButton onClick={handleSubmitSearch}>
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
            ENCONTRADOS {products.length} ANÚNCIOS PARA O TERMO "{q}"
          </Typography>
          <Grid container spacing={3} sx={{ marginTop: theme.spacing(2)}} justifyContent="center">
            {
              products.map(product => {
                const category = slugify(product.category).toLocaleLowerCase()
                const title = slugify(product.title).toLocaleLowerCase()

                return (
                  <Grid key={product._id} sx={{ xs: 12, sm: 6, md: 4 }}>
                    <Link href={`/${category}/${title}/${product._id}`} passHref>
                      <Card
                        image={`/uploads/${product.files[0].name}`}
                        title={product.title}
                        subtitle={formatCurrency(product.price)}
                      />      
                    </Link>
                  </Grid>
                )
              })
            }
          </Grid>
        </Box>
      </Container>
    </TemplateDefault>
  )
}

export async function getServerSideProps({ query }) {
  const { q } = query

  const products = await ProductsModel.find({
    $or: [
      {
        title: {
          $regex: q,
          $options: 'i'
        }
      },
      {
        description: {
          $regex: q,
          $options: 'i'
        }
      },
    ]
  })

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      q: JSON.parse(JSON.stringify(q)),
    }
  }
}

export default List