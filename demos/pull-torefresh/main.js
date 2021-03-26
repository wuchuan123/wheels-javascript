(function () {
  function PullToRefresh(options) {
    this.options = Object.assign({}, this.constructor.defaultOptions, options);
    this.init();
  }

  PullToRefresh.defaultOptions = {
    pullText: "下拉以刷新页面",
    pullIcon: "&#8675;",
    relaseText: "释放以刷新页面",
    refreshText: "刷新",
    refreshIcon: "&hellip;",
    threshold: 60,
    max: 80,
    reloadHeight: 50,
  };
  //记录当前状态 pending/pulling/releasing/refreshing
  let _state = "pending";
  let pullStartY = null;
  let pullMoveY = null;
  let dist = 0;
  let distResisted = 0;
  let supportsPassive = false;
  let proto = PullToRefresh.prototype;
  proto.constructor = PullToRefresh;
  proto.init = function () {
    this.createRefreshElement()
    this.setRefreshStyle()
    this.getElement()
    this.supportsPassive()
    this.bindEvent()
  }
  proto.createRefreshElement = function () {
    let elem = document.createElement('div')
    if (this.options.target !== 'body') {
      let target = document.getElementById(this.options.target)
      target.parentNode.insertBefore(elem, target)
    } else {
      document.body.insertBefore(elem, document.body.firstChild)
    }
    elem.className = 'refresh-element'
    elem.id = 'refresh-element'
    elem.innerHTML = '' +
      '<div class="refresh-box"><div class="refresh-content"><div class="refresh-icon"></div><div class="refresh-text"></div></div></div>'
  };
  proto.setRefreshStyle = function () {
    let styleElem = document.createElement('style')
    styleElem.setAttribute('id', 'refresh-element-style')
    document.head.appendChild(styleElem)
    styleElem.textContent =
      ".refresh-element {pointer-events: none; font-size: 0.85em; top: 0; height: 0; transition: height 0.3s, min-height 0.3s; text-align: center; width: 100%; overflow: hidden; color: #fff; } .refresh-box {padding: 10px; } .pull {transition: none; } .refresh-text {margin-top: .33em; } .refresh-icon {transition: transform .3s; } .release .refresh-icon {transform: rotate(180deg); }";
  }
  proto.getElement = function () {
    this.refreshElem = document.getElementById('refresh-element')
  }
  proto.supportsPassive = function () {
    try {
      let opts = Object.defineProperty({}, 'passive', {
        get: function () {
          supportsPassive = true
        }
      })
      window.addEventListener('test', null, opts)
    } catch (e) {
    }
  }
  proto.bindEvent = function () {
    window.addEventListener('touchstart', this)
    window.addEventListener('touchmove', this, supportsPassive ? {passive: false} : false)
    window.addEventListener('touchend', this)
  }
  proto.handleEvent = function (event) {
    let method='on'+event.type
    if(this[method]){
      this[method](event)
    }
  }
  proto.shouldPullToRefresh = function () {
    return !window.scrollY
  }
  proto.update = function () {

  }
  proto.ontouchstart = function (e) {
  }
  proto.resistanceFunction = function () {
  }
  proto.ontouchmove = function (e) {
  }
  proto.ontouchend = function () {
  }
  proto.onRest = function () {
  }
})();
