// component를 만들고, component간의 데이터 통신 store, router 기능 수행

///// Component /////
export class Component {
  constructor(payload = {}) {
    const { 
      tagName = 'div', 
      props = {},
      state = {} 
    } = payload // 구조분해 할당 + default 값
    this.el = document.createElement(tagName)
    this.state = state
    this.props = props
    this.render()
  }
  render() {
    // ... component class를 확장(상속)해서 사용할때 지정
  }
}

//// Router ////
function routeRender(routes) {
  if(!location.hash) 
    history.replaceState(null, '', '/#/') // history 내역에 기록을 남기지 않으면서 페이지 이동
  
  const routerView = document.querySelector('router-view')
  // http://localhost:1234/#/about?name=heropy
  // > #/about?name=heropy
  const [hash, queryString = ''] = location.hash.split('?')

  // queryString : a=123&b=456
  const query = queryString
  .split('&')
  .reduce((acc, cur) => {
    const [key, value] = cur.split('=');
    acc[key] = value
    return acc
  }, {})
  history.replaceState(query, '') // history 객체에 history 속성에 query 데이터를 채움

  const currentRoute = routes.find(route => new RegExp(`${route.path}/?$`).test(hash))
  routerView.innerHTML = ''
  routerView.append(new currentRoute.component().el)

  window.scrollTo(0, 0) // reset scroll
}

export function createRouter(routes) {
  return function() {
    window.addEventListener('popstate', () => {
      routeRender(routes) // 주소가 바뀔때(popstate event)마다 동작
    })
    routeRender(routes) // 최초 한번 호출. 초기 페이지(라우트)가 보여야 함
  }
}

///// Store /////
export class Store {
  constructor(state) {
    this.state = {}
    this.observers = {} // 감시자. subscribe method에서 활용
    for (const key in state) {
      // 객체 데이터는 for-in 루프 : key를 이용
      Object.defineProperty(
        this.state, 
        key, 
        {
          get: () => state[key], // state['message'] 
          set: val => {
            // console.log(val)
            state[key] = val
            // this.observers[key]() // 변경(setter)시 호출
            this.observers[key].forEach(
              observer => observer(val) // callback 함수 실행. 변경된 값(val)을 parameter로 넣어서 필요할때 실행
            )
          }
        }) // 객체 데이터의 속성을 정의할 때 사용
    }
  }
  subscribe(key, cb) {
    // {message : [() => {}, () => {}]} : 여러 callback을 등록
    Array.isArray(this.observers[key]) 
      ? this.observers[key].push(cb) 
      : this.observers[key] = [cb] // cb : callback
  } // state 변경을 구독을 통해 감시하는 메서드
}