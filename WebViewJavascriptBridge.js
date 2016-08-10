/*
 * WebViewBridge
 * By Gavin 2016-8-10
 * IOS 与 H5 数据沟通
 * https://github.com/marcuswestin/WebViewJavascriptBridge
 * 该示例是对官方Demo的封装，方法如下：
 * WebViewBridge.setBridge( callback )  建立桥接
 * WebViewBridge.receive( name, callback )    接受数据，接收一个回调，回调有一个data参数
 * WebViewBridge.send( name, data, callback ) 发送数据
 * name即与IOS沟通的名称，H5与IOS一致，
 */
var WebViewBridge = {
  // 桥接名称
  handler: 'testJavascriptHandler',
  callback: 'testObjcCallback',
  // 建立
  setBridge: function ( callback ) {
    if ( window.WebViewJavascriptBridge ) {
      return callback( WebViewJavascriptBridge )
    }
    if ( window.WVJBCallbacks ) {
      return window.WVJBCallbacks.push(callback)
    }
    window.WVJBCallbacks = [callback]
    var WVJBIframe = document.createElement('iframe')
    WVJBIframe.style.display = 'none'
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__'
    document.documentElement.appendChild(WVJBIframe)
    setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
  },

  // 接收数据
  receive: function ( name, callback ) {
    var that = this
    if ( typeof name === 'function' ) name = that.handler;
    this.setBridge(function ( bridge ) {
      // 接收从ios传来的信息
      bridge.registerHandler( name, function ( data ) {
        callback.call( that, data )
      })
    })
  },

  // 发送数据
  // data 是 {}
  send: function ( name, data, callback ) {
    var that = this
    if ( typeof name === 'object' ) name = that.callback;
    this.setBridge(function ( bridge ) {
      bridge.callHandler(name, data, function ( res ) {
        callback.call(that, res)
      })
    })
  }
}
