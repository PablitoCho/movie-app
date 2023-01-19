//vercel 서비스가 자신의 서비스 안에서 별도의 컴퓨팅 서버를 제공.
// 추가로 그 서버를 직접 만들지 않았지만, 서버를 구성하지 않고도 서버에 있는 내용을 동작시킬 수 있는 함수를 작성할 수 있다. > 서버리스 함수
// > 우리는 별도로 서버를 구축하지 않아도, API가 동작하는 서버 내용을 함수로만 관리하면 된다.
// vercel의 serverless 함수를 만들어, 우리 프로젝트에 작은 (컴퓨팅) 서버를 붙여준 것

// 서버리스(serverless)함수란, 컴퓨팅 서버를 직접 구축하거나 관리하지 않고도,
// 그 기능을 함수 단위로 작성해서 바로 사용할 수 있는 하나의 기능이자 서비스입니다.

// serverless 함수는 vercel package가 동작하는 node.js에서 동작(브라우저에서 동작하지 않음)
// node.js는 fetch 함수가 없다 -> node-fetch package 설치
import fetch from "node-fetch"

const { APIKEY } = process.env

export default async function handler(request, response) {
  const { title, page, id } = JSON.parse(request.body)
  const url = id // id가 있으면 상세정보 요청, otherwise 영화목록 요청
    ? `https://omdbapi.com?apikey=${APIKEY}&i=${id}&plot=full`
    : `https://omdbapi.com?apikey=${APIKEY}&s=${title}&page=${page}`
  const res = await fetch(url)
  const json = await res.json()

  response
    .status(200)
    .json(json)
}