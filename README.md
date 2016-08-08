## javascript Test for WebViewJavascriptBridge

现在项目中需要H5与IOS进行数据交互，调研了WebViewJavascriptBridge的使用方法，`WebViewJavascriptBridge`提供了非常简单的API进行Object-C与JavaScript进行数据交互，下面根据官方的DEMO做了简单的封装，方便使用。

* WebViewBridge.setBridge( callback  )  建立桥接
* WebViewBridge.receive( callback  )    接受数据，接收一个回调，回调有一个data参数
* WebViewBridge.send( data, callback  ) 发送数据

WebViewJavascriptBridge：[https://github.com/marcuswestin/WebViewJavascriptBridge](https://github.com/marcuswestin/WebViewJavascriptBridge)
