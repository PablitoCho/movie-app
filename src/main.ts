import App from './App'
import router from './routes'

const root = document.querySelector('#root')
root?.append(new App().el)
router()

//즉시 실행 함수
/*
;(async () => {
  const res = await fetch('/api/test')
  const json = await res.json()
  console.log('/api/test', json);
})()
*/
