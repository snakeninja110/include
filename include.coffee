# 作者： 轨迹
# 日期： 2016-3-21
#--map- -
doc = window.document
head = doc.head || doc.getElementsByTagName("head")[0] || doc.documentElement
# 当前脚本的script节点
baseKey = 'data-main'
jsNode = (->
    nodes = doc.getElementsByTagName "script"
    node = null
    for n in nodes
        if n.getAttribute(baseKey) != null
            node = n
            break
    unless node
        node = nodes[nodes.length - 1]
    node
)()
jsNodeUrl = if jsNode.hasAttribute then jsNode.src else jsNode.getAttribute('src',4)

# js加载
loadJS = (url, callback, charset) ->
    node = doc.createElement("script")
    node.setAttribute("type", "text/javascript")
    node.setAttribute("charset", charset) if charset
    onload = ->
        node.onreadystatechange = node.onload = node.onerror = null
        callback && callback(url)
        # 防止回调的时候，script还没执行完毕
        setTimeout ->
            node.parentNode.removeChild(node)
            node = null
        , 20
        null
    if "onload" of node
        node.onload = node.onerror = onload
    else
        node.onreadystatechange = ->
            onload() if /loaded|complete/.test(node.readyState)
            null
    node.async = true
    head.appendChild node
    node.src = url
    node

# 加载css
loadCSS = (url, charset) ->
    link = doc.createElement 'link'
    link.setAttribute 'rel','stylesheet'
    link.setAttribute 'type','text/css'
    link.setAttribute 'charset',charset if charset
    head.appendChild link
    link.href = url
    link

# 已经加载完毕的js
jsLoaded = {}
jsLoaded[jsNodeUrl] = true

# 待加载的js
jsWait = []
# 待回调的函数
callWait = []
# js是否在执行中
jsFlag = 0

requireJSed = (url) ->
    x = jsLoaded[url]
    jsLoaded[url] = true
    if x and x != true
        n[0](n[1]) for n in x
    null

requireJS = (url, callback, charset) ->
    if jsLoaded[url] is true
        callback(url)
        return

    unless jsLoaded[url]
        jsLoaded[url] = [[callback,url]]
        if /\.css$/i.test(url.split('?')[0])
            loadCSS(url,charset)
            setTimeout ->
                requireJSed(url)
            , 0
        else
            loadJS(url,requireJSed,charset)
    else
        jsLoaded[url].push([callback,url])
    null

# 无序下载
disorderJS = (urls, callback, charset) ->
    isStr = typeof urls is "string"
    return requireJS(urls, callback, charset) if isStr
    return requireJS(urls[0], callback, charset) if urls.length is 1
    led = {}
    led[u1] = true for u1 in urls
    loadBack = (src) ->
        delete led[src]
        return for u2 of led
        callback()
        loadBack = -> null
        null

    requireJS( u3, loadBack, charset) for u3 in urls
    null


# 出栈
stackShift = ->
    # console.log jsWait, callWait, jsFlag
    if jsWait.length
        js = jsWait.shift()
        # console.log js
        disorderJS.apply(null, js)
        return
    if callWait.length
        back = callWait.pop()
        back()
        setTimeout stackShift, 0
        return
    jsFlag = 0
    null

# 进栈
stackPush = (urls, callback, charset)->
    callWait.push(callback) if callback
    jsWait.push([url, stackShift, charset]) for url in urls

    if jsFlag is 0
        jsFlag = 1
        stackShift()
    null

include = ->
    urls = Array.prototype.slice.call(arguments)
    len = urls.length
    callback = null
    charset = null
    if typeof urls[len - 2] is "function"
        charset = urls.pop()
        len -= 1
    if typeof urls[len - 1] is "function"
        callback = urls.pop()

    stackPush urls,callback,charset
    null

include.ready = (ready)->
    if doc.addEventListener
        doc.addEventListener "DOMContentLoaded", ready, false
    else if doc.attachEvent
        doc.attachEvent "onreadystatechange", ->
            ready() if /loaded|complete/.test(doc.readyState)
    null

jsNodeMain = jsNode.getAttribute(baseKey) || ''
include.ready -> include(jsNodeMain) if jsNodeMain

window.include = include