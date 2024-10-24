/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("s6e4cir9hnp5rbx")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ztdmozhi",
    "name": "username",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("s6e4cir9hnp5rbx")

  // remove
  collection.schema.removeField("ztdmozhi")

  return dao.saveCollection(collection)
})
