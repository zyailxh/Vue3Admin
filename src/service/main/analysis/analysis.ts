import lzRequest from '@/service'

export function getAmountListData() {
  return lzRequest.get({
    url: '/goods/amount/list'
  })
}

export function getGoodsCategoryCount() {
  return lzRequest.get({
    url: '/goods/category/count'
  })
}

export function getGoodsCategorySale() {
  return lzRequest.get({
    url: '/goods/category/sale'
  })
}

export function getGoodsCategoryFavor() {
  return lzRequest.get({
    url: '/goods/category/favor'
  })
}

export function getGoodsAddressSale() {
  return lzRequest.get({
    url: '/goods/address/sale'
  })
}
