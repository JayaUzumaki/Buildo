/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("lfk4zvrgwwm1r7a");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "lfk4zvrgwwm1r7a",
    "created": "2024-10-13 21:50:30.352Z",
    "updated": "2024-10-13 21:50:30.352Z",
    "name": "forum",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "mnnlkt98",
        "name": "forum_id",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
        }
      },
      {
        "system": false,
        "id": "bl4usfyv",
        "name": "name",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "zx1efw5gc4cauxk",
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
