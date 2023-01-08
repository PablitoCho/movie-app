import { Store } from "../core/heropy";

const store = new Store({
  searchText : '',
  page: 1,
  movies: []
})

export default store

// test key : 7035c60c
// ex : https://www.omdbapi.com/?s=frozen&apikey=812fae45
export const searchMovies = async page => {
  if(page==1) {
    store.state.page = 1
    // 새로운 검색시 page가 1로 들어온다
    store.state.movies = []
  }
  const res = await fetch(`https://www.omdbapi.com?apikey=812fae45&s=${store.state.searchText}&page=${page}`)
  const { Search } = await res.json()
  store.state.movies = [
    ...store.state.movies, // 이전에 가지고 온 영화 정보
    ...Search // 새로 가지고 온 영화 정보
  ]
}