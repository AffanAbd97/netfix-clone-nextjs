"use client";
import useMovies from "@/hooks/useMovieList";
import { isEmpty } from "lodash";
import React from "react";
import MovieCard from "./movieCard";

interface MovieListProps {
  
  title: string;
}

const MovieList: React.FC<MovieListProps> = ({ title }) => {
    const {data:movie} = useMovies()
    const data = movie as Record<string, any>[];
  if (isEmpty(data)) {
    return null;
  }

  return (
    <div className="px-4 md:px-2 mt-4 space-y-8">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
          {title}
        </p>
        <div className="grid grid-cols-4 gap-2">
          {data.map((movie) => (
            <MovieCard key={movie.id} data={movie}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
