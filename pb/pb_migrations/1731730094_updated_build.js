/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m8hzcznscgneeag")

  // remove
  collection.schema.removeField("yvyqhnro")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "azhzz3vm",
    "name": "image",
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
  const collection = dao.findCollectionByNameOrId("m8hzcznscgneeag")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yvyqhnro",
    "name": "image",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [],
      "thumbs": [],
      "maxSelect": 1,
      "maxSize": 5242880,
      "protected": false
    }
  }))

  // remove
  collection.schema.removeField("azhzz3vm")

  return dao.saveCollection(collection)
})
