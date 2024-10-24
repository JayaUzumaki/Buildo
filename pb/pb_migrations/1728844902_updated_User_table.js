/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1z44hxewpcibvrb")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ha8x1ahg",
    "name": "email",
    "type": "email",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "exceptDomains": [],
      "onlyDomains": []
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mcofyuev",
    "name": "Role",
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
  const collection = dao.findCollectionByNameOrId("1z44hxewpcibvrb")

  // remove
  collection.schema.removeField("ha8x1ahg")

  // remove
  collection.schema.removeField("mcofyuev")

  return dao.saveCollection(collection)
})
