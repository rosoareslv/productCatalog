db = db.getSiblingDB('dbko_db');

db.createUser({
  user: "dbko_master",
  pwd: "123qwe",
  roles: [
    {
      role: "readWrite",
      db: "dbOwner"
    }
  ]
});