"use client"

import React from 'react'
import Link from 'next/link'
import slugify from 'slugify'

import {
  Container,
  Typography,
  Grid,
} from '@mui/material'

import TemplateDefault from '../templates/Default'
import Card from '../components/Card'
import dbConnect from '../utils/dbConnect'
import ProductsModel from '../models/products'
import { formatCurrency } from '../utils/currency'
import Search from '../components/Search'

const Home = ({ products }) => {

  return (
    <TemplateDefault>
      <Container maxWidth="md">
        <Typography component="h1" variant="h3" align="center" color="textPrimary">
          O que deseja encontrar?
        </Typography>
        <br />< br /> 
        <Search />     
      </Container>

      <Container maxWidth="lg" sx={{py: 6}}>
        <Typography component="h2" variant="h4" align="center" color="textPrimary">
          Destaques
        </Typography>
        <br />
        <Grid container spacing={4} justifyContent="center">
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
      </Container>
    </TemplateDefault>
  )
}

export async function getServerSideProps() {
  await dbConnect()

  const products = await ProductsModel.aggregate([{
    $sample: { size: 6 }
  }])

  return {
    props: {
      products: JSON.parse(JSON.stringify(products))
    }
  }
}

export default Home
