// Just an example we won't use MySQL
export default function adapterMySQL({ mysqlClient }) {
  const adapter = {};

  adapter.dbCreate = async function dbCreate(data) { };

  adapter.dbRead = async function dbRead(id) { };

  adapter.dbReadAll = async function dbReadAll(token) { };

  adapter.dbUpdate = async function dbUpdate(id, data) { };

  adapter.dbDelete = async function dbDelete(id) { };

  return adapter;
};

