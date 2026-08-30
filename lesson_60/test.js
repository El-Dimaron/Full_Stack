console.log("test");

const users = [
  {
    id: 1,
    login: "tony_stark",
    password: "IronMan3000",
  },
  {
    id: 2,
    login: "bruce_wayne",
    password: "DarkKnight42",
  },
  {
    id: 3,
    login: "peter_parker",
    password: "WebSlinger99",
  },
  {
    id: 4,
    login: "clark_kent",
    password: "Krypton123",
  },
  {
    id: 5,
    login: "deadpool",
    password: "Chimichanga7",
  },
  {
    id: 6,
    login: "rick_sanchez",
    password: "PortalGunC137",
  },
  {
    id: 7,
    login: "morty_smith",
    password: "AwGeezMorty1",
  },
  {
    id: 8,
    login: "homer_simpson",
    password: "DonutLover88",
  },
  {
    id: 9,
    login: "bart_simpson",
    password: "EatMyShorts",
  },
  {
    id: 10,
    login: "eric_cartman",
    password: "RespectMyAuthoritah",
  },
  {
    id: 11,
    login: "shrek",
    password: "SwampKing123",
  },
  {
    id: 12,
    login: "donkey",
    password: "WafflesForever",
  },
  {
    id: 13,
    login: "po_kungfu",
    password: "DragonWarrior9",
  },
  {
    id: 14,
    login: "toothless",
    password: "NightFury01",
  },
  {
    id: 15,
    login: "buzz_lightyear",
    password: "InfinityBeyond",
  },
  {
    id: 16,
    login: "woody_sheriff",
    password: "TheresASnake",
  },
  {
    id: 17,
    login: "lightning_mcqueen",
    password: "KaChow95",
  },
  {
    id: 18,
    login: "gru",
    password: "MinionsRule44",
  },
  {
    id: 19,
    login: "vector",
    password: "DirectionMagnitude",
  },
  {
    id: 20,
    login: "wall_e",
    password: "PlantFound700",
  },
  {
    id: 21,
    login: "harry_potter",
    password: "Expelliarmus7",
  },
  {
    id: 22,
    login: "hermione_granger",
    password: "BooksAndCleverness",
  },
  {
    id: 23,
    login: "ron_weasley",
    password: "ChessMaster99",
  },
  {
    id: 24,
    login: "albus_dumbledore",
    password: "LemonDrop123",
  },
  {
    id: 25,
    login: "voldemort",
    password: "NoNose777",
  },
  {
    id: 26,
    login: "frodo_baggins",
    password: "OneRingToRule",
  },
  {
    id: 27,
    login: "gandalf",
    password: "YouShallNotPass",
  },
  {
    id: 28,
    login: "aragorn",
    password: "KingOfGondor",
  },
  {
    id: 29,
    login: "legolas",
    password: "ElfArcher88",
  },
  {
    id: 30,
    login: "gimli",
    password: "AndMyAxe123",
  },
  {
    id: 31,
    login: "john_wick",
    password: "BabaYaga99",
  },
  {
    id: 32,
    login: "neo",
    password: "RedPillMatrix",
  },
  {
    id: 33,
    login: "terminator",
    password: "IllBeBack101",
  },
  {
    id: 34,
    login: "jack_sparrow",
    password: "RumIsGone44",
  },
  {
    id: 35,
    login: "darth_vader",
    password: "DarkSide1977",
  },
  {
    id: 36,
    login: "luke_skywalker",
    password: "TwinSuns77",
  },
  {
    id: 37,
    login: "obi_wan",
    password: "HelloThere66",
  },
  {
    id: 38,
    login: "yoda",
    password: "DoOrDoNot900",
  },
  {
    id: 39,
    login: "geralt_rivia",
    password: "TossACoin88",
  },
  {
    id: 40,
    login: "kratos",
    password: "Boy123456",
  },
];

// const currentId = Number.parseInt(users.at(-1).id) + 1;

export function findUser(id, index = false) {
  //   const users = readUsers();

  //   console.log(id);

  const userIndex = users.findIndex((user) => user.id === id);

  //   if (userIndex === -1) {
  //     throw new Error("User not found");
  //   }

  const user = users[userIndex];

  if (!index) {
    return user;
  }

  return {
    user,
    index: userIndex,
  };
}

console.log(findUser(40));
console.log(findUser(41));

function deleteUser(id) {
  const { index } = findUser(id, true);

  //   const users = readUsers();
  users.splice(index, 1);
  return 200;
  //   console.log("index:", index);
}

console.log(deleteUser(1));

const testArray = [];

console.log(testArray.at(-1));

const lastUser = testArray.at(-1);
const currentId = lastUser ? Number.parseInt(lastUser.id) + 1 : 1;
console.log(currentId);
