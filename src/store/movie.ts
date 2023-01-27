import { Store } from "../core/heropy";

interface SimpleMovie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

interface DetailedMovie {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string
  Ratings: {
    Source : string
    Value : string
  }[]
  Metascore: string
  imdbRating: string
  imdbVotes: string
  imdbID: string
  Type: string
  DVD: string
  BoxOffice: string
  Production: string
  Website: string
  Response: string
}

interface State {
  searchText: string
  page: number
  pageMax: number
  movies: SimpleMovie[]
  movie: DetailedMovie
  loading: boolean
  message: string
}

const store = new Store<State>({
  searchText : '',
  page: 1,
  pageMax: 1,
  movies: [], // 빈 배열로 초기화하면 never[]로 typing한다.
  movie: {} as DetailedMovie, // movie 상세정보 타입 단언
  loading : false,
  message : 'Search for the movie title!'
})

export default store

export const searchMovies = async (page:number) => {
  store.state.loading = true
  store.state.page = page
  if(page==1) { // 새로운 검색시 page가 1로 들어온다
    store.state.movies = []
    store.state.message = ''
  }
  try {
    const res = await fetch('/api/movie', {
      method: 'POST',
      body : JSON.stringify({
        title : store.state.searchText,
        page
      })
    })
    const { Search, totalResults, Response, Error } = await res.json()
    if(Response === 'True') {
      store.state.movies = [
        ...store.state.movies, // 이전에 가지고 온 영화 정보
        ...Search // 새로 가지고 온 영화 정보
      ]
      store.state.pageMax = Math.ceil(Number(totalResults) / 10)
    } else {
      // Reponse === 'False'
      store.state.message = Error
    }
  } catch(error) {
    // fetch 함수는 다양한 이유로 에러가 발생할 수 있다.
    console.log('searchMovies error:', error)
  } finally {
    store.state.loading = false
  }  
}

export const getMovieDetails = async (id:string) => {
  try {
    const res = await fetch('/api/movie', {
      method: 'POST',
      body : JSON.stringify({
        id
      })
    })
    store.state.movie = await res.json()
  } catch(error) {
    console.log('getMovieDetails error:', error)
  }
}