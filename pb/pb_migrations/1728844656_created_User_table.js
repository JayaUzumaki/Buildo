/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "1z44hxewpcibvrb",
    "created": "2024-10-13 18:37:36.591Z",
    "updated": "2024-10-13 18:37:36.591Z",
    "name": "User_table",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "totdq3s8",
        "name": "username",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX `idx_UC1Jjqg` ON `User_table` (`username`)"
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("1z44hxewpcibvrb");

  return dao.deleteCollection(collection);
})
