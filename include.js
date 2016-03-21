(function(){var baseKey,callWait,disorderJS,doc,head,include,jsFlag,jsLoaded,jsNode,jsNodeMain,jsNodeUrl,jsWait,loadCSS,loadJS,requireJS,requireJSed,stackPush,stackShift;doc=window.document;head=doc.head||doc.getElementsByTagName("head")[0]||doc.documentElement;baseKey="data-main";jsNode=function(){var i,len1,n,node,nodes;nodes=doc.getElementsByTagName("script");node=null;for(i=0,len1=nodes.length;i<len1;i++){n=nodes[i];if(n.getAttribute(baseKey)!==null){node=n;break}}if(!node){node=nodes[nodes.length-1]}return node}();jsNodeUrl=jsNode.hasAttribute?jsNode.src:jsNode.getAttribute("src",4);loadJS=function(url,callback,charset){var node,onload;node=doc.createElement("script");node.setAttribute("type","text/javascript");if(charset){node.setAttribute("charset",charset)}onload=function(){node.onreadystatechange=node.onload=node.onerror=null;callback&&callback(url);setTimeout(function(){node.parentNode.removeChild(node);return node=null},20);return null};if("onload"in node){node.onload=node.onerror=onload}else{node.onreadystatechange=function(){if(/loaded|complete/.test(node.readyState)){onload()}return null}}node.async=true;head.appendChild(node);node.src=url;return node};loadCSS=function(url,charset){var link;link=doc.createElement("link");link.setAttribute("rel","stylesheet");link.setAttribute("type","text/css");if(charset){link.setAttribute("charset",charset)}head.appendChild(link);link.href=url;return link};jsLoaded={};jsLoaded[jsNodeUrl]=true;jsWait=[];callWait=[];jsFlag=0;requireJSed=function(url){var i,len1,n,x;x=jsLoaded[url];jsLoaded[url]=true;if(x&&x!==true){for(i=0,len1=x.length;i<len1;i++){n=x[i];n[0](n[1])}}return null};requireJS=function(url,callback,charset){if(jsLoaded[url]===true){callback(url);return}if(!jsLoaded[url]){jsLoaded[url]=[[callback,url]];if(/\.css$/i.test(url.split("?")[0])){loadCSS(url,charset);setTimeout(function(){return requireJSed(url)},0)}else{loadJS(url,requireJSed,charset)}}else{jsLoaded[url].push([callback,url])}return null};disorderJS=function(urls,callback,charset){var i,isStr,j,led,len1,len2,loadBack,u1,u3;isStr=typeof urls==="string";if(isStr){return requireJS(urls,callback,charset)}if(urls.length===1){return requireJS(urls[0],callback,charset)}led={};for(i=0,len1=urls.length;i<len1;i++){u1=urls[i];led[u1]=true}loadBack=function(src){var u2;delete led[src];for(u2 in led){return}callback();loadBack=function(){return null};return null};for(j=0,len2=urls.length;j<len2;j++){u3=urls[j];requireJS(u3,loadBack,charset)}return null};stackShift=function(){var back,js;if(jsWait.length){js=jsWait.shift();disorderJS.apply(null,js);return}if(callWait.length){back=callWait.pop();back();setTimeout(stackShift,0);return}jsFlag=0;return null};stackPush=function(urls,callback,charset){var i,len1,url;if(callback){callWait.push(callback)}for(i=0,len1=urls.length;i<len1;i++){url=urls[i];jsWait.push([url,stackShift,charset])}if(jsFlag===0){jsFlag=1;stackShift()}return null};include=function(){var callback,charset,len,urls;urls=Array.prototype.slice.call(arguments);len=urls.length;callback=null;charset=null;if(typeof urls[len-2]==="function"){charset=urls.pop();len-=1}if(typeof urls[len-1]==="function"){callback=urls.pop()}stackPush(urls,callback,charset);return null};include.ready=function(ready){if(doc.addEventListener){doc.addEventListener("DOMContentLoaded",ready,false)}else if(doc.attachEvent){doc.attachEvent("onreadystatechange",function(){if(/loaded|complete/.test(doc.readyState)){return ready()}})}return null};jsNodeMain=jsNode.getAttribute(baseKey)||"";include.ready(function(){if(jsNodeMain){return include(jsNodeMain)}});window.include=include}).call(this);