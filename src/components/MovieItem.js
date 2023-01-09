import { Component } from '../core/heropy'

export default class MovieItem extends Component {
  constructor(props) {
    super({
      props,
      tagName: 'a' // 상세 페이지 이동
    })
  }
  render() {
    const { movie } = this.props // Poster link, Title, Year, imdbID
    this.el.setAttribute('href', `#/movie?id=${movie.imdbID}`)
    this.el.classList.add('movie')
    this.el.style.backgroundImage = `url(${movie.Poster})`
    this.el.innerHTML = /* html */`
      <div class="info">
        <div class="year">
          ${movie.Year}
        </div>
        <div class="title">
          ${movie.Title}
        </div>
      </div>
    `
  }
}