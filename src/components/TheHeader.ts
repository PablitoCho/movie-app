import { Component } from '../core/heropy'

interface State {
  [key:string] : unknown
  menus : {
    name:string
    href:string
  }[]
}

export default class TheHeader extends Component {
  public state!: State // 명확한 할당 단언(!) : 초기값이 주어지지 않았지만, 할당 단언을 함으로써 초기값이 할당된 것처럼 사용
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
