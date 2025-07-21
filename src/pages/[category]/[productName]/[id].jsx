
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  CardMedia,
  Chip,
  Container,
  Grid,
  Typography,
} from '@mui/material'

import Carousel from 'react-material-ui-carousel'

import { useTheme } from '@mui/material/styles'

import TemplateDefault from '../../../templates/Default'
import ProductsModel from '../../../models/products'
import dbConnect from '../../../utils/dbConnect'
import { formatCurrency } from '../../../utils/currency'
import Image from 'next/image'

const Product = ({ product }) => {
  const theme = useTheme()

  const boxStyle = {
    backgroundColor: theme.palette.background.white,
    padding: theme.spacing(2),
    marginBottom: theme.spacing(3),
  }

  return (
    <TemplateDefault>
      <Container maxWidth="lg" sx={{justifyItems: 'center'}}>
        <Grid container spacing={3}>
          <Grid item xs={8} sx={{ maxWidth: '65%'}}>
            <Box sx={boxStyle}>
              <Carousel
                autoPlay={false}
                animation="slide"
                navButtonsProps={{          
                  style: {
                    color: 'white'
                  }
                }}
              >
                {
                  product.files.map(file => (
                    <Box key={file.name} sx={{ position: 'relative', width: '100%', pt: '56%' }}>
                      <Image
                        src={`/uploads/${file.name}`}
                        alt={product.title}
                        layout="fill"
                        objectFit="cover"
                        quality={100}
                      />
                    </Box>
                  ))
                }
              </Carousel>
            </Box>

            <Box sx={boxStyle} textAlign="left">
              <Typography component="span" variant="caption">
                Publicado em {new Date(product.createdAt).toLocaleDateString('pt-BR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </Typography>
              <Typography component="h4" variant="h4" sx={{ margin: '15px 0' }}>
                {product.title}
              </Typography>
              <Typography component="h4" variant="h4" sx={{ fontWeight: 'bold', marginBottom: 3 }}>
                {formatCurrency(product.price)}
              </Typography>
              <Chip label={product.category} />
            </Box>

            <Box sx={boxStyle} textAlign="left">
              <Typography component="h6" variant="h6">Descrição</Typography>
              <Typography component="p" variant="body2">
                {product.description}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={4}>
            <Card elevation={0} sx={boxStyle}>
              <CardHeader
                avatar={
                <Avatar src={product.user.image}>
                  { product.user.image || product.user.name[0]}
                </Avatar>}
                title={product.user.name}
                subheader={product.user.email}
              />
              <CardMedia
                image={product.user.image}
                title={product.user.name}
              />
            </Card>

            <Box sx={boxStyle}>
              <Typography component="h6" variant="h6">
                Localização
              </Typography>
              <Typography component="p" variant="body2">
                {product.location.city} | {product.location.state}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </TemplateDefault>
  )
}

export async function getServerSideProps({ query }) {
  const { id } = query

  await dbConnect()

  const product = await ProductsModel.findOne({ _id: id })

  return {
    props: {
      product: JSON.parse(JSON.stringify(product))
    }
  }
}

export default Product