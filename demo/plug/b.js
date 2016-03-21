/**
 * Created by zhangyf on 2016/3/21/021.
 */
console.log('b.js::OK')
plug.list.push('b.js');
plug.num_b = 2;

include(['plug/e1.js','plug/e2.js'],function(){
    console.log('e1,e2::OK');
});