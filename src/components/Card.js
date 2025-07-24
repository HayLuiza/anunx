import {
  Card as CardMUI,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'

const Card = ({image, title, subtitle, actions }) => {
  return (
    <CardMUI
      sx={{
        width: 350,
        height: 320,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardMedia
        sx={{
          height: 200,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
           
        }}
        image={image}
        title={title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" component="h2" sx={{ fontSize: 20 }}>
          {title}
        </Typography>
        <Typography>
          {subtitle}
        </Typography>
      </CardContent>
      {
        actions
          ? (
            <CardActions>
              {actions}
            </CardActions>
          ) : null
      }
    </CardMUI>
  )
}

export default Card