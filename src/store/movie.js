import { Store } from "../core/heropy";

const store = new Store({
  searchText : '',
  page: 1,
  pageMax: 1,
  movies: [],
  movie: {

  }, // movie 상세정보
  loading : false,
  message : 'Search for the movie title!'
})

export default store

export const searchMovies = async page => {
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

export const getMovieDetails = async id => {
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