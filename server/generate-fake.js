const faker = require("faker");
const fs = require("fs");

const userCnt = 10;
const adminCnt = 3;
const articleCnt = 20;

const data = {
  users: [
    {
      id: "top-admin",
      name: "daniel",
      password: "1234",
      email: "top-admin@email.com",
      permission: "admin",
    },
  ],
  articles: [],
};

const makeUser = ({ permission }) => ({
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  permission,
});

for (let i = 0; i < userCnt; i++) {
  data.users.push(makeUser({ permission: "user" }));
}

for (let i = 0; i < adminCnt; i++) {
  data.users.push(makeUser({ permission: "admin" }));
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

for (let i = 0; i < articleCnt; i++) {
  data.articles.push({
    id: faker.datatype.uuid(),
    authorId: pick(data.users).id,
    title: faker.lorem.words(5),
    content: faker.lorem.paragraphs(3, "\n-----\n"),
    dateCreated: faker.datatype.datetime(),
  });
}

fs.writeFile(
  "./server/data.json",
  JSON.stringify(data, null, 2),
  function (err) {
    if (err) return console.log(err);
    console.log("file successfully written");
  }
);
