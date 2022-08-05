import React, { useState } from "react";
import useGetMoviesBySearch from "../hooks/useGetMoviesBySearch";
import { Paper, Grid, TextField } from "@mui/material";
import styled from "styled-components";
import Toast from "../components/Toast";
import CircularProgress from "@mui/material/CircularProgress";
import InfiniteScroll from "react-infinite-scroll-component";
import { debounce } from "lodash";

const ProgressWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GridStyled = styled(Grid)`
  .MuiGrid-root {
    flex-direction: column;
  }
`;

const Item = styled(Paper)`
  margin: auto;
  padding: 10px;
  width: 200px;
`;

const Main = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const { movieList, loading, error, totalPages } = useGetMoviesBySearch({
    searchTerm,
    page,
  });

  const fetchMoreMovies = () => {
    const incrementPage = page + 1;
    setPage(incrementPage);
  };

  const handleMovieSearch = debounce(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setPage(1);
      setSearchTerm(e.target.value);
    },
    500
  );

  return (
    <div style={{ textAlign: "center" }}>
      <TextField
        id='standard-basic'
        label='Search our movie database'
        variant='standard'
        onChange={(e) => handleMovieSearch(e)}
        style={{ marginBottom: "30px", width: "300px" }}
      />
      {loading ? (
        <ProgressWrapper>
          <CircularProgress color='secondary' size={100} />
        </ProgressWrapper>
      ) : (
        <>
          <InfiniteScroll
            dataLength={movieList.length}
            next={fetchMoreMovies}
            hasMore={page !== totalPages}
            loader={
              searchTerm !== "" ? (
                <h2 style={{ textAlign: "center" }}>
                  Scroll down to load more...
                </h2>
              ) : (
                ""
              )
            }
            endMessage={
              page === totalPages && movieList.length !== 0 ? (
                <h2 style={{ textAlign: "center" }}>End of List</h2>
              ) : (
                ""
              )
            }
          >
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
              style={{ justifyContent: "center" }}
            >
              {movieList &&
                movieList.map((movie, index) => (
                  <GridStyled item xs={3} sm={4} md={4} key={index}>
                    <Item>
                      <img
                        src={
                          movie.poster_path
                            ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                            : "https://via.placeholder.com/190x300.png?text=No+Poster+Available"
                        }
                        alt={movie.title}
                      />
                    </Item>
                    <h4 style={{ marginBottom: "0px" }}>{movie.title}</h4>
                    <p style={{ marginTop: "10px" }}>{movie.release_date}</p>
                  </GridStyled>
                ))}
            </Grid>
          </InfiniteScroll>
        </>
      )}
      {error && <Toast message={error} isOpen={true} />}
    </div>
  );
};

export default Main;
