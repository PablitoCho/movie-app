//vercel 서비스가 자신의 서비스 안에서 별도의 컴퓨팅 서버를 제공.
// 추가로 그 서버를 직접 만들지 않았지만, 서버를 구성하지 않고도 서버에 있는 내용을 동작시킬 수 있는 함수를 작성할 수 있다. > 서버리스 함수
// > 우리는 별도로 서버를 구축하지 않아도, API가 동작하는 서버 내용을 함수로만 관리하면 된다.

// 서버리스(serverless)함수란, 컴퓨팅 서버를 직접 구축하거나 관리하지 않고도,
// 그 기능을 함수 단위로 작성해서 바로 사용할 수 있는 하나의 기능이자 서비스입니다.
export default function handler(request, response) {
  response.status(200).json({
    name : 'Heropy',
    age: 85,
    isValid : true
  })
}