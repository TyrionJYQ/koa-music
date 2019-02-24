const Http = {}
Http.config = {
  methods: {
    POST: 'POST',
    DELETE: 'DELETE',
    PUT: 'PUT',
    GET: 'GET'
  },
  dataType: {
    default: 'json'
  },
  urls: {
    checkUsername: '/user/checkUsername'
  }
}
Http.request = function (url, data, reqMethod, dataType, success, failed) {
  $.ajax({
    type: reqMethod,
    url: url,
    data: data,
    dataType: dataType,
    success: success,
    failed: function(e) {
      console.log(e)
    }
  })
}