const axios = require("axios");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const { COLLECTION_ID, COLLECTION_VIEW_ID, COOKIE } = process.env;
const { createRequestConfig } = require("./utils/Request.js")
const { createMetaElement } = require("./utils/Element.js")

const createFile = (fileName, strElement) => {
  fs.writeFile(path.join(__dirname, fileName), strElement, function (err) {
    console.log(err === null ? 'Create Meta file success' : 'fail')
  });
}

axios(createRequestConfig(COLLECTION_ID, COLLECTION_VIEW_ID, COOKIE))
  .then(({data: {result, recordMap}}) => {
    const blockIds = result.blockIds;
    const blocks = recordMap.block;
    const collection = recordMap.collection;
    const collectionView = recordMap.collection_view;

    const properties = collectionView[COLLECTION_VIEW_ID].value.format.table_properties;
    const schema = collection[COLLECTION_ID].value.schema;
    const collectionColList = properties.map((item) => item.property);
    const collectionColName = collectionColList.reduce((acc, item) => {
      if (schema[item]) {
        acc[schema[item].name] = item;
      }
      return acc;
    }, {});
    const collectionRow = blockIds.map((blockId) => ({
      id: blockId,
      properties: blocks[blockId].value.properties,
    }));
    
    console.log("collectionColList", collectionColList);
    console.log("collectionColName", collectionColName);

    createFile('meta.html', createMetaElement(collectionRow, collectionColList))
  })
  .catch(function (error) {
    console.log(error);
  });
