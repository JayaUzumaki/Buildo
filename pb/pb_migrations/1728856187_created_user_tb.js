/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "zx1efw5gc4cauxk",
    "created": "2024-10-13 21:49:47.918Z",
    "updated": "2024-10-13 21:49:47.918Z",
    "name": "user_tb",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "susbkwf4",
        "name": "user_id",
        "type": "number",
        "required": true,
        "presentable": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": true
        }
      },
      {
        "system": false,
        "id": "ctct4nyp",
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
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("zx1efw5gc4cauxk");

  return dao.deleteCollection(collection);
})
