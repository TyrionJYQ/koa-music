const Http = {}
Http.config = {
  // methods: {
  //   POST: 'POST',
  //   DELETE: 'DELETE',
  //   PUT: 'PUT',
  //   GET: 'GET'
  // },
  // dataType: {
  //   default: 'json'
  // },
  defaultConfig: {
    dataType: 'json',
    methods: {
      POST: 'POST',
      DELETE: 'DELETE',
      PUT: 'PUT',
      GET: 'GET'
    },
  },
  urls: {
    checkUsername: '/user/checkUsername',
    doRegister: '/user/doRegister',
    login: '/user/login'
  }
}
Http.request = function (requsetData,success, failed) {
  const {defaultConfig} = Http.config;
  config = {
    type: requsetData.type || defaultConfig.methods.POST,
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
    failed: function(e) {
      console.log(e)
    }
  })
}