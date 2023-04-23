console.log('compare.js');

import * as c  from './common' ;
window.c = c;

import './style1.css' ;
import './style2.css' ;

import './compare.scss' ;

// import 'https://unpkg.com/panzoom@9.4.0/dist/panzoom.min.js'
import panzoom from 'panzoom' ;
window.panzoom = panzoom;

import {cmpObjHandler} from './cmpobj';
window.cmpObjHandler = cmpObjHandler;

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




onrd.push(async function() {
    c.$$('#div_n_medias_cont').addEventListener('cmpObjsDomRefreshed', function() {
        setCmpObjsPanzoom();
    });
});

onrd.push(async function() {
    cmpObjHandler.refreshDom();
});


function setCmpObjsPanzoom() {
    for (var ele of c.$$$('.cmp_obj') ) {
        var instance = panzoom(ele);
        instance.on('transform', function(e) {
            // This event will be called along with events above.
            // console.log('Fired when any transformation has happened', e);
            // console.log(e.getTransform());
            for (var oEle of c.$$$('.cmp_obj')) {
                if (oEle != ele) {
                    oEle.style.transformOrigin = ele.style.transformOrigin;
                    oEle.style.transform = ele.style.transform;
                }
            }
        });
    }
}





