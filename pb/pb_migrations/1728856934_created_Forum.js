/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "jzaul2m0wos01w7",
    "created": "2024-10-13 22:02:14.970Z",
    "updated": "2024-10-13 22:02:14.970Z",
    "name": "Forum",
    "type": "view",
    "system": false,
    "schema": [],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT id from users\n"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("jzaul2m0wos01w7");

  return dao.deleteCollection(collection);
})
