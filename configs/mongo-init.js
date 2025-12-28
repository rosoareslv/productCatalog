const db = db.getSiblingDB("catalogDB");

db.createUser({
  user: "master",
  pwd: "123qwe",
  roles: [
    {
      role: "dbOwner",
      db: "catalogDB",
    },
  ],
});

db.createUser({
  user: "catalogDatabaseApi",
  pwd: "qwe123",
  roles: [
    {
      role: "readWrite",
      db: "catalogDB",
    },
  ],
});
