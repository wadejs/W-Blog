import axios from '../../plugins/axios'
let baseUrl = '/'

function getArticleDetail(options) {
  return axios.post(baseUrl + 'c/getArticleDetail', options)
}

function getArticleList(options) {
  return axios.get(baseUrl + 'c/getArticleList', options)
}

function searchByCategory(options) {
  return axios.get(baseUrl + 'c/searchByCategory', options)
}

function searchByTag(options) {
  return axios.get(baseUrl + 'c/searchByTag', options)
}

function getTagsAndCategories(options) {
  return axios.get(baseUrl + 'c/getTagsAndCategories', options)
}

export {
  getArticleDetail,
  getArticleList,
  searchByCategory,
  searchByTag,
  getTagsAndCategories
}
