import useAxios from './useAxios'


export function getCategory() {
  return useAxios({
    url: '/category'
  })
}

export function getSubcategory(maitKey) {
  return useAxios({
    url: '/subcategory',
    params: {
      maitKey
    }
  })
}

export function getCategoryDetail(miniWallkey, type) {
  return useAxios({
    url: '/subcategory/detail',
    params: {
      miniWallkey,
      type
    }
  })
}
