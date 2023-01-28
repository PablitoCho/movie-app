import { Store } from "../core/heropy"

/*
https://transform.tools/
 > JSON > to TypeScript
 > JSON.stringify(객체데이터) 결과값(양쪽 끝의 따옴표는 제외)을 붙여넣고 TypeScript로 변환한다.
 오타 방지를 위해 권장하는 방법
*/
interface State {
  photo: string
  name: string
  email: string
  blog: string
  github: string
  repository: string
}

export default new Store<State>({
  photo : 'https://heropy.blog/css/images/logo.png',
  name  : 'pablo / Wonil Cho',
  email : 'davidcho785@gmail.com',
  blog  : 'https://heropy.blog',
  github : 'https://github.com/ParkYoungWoong',
  repository : 'https://github.com/ParkYoungWoong/vanillajs-movie-app'
})

