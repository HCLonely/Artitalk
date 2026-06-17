atEvery.prototype.beginUpload = function (file) {
  function Show () {
    fadeIn('shade')
    fadeIn('shuoshuo-modal')
  }
  const currentUser = ArtitalkData.currentUser()
  if (currentUser) {
    // console.log(currentUser);
  } else {
    // document.getElementById('logw').innerHTML= "<center><pre><code>" + text15 + "</code></pre></center>";
    Show()
    return
  }
  if (!/\.(jpg|gif|jpeg|ico|png|svg|mp4|mov)$/.test(file.name)) {
    alert('不支持的文件类型，支持的文件格式有jpg|gif|jpeg|ico|png|svg|mp4|mov')
    return
  }
  let fileType = ''
  const sourceSize = (file.size / 1024).toFixed(0)
  const sourceSizeLimit = 1024 * 50
  if (sourceSize > sourceSizeLimit) {
    alert('资源上传最大限制为50M')
    return
  }
  if (/\.(jpg|gif|jpeg|ico|png|svg)$/.test(file.name)) {
    fileType = 'image'
  } else if (/\.(mp4|mov)$/.test(file.name)) {
    fileType = 'video'
  }
  function fadeIn (id) {
    ArtitalkDom.show(id)
  }
  function fadeOut (id) {
    ArtitalkDom.hide(id)
  }
  fadeIn('lazy')
  const data = new FormData()
  data.append('image', file)
  const xhr = new XMLHttpRequest()
  xhr.withCredentials = false
  xhr.addEventListener('readystatechange', function () {
    if (this.readyState === 4 && this.status === 200) {
      const sourceUrl = eval('(' + this.responseText + ')')
      // let Md = "![]("+imgUrl.data.url+")";
      let sourceMd = ''
      // insertEmoji(imgMd);
      if (fileType === 'video') {
        sourceMd = '<video controls width="100%" height="auto"><source src="' + sourceUrl.data.url + '"></video>'
      } else if (fileType === 'image') {
        sourceMd = '![](' + sourceUrl.data.url + ')'
      }
      insertEmoji(sourceMd)
      document.getElementById('pubShuo').click()
      fadeOut('lazy')
    } else if (this.readyState === 4 && this.status === 500) {
      fadeOut('lazy')
    }
  })
  xhr.open('POST', 'https://7bu.top/api/upload')
  const imgToken = ArtitalkData.currentUser().attributes.imgToken
  if (imgToken !== undefined) {
    xhr.setRequestHeader('Authorization', 'Basic VGVzdDoxMjM0NTY=')
    xhr.setRequestHeader('token', imgToken)
  }
  xhr.send(data)
}
