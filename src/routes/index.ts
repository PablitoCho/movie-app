import { createRouter } from '../core/heropy'
import Home from './Home'
import Movie from './Movie'
import About from './About'
import NotFound from './NotFound'

export default createRouter([
  {path : '#/', component: Home }, // main page
  {path : '#/movie', component: Movie},
  {path : '#/about', component: About},
  {path : '.*', component: NotFound} // . 임의의 한 문자. {0,} 0개 이상 (또는 *)
])