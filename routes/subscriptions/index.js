const Router = require("koa-router");
const faker = require('faker');
faker.locale = "ru";
const messages = [
  {
    "id": "1",
    "from": "anya@ivanova",
    "subject": "Hello from Anya",
    "body": "Long message body here",
    "received": 1553108200
  },
  {
    "id": "2",
    "from": "alex@petrov",
    "subject": "Hello from Alex Petrov!",
    "body": "Long message body here",
    "received": 1553107200
  },
  {
    "id": "3",
    "from": "alex@petrov",
    "subject": "Hello",
    "body": "Long message body here",
    "received": 1553107200
  }
];
let newMessages = [];

const router = new Router();

router.get("/messages/unread", async (ctx) => {
  const obj = {messages: messages}
  const response = JSON.stringify(obj);
  ctx.response.body = response;
});

router.get("/new_messages/unread", async (ctx) => {
  if(newMessages.length > 0) {
    const obj = {"status": 200, messages: newMessages}
    const response = JSON.stringify(obj);
    ctx.response.body = response;

    newMessages.forEach((newMessage) => messages.push(newMessage));
    newMessages = [];
    console.log(obj )

    return
  }
  generatorMessage();
  ctx.response.body = JSON.stringify({"status": 204});
});

function generatorMessage() {
  let text = faker.lorem.text();
  newMessages.push(
  {
    "id": faker.internet.ip(),
    "from": faker.internet.email(),
    "subject": text,
    "body": text,
    "received": 1553108200
  }
  ) 
  console.log('newMessages', newMessages)
}

module.exports = router;
