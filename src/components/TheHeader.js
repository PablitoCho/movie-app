import { Component } from '../core/heropy'

export default class TheHeader extends Component {
  constructor() {
    super({
      tagName : 'header',
      state : {
        menus: [
          {
            name : 'Search',
            href : '#/'
          },
          {
            name : 'Movie',
            href : '#/movie?id=tt4520988' // frozen 2 as sample
          },
          {
            name : 'About',
            href : '#/about'
          }
        ]
      }
    })
    // popstate event : page가 바뀌는 event
    window.addEventListener('popstate', () => this.render())
  }
  render() {
    this.el.innerHTML = /* html */`
      <a 
        href="#/"
        class="logo"
        ><span>OBMbAPI</span>.COM
      </a>
      <nav>
        <ul>
          ${this.state.menus.map(
            menu => {
              const href = menu.href.split('?')[0]
              const hash = location.hash.split('?')[0]
              const isActive = href === hash ? true : false
              return /* html */`
                <li>
                  <a
                    class = "${isActive? 'active' : ''}" 
                    href="${menu.href}">
                    ${menu.name}
                  </a>
                </li>
              `
            }
          ).join('')}
        </ul>
      </nav>
      <a href="#/about" class="user">
        <img src="https://heropy.blog/css/images/logo.png" alt="User">
      </a>
    `
  }
}
