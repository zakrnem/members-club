#! /usr/bin/env node

console.log(
  'This script populates some test users and messages to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.mongodb.net/local?retryWrites=true&w=majority"',
);

const userArgs = process.argv.slice(2);

const User = require("./models/User");
const Message = require("./models/Message");
require("dotenv").config();

const users = [];
const messages = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@${process.env.URL}`;

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createUsers();
  await createMessages();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function userCreate(
  index,
  first_name,
  last_name,
  email,
  password,
  membership,
) {
  const user = new User({
    first_name: first_name,
    last_name: last_name,
    email: email,
    password: password,
    membership: membership,
  });
  await user.save();
  users[index] = user;
  console.log(`Added user: ${first_name} ${last_name}`);
}

async function messageCreate(index, user, messageText) {
  const message = new Message({
    user: user,
    message: messageText,
  });
  await message.save();
  messages[index] = message;
  console.log(`Added message: ${message} from ${user}`);
}

const hashedPasswords = [
  "$2a$10$Etei5xiCTip1DYrCnCUDkelw3rAK7fvM5zcpDcRW5azqcOduiQiwW",
  "$2a$10$soOirIl/otPgZi9MzfnkpOZJ1rFf9AD3suExxWp4jaeAuxxmAOgqa",
  "$2a$10$ZspFsKkReMbFN5HlZlxWuuLGqrJJRb1BtEPg6iTFfegcsjboyxgPu",
];

async function createUsers() {
  console.log("Adding users");
  await Promise.all([
    userCreate(
      0,
      "John",
      "Doe",
      "johndoe@email.com",
      hashedPasswords[0],
      "true",
    ),
    userCreate(
      1,
      "Shanon",
      "Carolls",
      "shanonc@email.com",
      hashedPasswords[1],
      "false",
    ),
    userCreate(
      2,
      "Carol",
      "Smith",
      "carols@mail.com",
      hashedPasswords[2],
      "admin",
    ),
    userCreate(
      3,
      "Ann",
      "Dock",
      "email@email.net",
      hashedPasswords[1],
      "false",
    ),
  ]);
}

async function createMessages() {
  console.log("Adding messages");
  await Promise.all([
    messageCreate(
      0,
      users[0],
      "The pursuit of knowledge is a lifelong journey filled with endless possibilities.",
    ),
    messageCreate(
      1,
      users[1],
      "Finding a needle in a haystack can be quite a challenge.",
    ),
    messageCreate(
      2,
      users[0],
      "Navigating rush hour traffic feels like trying to find a parking spot at a full shopping mall on a Saturday afternoon.",
    ),
    messageCreate(
      3,
      users[2],
      "Trying to quiet a room full of excited kids is akin to herding cats at times.",
    ),
    messageCreate(
      4,
      users[0],
      "Managing a project with ever-changing requirements is akin to painting on a canvas during a windy day.",
    ),
    messageCreate(
      5,
      users[2],
      "Trying to organize a chaotic closet feels like solving a Rubik's Cube blindfolded.",
    ),
    messageCreate(
      6,
      users[2],
      "Watching a baseball match without knowing the rules is like attending a theater performance in a foreign language.",
    ),
    messageCreate(
      7,
      users[3],
      "Learning a new language from scratch can feel like deciphering an intricate code without a key.",
    ),
  ]);
}
