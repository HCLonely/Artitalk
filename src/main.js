function Artitalk (options) {
  return new atEvery(options);
}
function atEvery (option) {
  const root = this
  root.init(option);
  return root;
}
atEvery.prototype.init = function (option) {
  const root = this;
  root.config = option;
  ArtitalkData.ensureReady(function () {
    !!option && root._init();
    return root;
  });
}
