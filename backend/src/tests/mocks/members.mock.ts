import { IMember } from "../../interfaces";

const notMember = [
  { accountId: 2, admin: true },
  { accountId: 3, admin: false },
  { accountId: 4, admin: false },
];

const getMembersOutput: IMember[] = [
  {
    accountId: 1,
    name: "Vinicius",
    lastName: "Lacerda",
    image: null,
    admin: true
  },
  {
    accountId: 2,
    name: "Zita",
    lastName: "Lacerda",
    image: null,
    admin: false
  },
  {
    accountId: 3,
    name: "Marianne",
    lastName: "Bragança",
    image: null,
    admin: false
  },
]

const membersThree: IMember[] = [
  {
    accountId: 1,
    name: "Vinicius",
    lastName: "Lacerda",
    image: null,
    admin: false
  },
  {
    accountId: 3,
    name: "Marianne",
    lastName: "Bragança",
    image: null,
    admin: false
  },
  {
    accountId: 4,
    name: "Igor",
    lastName: "Lacerda",
    image: null,
    admin: true
  }
]

const membersFour: IMember[] = [
  {
    accountId: 2,
    name: "Zita",
    lastName: "Lacerda",
    image: null,
    admin: true
  },
  {
    accountId: 3,
    name: "Marianne",
    lastName: "Bragança",
    image: null,
    admin: false
  },
  {
    accountId: 4,
    name: "Igor",
    lastName: "Lacerda",
    image: null,
    admin: true
  }
]


const member: IMember = {
  accountId: 2,
  name: "Zita",
  lastName: "Lacerda",
  admin: false,
  image: null,
}


const invalidNewMemberInput = {
  email: "invalid@email.com",
  admin: true,
}

const emailInUseNewMemberInput = {
  email: "marianne@email.com",
  admin: true,
}

const emailInUseOutput = {
  id: 2,
  email: "marianne@email.com",
  password: "$2a$10$dun3xUEzvxq.Gz5kJUrw/el7os8EuLVsu/odPALS1y.CNI7HcXAui"
}


const validNewMemberInputThree = {
  email: "zita@email.com",
  admin: true,
}

const validNewMemberInput = {
  email: "igor@email.com",
  admin: true,
}

const invalidInputs = [
  {
    email: 23156,
    password: 54123
  },
  {
    password: "MyPassword"
  },
  {
    email: "igor@email.com",
  }
]

const getMembersDatavalues = [
  {
    dataValues: {
      accountId: 1,
      name: "Vinicius",
      lastName: "Lacerda",
      image: null,
    }
  },
  {
    dataValues: {
      accountId: 2,
      name: "Zita",
      lastName: "Lacerda",
      image: null,
    }
  },
  {
    dataValues: {
      accountId: 3,
      name: "Marianne",
      lastName: "Bragança",
      image: null,
    },
  },
]

const userModelOutput = {
  id: 4,
  email: "igor@email.com",
  password: "$2a$10$dun3xUEzvxq.Gz5kJUrw/el7os8EuLVsu/odPALS1y.CNI7HcXAui"
}

const userHimself = {
  id: 1,
  email: "vinicius@email.com",
  password: "$2a$10$dun3xUEzvxq.Gz5kJUrw/el7os8EuLVsu/odPALS1y.CNI7HcXAui"
}

const createOutput = { 
  workspaceId: 1,
  accountId: 4,
  admin: true
}

export {
  notMember,
  getMembersOutput,
  member,
  membersThree,
  membersFour,
  invalidNewMemberInput,
  emailInUseNewMemberInput,
  emailInUseOutput,
  validNewMemberInputThree,
  validNewMemberInput,
  getMembersDatavalues,
  invalidInputs,
  userModelOutput,
  createOutput,
  userHimself,
};

