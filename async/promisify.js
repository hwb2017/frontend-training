// 将微信小程序请求promise化
const wxRequest = (url, data = {}, method = 'GET') =>
  new Promise((resolve, reject) => {
      wx.request({
          url,
          data,
          method,
          header: {
              // 通用化header设置
          },
          succuess: function (res) {
              const code = res.statusCode
              if (code !== 200) {
                  reject({error: 'request fail', code})
                  return
              }
              resolve(res.data)
          },
          fail: function (res) {
              reject({ error: 'request fail'})
          },
      })
  })