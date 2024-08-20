#!/bin/bash

mongoimport \
  --db='marquepage' \
  --collection='binder' \
  --jsonArray \
  --file='/docker-entrypoint-initdb.d/mongo_fake_bookmark.json' \
  --username='test' \
  --password='azerty123' \
  --authenticationDatabase=admin