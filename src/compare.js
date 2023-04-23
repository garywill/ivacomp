console.log('compare.js');

import * as c  from './common' ;
window.c = c;

import './style1.css' ;
import './style2.css' ;

import './compare.scss' ;

// import 'https://unpkg.com/panzoom@9.4.0/dist/panzoom.min.js'
import panzoom from 'panzoom' ;
window.panzoom = panzoom;

import './video_control' ;

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


// var arr= ['a','b','c'];
// for (var s of arr) {
//     console.log(s);
// }
// 
// console.log(panzoom);

onrd.push(async function() {
    for (var ele of c.$$$('.cmp_obj') )
    {
        // console.log('ele=', ele);
        var instance = panzoom(ele);

        instance.on('transform', function(e) {
            // This event will be called along with events above.
            // console.log('Fired when any transformation has happened', e);
            // console.log(e.getTransform());
            for (var oEle of c.$$$('.cmp_obj'))
            {
                if (oEle != ele)
                {
                    oEle.style.transformOrigin = ele.style.transformOrigin;
                    oEle.style.transform = ele.style.transform;
                    
                }
            }
        });
            
    }

});
