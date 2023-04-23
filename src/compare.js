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

import { aniHandler } from './ani' ;
window.aniHandler = aniHandler;

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
    c.$$('#div_n_medias_cont').addEventListener('cmpObjsDomRefreshed', function() {
        setCmpObjsSize();
        aniHandler.startAni();
    });
});

onrd.push(async function() {
   aniHandler.init();
});

onrd.push(async function() {
    cmpObjHandler.refreshDom();
});

onrd.push(async function() {
    c.$$('#btn_reset_zoom').addOnClk(function() {
        const cmp_objs = c.$$$('#div_n_medias_cont .cmp_div .cmp_obj')
        for (var cmp_obj of cmp_objs) {
            cmp_obj.style.transform = "";
            if (cmp_obj.tagName == 'VIDEO') {
                cmp_obj.pause();
                cmp_obj.fastSeek(0);
            } 
        }
        c.$$('#div_vid_ctrls').removeAttribute('playing');
    });
});


function setCmpObjsSize() {
    const cont_width = getComputedStyle(c.$$('#div_n_medias_cont')).width;
    const cont_height = getComputedStyle(c.$$('#div_n_medias_cont')).height;
    const cmp_obj_eles = c.$$$('.cmp_obj');
    for (var cmp_obj_ele of cmp_obj_eles) {
        cmp_obj_ele.style.width = cont_width;
        cmp_obj_ele.style.height = cont_height;
    }
}
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





