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
  {
    accountId: 4,
    name: "Igor",
    lastName: "Lacerda",
    image: null,
    admin: false
  }
]

const member: IMember = {
  accountId: 2,
  name: "Zita",
  lastName: "Lacerda",
  admin: false,
  image: null,
}

export { notMember, getMembersOutput, member };
