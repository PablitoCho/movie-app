import { Component } from "../core/heropy"

export default class TheFooter extends Component {
  constructor() {
    super({
      tagName : 'footer'
    })
  }
  render() {
    this.el.innerHTML = /* html */`
      <div>
        <a href="https://github.com/ParkYoungWoong/vanillajs-movie-app">
          Github Repository
        </a>
      </div>
      <div>
        <a href="https://github.com/ParkYoungWoong">
          ${new Date().getFullYear()}
        </a>
      </div>
    `
  }
}