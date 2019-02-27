const Http = {}
Http.config = {
  defaultConfig: {
    dataType: 'json',
  },
  urls: {
    checkUsername: '/user/checkUsername',
    doRegister: '/user/doRegister',
    login: '/user/login',
    doLogin: '/user/doLogin',
    deleteMusic: '/music/deleteMusic'
  }
}
Http.post = function (requsetData, success, failed) {
  const { defaultConfig } = Http.config;
  config = {
    type: 'post',
    url: Http.config.urls[requsetData.url],
    data: requsetData.data,
    dataType: requsetData.dataType || defaultConfig.dataType
  }
  $.ajax({
    type: config.type,
    url: config.url,
    data: config.data,
    dataType: config.dataType,
    success: success,
    failed: function (e) {
      console.log(e)
    }
  })
}
// DELETE请求
Http.deleteReq = function(url, success, fail) {
  $.ajax({
    type: 'DELETE',
    url: url,
    success: success,
    fail: fail
  })
}