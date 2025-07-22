import React from 'react'
import { useRouter } from 'next/router'
import {
  Paper,
  IconButton,
  InputBase,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

const Search = () => {
  const router = useRouter()
  const [search, setSearch] = React.useState('')

  const handleSubmitSearch = (event) => {
    event.preventDefault()
    if (search?.trim()) {
      router.push({
        pathname: `/search/${search}`,
      })
    }
  }

  return (
    <Paper
      component="form"
      onSubmit={handleSubmitSearch}
      sx={{ display: 'flex', justifyContent: 'center', padding: '0px 10px' }}
    >
      <InputBase
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Ex.: iPhone 12 com garantia"
        fullWidth
      />
      <IconButton type="submit">
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}

export default Search
