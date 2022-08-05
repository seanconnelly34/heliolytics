import axios from "axios";
import { useState, useEffect } from "react";
import { IMovieSearchResults } from "../@types/api/movieSearchResults";

type TSearchTerm = {
  searchTerm: string;
  page: number;
};

const useGetMoviesBySearch = ({ searchTerm, page }: TSearchTerm) => {
  const [movieList, setMovieList] = useState<IMovieSearchResults[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    setMovieList([]);
  }, [searchTerm]);

  console.log("searchTerm, searchTerm", searchTerm);
  console.log("page", page, movieList);
  //fetch movie data, execute when searchTerm or page updates
  useEffect(() => {
    if (searchTerm === "") return;
    if (totalPages < page) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=a99cc60fc2b34dbb18cb806b8a88ed14&language=en-US&query=${searchTerm}&page=${page}&include_adult=false`
        );

        const movies = response.data.results;
        const numberOfPagesAvailable = response.data.total_pages;
        if (movies.length === 0) return;
        setMovieList((prevState) => [...prevState, ...movies]);
        setTotalPages(numberOfPagesAvailable);
        setLoading(false);
      } catch (error: unknown) {
        setError("Failure to fetch movie, Please Try Again or contact support");
      }
    };
    fetchData();
  }, [searchTerm, page, totalPages]);

  return {
    movieList,
    loading,
    error,
    totalPages,
  };
};

export default useGetMoviesBySearch;
