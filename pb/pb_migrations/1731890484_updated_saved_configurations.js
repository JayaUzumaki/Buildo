/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1hoq3se4c171jia")

  // remove
  collection.schema.removeField("j3wael35")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1hoq3se4c171jia")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "j3wael35",
    "name": "build_id",
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
})
