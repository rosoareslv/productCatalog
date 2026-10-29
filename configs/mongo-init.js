const db = db.getSiblingDB("catalogDB");

db.createUser({
  user: process.env.MONGO_OWNER_USER,
  pwd: process.env.MONGO_OWNER_PASSWORD,
  roles: [
    {
      role: "dbOwner",
      db: "catalogDB",
    },
  ],
});

db.createUser({
  user: process.env.MONGO_API_USER,
  pwd: process.env.MONGO_API_PASSWORD,
  roles: [
    {
      role: "readWrite",
      db: "catalogDB",
    },
  ],
});
