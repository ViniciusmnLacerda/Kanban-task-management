const invalidEmailInput = {
  email: "invalid@email.com",
  password: "MyPassword",
}

const invalidPassowrdlInput = {
  email: "vinicius@email.com",
  password: "invalid",
}

const validLoginInput = {
  email: "vinicius@email.com",
  password: "MyPassword",
}

const user = {
  email: "vinicius@email.com",
  passoword: "$2a$10$dun3xUEzvxq.Gz5kJUrw/el7os8EuLVsu/odPALS1y.CNI7HcXAui",
  id: 1,
}

const inputWithoutEmail = {
  password: "MyPassword",
}

const inputWithoutPassword = {
  email: "vinicius@email.com",
}

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZpbmljaXVzQGVtYWlsLmNvbSIsImlhdCI6MTY3NjMwNTgwNSwiZXhwIjoxNjc2MzkyMjA1fQ.Q1bKqnsdSSkEU_QBRjPc4GVdYWrKZ4EkmK7_3H0OAlg"
//remember this token will be expires

const loginOutput = {
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZpbmljaXVzQGVtYWlsLmNvbSIsImlhdCI6MTY3NjMwNTgwNSwiZXhwIjoxNjc2MzkyMjA1fQ.Q1bKqnsdSSkEU_QBRjPc4GVdYWrKZ4EkmK7_3H0OAlg",
  id: 1,
}

export {
  invalidEmailInput,
  invalidPassowrdlInput,
  validLoginInput,
  user,
  token,
  inputWithoutEmail,
  inputWithoutPassword,
  loginOutput,
}

