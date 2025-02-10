import { useEffect, useState } from "react";
import { Logo, Nav, NumResults, Search } from "./components/Nav";
import { Box } from "./components/Box";
import { MovieList } from "./components/Movie";
import { WatchedMoviesContainer, WatchedMoviesList, WatchedSummary } from "./components/WatchedMovie";
import { useFetchMovie } from "./hooks/useFetchMovies";
import { MovieDetails } from "./components/MovieDetails";


export default function App() {

  const [query, setQuery] = useState("");
  const { movies, isLoading, error } = useFetchMovie(query);
  //const [movies, setMovies] = useState(tempMovieData);
  const [selectedId, setSelectedId] = useState(null);

  //Función para iniciar el localStorage
  function initialList() {
    const localStorageList = localStorage.getItem('watched')
    return localStorageList ? JSON.parse(localStorageList) : []
  }

  //Variable que se usa para almacenar el localStorage
  const [watched, setWatched] = useState(initialList);


  function initialList() {
    const localStorageList = localStorage.getItem('watched')
    return localStorageList ? JSON.parse(localStorageList) : []
  }

  //Hook para que se aplique a la variable
  useEffect(() => {
    localStorage.setItem('watched', JSON.stringify(watched))
  }, [watched])

  function handleSelectMovie(id) {
    setSelectedId(id);
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function deleteMovie (id) {
    setWatched(watched.filter(movie => movie.imdbID !== id));
  }


  return (
    <>
      <Nav>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Nav>

      <main className="main">
        <Box>
          {isLoading && <p className="loader">Cargando...</p>}
          {error && <p className="error">⛔</p>}
          <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
        </Box>

        <Box>
          <WatchedMoviesContainer >
            {selectedId ? (
              <MovieDetails selectedId={selectedId} onCloseMovie={handleCloseMovie} onAddWatched={handleAddWatched} watched={watched} />
            ) : (
              <>
                <WatchedSummary watched={watched} />
                <WatchedMoviesList watched={watched} deleteMovie={deleteMovie}/>
              </>
            )}
          </WatchedMoviesContainer>
        </Box>
      </main>
    </>
  );
}
