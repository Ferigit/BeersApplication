import Dexie from "dexie";

const db = new Dexie("ShoppDB");
db.version(1).stores({
  transactions:
    "myIndex, action, amount, description, globalId, id, lastUpdated, lastUpdatedBy, online, order,type, wallet",
  parameters: "key, value",
  allTransactions:
    "myIndex ,action, amount, description, globalId, id, lastUpdated, lastUpdatedBy, online, order,type, wallet",
  carTypes: "myIndex, id, name, code, enabled",
  metroTickets:
    "myIndex, base64, buyDate, expireDate, expireDateEn, id, paymentId, serialNo, statusId, voucher"
});
db.open()
  .then(function() {
    console.log("ShoppDB opend!");
  })
  .catch(function() {
    console.log("ShoppDB opend!");
  });

export default db;
