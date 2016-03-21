/**
 * Created by zhangyf on 2016/3/21/021.
 */
console.log('index.js');
var plug = {
    list:[]
}
include('plug/a.js','plug/b.js',['plug/c1.js','plug/c2.js'],'plug/d.js',function(){
    console.log('index',plug);
});