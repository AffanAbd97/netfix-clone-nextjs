"use client";

import useCurrentUser from "@/hooks/useCurrentUser";
import useFaforites from "@/hooks/useFavorites";
import axios from "axios";
import React, { useCallback, useMemo } from "react";

import { AiOutlinePlus } from "react-icons/ai";

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFaforites();

  const { data: currentUser, mutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavorites = useCallback(async () => {
    let response;

    if (isFavorite) {
      console.log(movieId);

    
      response = await axios.delete("/api/favorite", {
        data: {
            movieId,
        },
      });
    } else {
      var bodyFormData = new FormData();
      bodyFormData.append("movieId", movieId);
      response = await axios.post("/api/favorite", bodyFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }

    const updatedFavoriteIds = response?.data?.favoriteIds;

    mutate({
      ...currentUser,
      favoriteIds: updatedFavoriteIds,
    });
    mutateFavorites();
  }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

  return (
    <div
      onClick={toggleFavorites}
      className="
    cursor-pointer
    group/item
    w-6
    h-6
    lg:w-10
    lg:h-10
    border-white
    border-2
    rounded-full
    flex
    justify-center
    items-center
    transition
    hover:border-neutral-300
    "
    >
      <AiOutlinePlus className="text-white" size={25} />
    </div>
  );
};

export default FavoriteButton;
