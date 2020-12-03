const axios = require('axios')
const config = require('config')

const fetchOneItem = async (id) => {
  try {
    return await axios.get(
      `${config.get('baseURL')}/item/${id}.json?print=pretty`
    )
  } catch (e) {
    console.log(e.message)
  }
}

const fetchItems = (ids) => ids.map((id) => fetchOneItem(id))

const collectorItems = async (promises) => {
  try {
    const collection = []
    for await (const promise of promises) {
      const data = promise.data
      if (collection) {
        collection.push(data)
      }
    }
    return collection
  } catch (e) {
    throw new Error(e)
  }
}

const recursCollectorComments = async (ids, comments) => {
  const promises = fetchItems(ids)
  for await (const promise of promises) {
    comments.push(promise.data)
    if (promise.data.kids) {
      await recursCollectorComments(promise.data.kids, comments)
    }
  }
  return comments
}

module.exports = {
  fetchOneItem,
  fetchItems,
  collectorItems,
  recursCollectorComments,
}
