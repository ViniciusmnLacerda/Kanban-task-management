const accountOutput = {
  id: 1,
  userId: 1,
  name: "Vinicius",
  lastName: "Lacerda",
  image: null
}

const tokenVerifyOutput = {
  userId: 1,
  email: 'vinicius@email.com',
  iat: 1676397141,
  exp: 1676483541
}

const invalidToken = 'invalidtoken'

const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoidmluaWNpdXNAZW1haWwuY29tIiwiaWF0IjoxNjc2Mzk3MTQxLCJleHAiOjE2NzY0ODM1NDF9.9TTQK0x5G3AQpMUNmEBlqNyTYheXsIDFMccPOzEuJps'

export { accountOutput, tokenVerifyOutput, invalidToken, validToken };
