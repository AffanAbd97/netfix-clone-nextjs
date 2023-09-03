'use client'

import React from 'react'
import MovieList from './movieList'
import useMovies from '@/hooks/useMovieList'
import useFaforites from '@/hooks/useFavorites'

const IndexMovie = () => {
    const {data:movie} = useMovies()
    const {data:favorite} = useFaforites()


  return (
    <div className="pb-40">
    <MovieList title="Trending Now"data={movie}/>
    <MovieList title="MyList" data={favorite} />
  </div>
  )
}

export default IndexMovie