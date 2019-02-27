const Http = {}
Http.config = {
  defaultConfig: {
    dataType: 'json',
    // 不需要设置该默认头=> enctype:"multipart/formdata"
    contentType: false,
    // 不需要转换请求体数据成键值对
    processData: false,
  },
  urls: {
    checkUsername: '/user/checkUsername',
    doRegister: '/user/doRegister',
    login: '/user/login',
    doLogin: '/user/doLogin',
    deleteMusic: '/music/deleteMusic',
    addMusic: '/music/addMusic',
    updateMusic: '/music/updateMusic'
  }
}
Http.post = function (requsetData, success, failed) {
  const { defaultConfig } = Http.config;
  config = {
    type: 'post',
    url: Http.config.urls[requsetData.url],
    data: requsetData.data,
    dataType: requsetData.dataType || defaultConfig.dataType,
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
// 上传文件请求
Http.upLoadFile = function(reqData, success, fail) {
  let config = {
    contentType: reqData.contentType || Http.config.defaultConfig.contentType,
    processData: reqData.processData || Http.config.defaultConfig.processData,
    data: reqData.data,
    url: reqData.url,
  }
  $.ajax({
    type: 'post',
    contentType: config.contentType,
    processData: config.processData,
    data: config.data,
    url: Http.config.urls[config.url],
    success: success,
    fail: fail

  })
}