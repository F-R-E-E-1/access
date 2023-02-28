import request from '@/utils/request'

export default {
  getUserList(searchModel) {
    return request({
      url: '/user/list',
      method: 'get',
      params: {
        pageNo: searchModel.pageNo,
        pageSize: searchModel.pageSize,
        username: searchModel.username,
        phone: searchModel.phone
      }
    })
  },
  addUser(user) {
    return request({
      url: '/user',
      method: 'post',
      data: user
    })
  },
  getUserById(id) {
    return request({
      // url: '/user/' + id,
      url: `/user/${id}`,
      method: 'get'
    })
  },
  saveUser(user) {
    if (user.id == null || user.id == undefined) {
      // 不满足就是新增
      return this.addUser(user)
    } else {
      return this.updateUser(user)
    }
  },
  updateUser(user) {
    return request({
      url: '/user',
      method: 'put',
      data: user
    })
  }
}
