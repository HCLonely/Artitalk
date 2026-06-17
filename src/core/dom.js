'use strict'

const ArtitalkDom = {
  byId: function (id) {
    return document.getElementById(id)
  },
  show: function (id) {
    const ele = this.byId(id)
    if (!ele) return
    ele.style.display = ''
  },
  hide: function (id) {
    const ele = this.byId(id)
    if (!ele) return
    ele.style.display = 'none'
  },
  setHtml: function (id, html) {
    const ele = this.byId(id)
    if (!ele) return
    ele.innerHTML = html
  },
  html: function (id) {
    const ele = this.byId(id)
    return ele ? ele.innerHTML : ''
  },
  setValue: function (id, value) {
    const ele = this.byId(id)
    if (!ele) return
    ele.value = value
  },
  value: function (id) {
    const ele = this.byId(id)
    return ele ? ele.value : ''
  },
  appendToBody: function (ele) {
    document.body.appendChild(ele)
  },
  appendToHead: function (ele) {
    document.head.appendChild(ele)
  },
  loadScript: function (src, onload) {
    const script = document.createElement('script')
    script.setAttribute('type', 'text/javascript')
    script.src = src
    this.appendToBody(script)
    if (window.ActiveXObject || 'ActiveXObject' in window) {
      if (script.readyState) {
        script.onreadystatechange = function () {
          if (this.readyState === 'loaded' || this.readyState === 'complete') {
            onload()
          }
        }
      } else {
        script.onload = onload
      }
    } else {
      script.onload = onload
    }
    return script
  }
}

function Logout () {
  ArtitalkData.logout()
  location.reload()
}

function insertEmoji (str) {
  const now = ArtitalkDom.byId('neirong')
  const nowlength = now.value.length
  now.focus()
  if (typeof (document.selection) !== 'undefined') {
    document.selection.createRange().text = str
  } else {
    now.value = now.value.substr(0, now.selectionStart) + str + now.value.substring(now.selectionStart, nowlength)
  }
  preview()
}

function preview () {
  const clickPre = ArtitalkDom.byId('clickForPreview')
  clickPre.click()
}
