console.log('compare.js');

import * as c  from './common' ;
window.c = c;

import './style1.css' ;
import './style2.css' ;

import './compare.scss' ;

// import 'https://unpkg.com/panzoom@9.4.0/dist/panzoom.min.js'
import panzoom from 'panzoom' ;

var onrd = new Array(); //on document ready
c.onDCL( async (event) => {

    for (var i=0; i<onrd.length; ++i)
    {
        try{
            await Promise.resolve( onrd[i]() );
        }catch(err){
            console.error(err);
        }
    }
});


var arr= ['a','b','c'];
for (var s of arr) {
    console.log(s);
}

console.log(panzoom);

var instance = panzoom(c.$$('.cmp_img[n="1"]'));
// instance.on('panstart', function(e) {
//     console.log('Fired when pan is just started ', e);
//     // Note: e === instance.
// });
// 
// instance.on('pan', function(e) {
//     console.log('Fired when the `element` is being panned', e);
// });
// 
// instance.on('panend', function(e) {
//     console.log('Fired when pan ended', e);
// });
// 
// instance.on('zoom', function(e) {
//     console.log('Fired when `element` is zoomed', e);
// });
// 
// instance.on('zoomend', function(e) {
//     console.log('Fired when zoom animation ended', e);
// });

instance.on('transform', function(e) {
    // This event will be called along with events above.
    console.log('Fired when any transformation has happened', e);
    console.log(e.getTransform());
    c.$$('.cmp_img[n="2"]').style.transformOrigin = c.$$('.cmp_img[n="1"]').style.transformOrigin;
    c.$$('.cmp_img[n="2"]').style.transform = c.$$('.cmp_img[n="1"]').style.transform;
});