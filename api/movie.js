// serverless 함수는 vercel package가 동작하는 node.js에서 동작(브라우저에서 동작하지 않음)
// node.js는 fetch 함수가 없다 -> node-fetch package 설치
import fetch from "node-fetch"

export default async function handler(request, response) {
  const { title, page, id } = JSON.parse(request.body)
  const url = id // id가 있으면 상세정보 요청, otherwise 영화목록 요청
    ? `https://omdbapi.com?apikey=812fae45&i=${id}&plot=full`
    : `https://omdbapi.com?apikey=812fae45&s=${title}&page=${page}`
    // apiKey는 서버에만 담기고, 브라우저에는 노출되지 않는다.
  const res = await fetch(url)
  const json = await res.json()

  response
    .status(200)
    .json(json)
}