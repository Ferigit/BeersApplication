import db from "../../src/dataBase";

export const getDBTagValue = (tableName, key, value) => {
  return db
    .table(tableName)
    .where(key)
    .equals(value)
    .toArray();
};
