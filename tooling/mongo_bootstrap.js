db = db.getSiblingDB('marquepage');

db.createCollection('logs');
db.createCollection('usage');
db.createCollection('binder');

db.createUser({
    user: 'mongo_basic_user',
    pwd: 'mongo_basic_password',
    roles: [{
      role: 'readWrite',
      db: 'marquepage'
    }]
});

db.logs.createIndex(
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