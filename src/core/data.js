'use strict';

const ArtitalkData = {
  ensureReady: function (config, callback) {
    config = config || {};
    const useVercelBackend = config.backend === 'vercel' || config.provider === 'vercel';
    if (useVercelBackend) {
      const sdkBase = (config.sdkURL || config.serverURL || '').replace(/\/$/, '');
      ArtitalkDom.loadScript(sdkBase + '/artitalk-av.js', callback);
      return;
    }
    if (window.AV) {
      callback();
      return;
    }
    ArtitalkDom.loadScript('https://unpkg.com/leancloud-storage@4.10.0/dist/av-min.js', callback);
  },
  init: function (config) {
    if (config.serverURL !== '') {
      AV.init({
        appId: config.appId,
        appKey: config.appKey,
        serverURL: config.serverURL
      });
    } else {
      AV.init({
        appId: config.appId,
        appKey: config.appKey
      });
    }
  },
  currentUser: function () {
    return AV.User.current();
  },
  login: function (username, password) {
    return AV.User.logIn(username, password);
  },
  logout: function () {
    return AV.User.logOut();
  },
  createTalk: function () {
    const Shuoshuo = AV.Object.extend('shuoshuo');
    return new Shuoshuo();
  },
  talkById: function (id) {
    return AV.Object.createWithoutData('shuoshuo', id);
  },
  commentById: function () {
    const Comment = AV.Object.extend('atComment');
    return new Comment();
  },
  queryTalks: function (pageSize, pageNum) {
    const query = new AV.Query('shuoshuo');
    query.descending('createdAt');
    query.limit(pageSize);
    query.skip(pageSize * pageNum);
    return query.find();
  },
  queryTalkById: function (id) {
    const query = new AV.Query('shuoshuo');
    query.equalTo('objectId', id);
    return query.find();
  },
  queryComments: function (talkId) {
    const query = new AV.Query('atComment');
    query.equalTo('atId', talkId);
    query.descending('createdAt');
    return query.find();
  }
};
