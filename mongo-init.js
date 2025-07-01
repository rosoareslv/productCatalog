const db = db.getSiblingDB('catalogDB');

db.createUser({
  user: "master",
  pwd: "123qwe",
  roles: [
    {
      role: "dbOwner",
      db: "catalogDB"
    }
  ]
});

db.createCollection('users');
db.createCollection('products');
db.createCollection('categories');