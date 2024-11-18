/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "qzr3awd32k7lg4s",
    "created": "2024-11-13 23:35:30.880Z",
    "updated": "2024-11-13 23:35:30.880Z",
    "name": "compatibility",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "whadmiw8",
        "name": "component_id1",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "0alx16pubju1uwz",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "zltmdrxn",
        "name": "component_id2",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "0alx16pubju1uwz",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "hrsv9zjz",
        "name": "is_compatible",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
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
  const collection = dao.findCollectionByNameOrId("qzr3awd32k7lg4s");

  return dao.deleteCollection(collection);
})
