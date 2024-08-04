db = db.getSiblingDB('marquepage');

db.createCollection('forest');
db.createCollection('usage');
db.createCollection('binder');
db.createCollection('bookmark');

db.createUser({
    user: 'mongo_basic_user',
    pwd: 'mongo_basic_password',
    roles: [{
      role: 'readWrite',
      db: 'marquepage'
    }]
});

db.forest.createIndex(
  { 'expiresAt': 1 },
  { expireAfterSeconds: 0 }
);

db.usage.createIndex(
  { 'expiresAt': 1 },
  { expireAfterSeconds: 0 }
);

db.usage.createIndex(
  { 'ipAddress': 1 }
);

db.bookmark.createIndex(
  { 'lastAccessed': 1 },
  { expireAfterSeconds: 21*86400 }
);