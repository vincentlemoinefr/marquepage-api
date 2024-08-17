#!/bin/bash

mongoimport \
  --db='marquepage' \
  --collection='bookmark' \
  --jsonArray \
  --file='/docker-entrypoint-initdb.d/mongo_fake_bookmark_no_id.json' \
  --username='test' \
  --password='azerty123' \
  --authenticationDatabase=admin