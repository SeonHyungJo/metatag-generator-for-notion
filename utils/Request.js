const createRequestData = (COLLECTION_ID, COLLECTION_VIEW_ID) => {
  return JSON.stringify({
    collectionId: COLLECTION_ID,
    collectionViewId: COLLECTION_VIEW_ID,
    query: { aggregations: [{ property: "title", aggregator: "count" }] },
    loader: {
      type: "table",
      limit: 70,
      searchQuery: "",
      userTimeZone: "Asia/Seoul",
      userLocale: "en",
      loadContentCover: true,
    },
  })
}

exports.createRequestConfig = (COLLECTION_ID, COLLECTION_VIEW_ID, COOKIE) => {
  return {
    method: "post",
    url: "https://www.notion.so/api/v3/queryCollection",
    headers: {
      "Content-Type": "application/json",
      Cookie: COOKIE,
    },
    data: createRequestData(COLLECTION_ID, COLLECTION_VIEW_ID),
  };
}