/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("s6e4cir9hnp5rbx")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qtnkrfmd",
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("s6e4cir9hnp5rbx")

  // remove
  collection.schema.removeField("qtnkrfmd")

  return dao.saveCollection(collection)
})
