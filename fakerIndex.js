let faker = require ('faker');

module.exports = () => {
  let i = 0,
    len = 10,
    data = {
      people: [],
    },
    fn,
    ln;

  for (; i < len; i++) {
    fn = faker.name.firstName ();
    ln = faker.name.lastName ();
    data.people.push ({
      id: fn + ln,
      firstName: fn,
      lastName: ln,
      username: faker.internet.userName (),
      catchPhrase: faker.company.catchPhrase (),
      avatar: faker.image.avatar (),
    });
  }

  return data;
};
