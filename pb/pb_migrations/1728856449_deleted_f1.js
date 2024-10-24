/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("6nmvumahrtql9v3");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "6nmvumahrtql9v3",
    "created": "2024-10-13 21:52:58.021Z",
    "updated": "2024-10-13 21:52:58.021Z",
    "name": "f1",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "qevlbj8l",
        "name": "name",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "u5z6ugct",
        "name": "user_id",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
