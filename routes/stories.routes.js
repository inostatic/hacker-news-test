const axios = require('axios')
const { Router } = require('express')
const config = require('config')
const {
  fetchOneItem,
  fetchItems,
  collectorItems,
  recursCollectorComments,
} = require('../utils/utils')
const router = Router()

router.get('/stories', async (req, res) => {
  try {
    const response = await axios.get(
      `${config.get(
        'baseURL'
      )}/newstories.json?print=pretty&orderBy="$key"&limitToFirst=100`
    )
    if (response) {
      const ids = response.data
      const promises = fetchItems(ids)
      const stories = await collectorItems(promises)
      res.json(stories)
    }
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.get('/stories/:id', async (req, res) => {
  try {
    const id = req.params.id
    const response = await fetchOneItem(id)
    if (response) {
      const story = response.data
      res.json(story)
    }
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.post('/comments', async (req, res) => {
  try {
    const { kids } = req.body
    let comments = []
    if (kids) {
      const promises = fetchItems(kids)
      if (promises) {
        comments = await collectorItems(promises)
        res.json(comments)
      }
    }
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.post('/comments/more', async (req, res) => {
  try {
    const { kids } = req.body
    const comments = await recursCollectorComments(kids, [])
    if (comments) {
      res.json(comments)
    }
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

module.exports = router
