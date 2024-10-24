/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("sg5h71gpwivpgx2");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "sg5h71gpwivpgx2",
    "created": "2024-10-13 21:25:01.965Z",
    "updated": "2024-10-13 21:25:01.965Z",
    "name": "forum_table",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "cuqrebap",
        "name": "user_id",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": true,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "yneb4xuw",
        "name": "title",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": 250,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "sc6vppb9",
        "name": "desc",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
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
