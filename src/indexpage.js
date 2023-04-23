console.log('indexpage.js'); 

import './indexpage.scss' ;

import * as c  from './common' ;
window.c = c;

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
    c.$$('#btn_ok').addOnClk(function() {
        const cmpObjs_uis = c.$$$('.div_onemedia_choose');
        
        var cmpObjs = [];
        for (var cmpobj_ui of cmpObjs_uis) {
            var mediatype = cmpobj_ui.q$('.select_mediatype').value;
            var mediasrc =  cmpobj_ui.q$('.input_src').value;
            console.log(mediatype, mediasrc);
            
            if (mediatype != 'none') {
                cmpObjs.push ( { type: mediatype, src: mediasrc } );
            }
        }
        console.log(cmpObjs);
        c.$$('#iframe_compare').contentWindow.cmpObjHandler.cmpObjs = cmpObjs;
        c.$$('#iframe_compare').contentWindow.cmpObjHandler.refreshDom();
    });
});

onrd.push(async function() {
    c.$$('#btn_example_img').addOnClk(function() {
        c.$$$('.select_mediatype')[0].value='image';
        c.$$$('.select_mediatype')[1].value='image';
        c.$$$('.select_mediatype')[2].value='image';
        
        c.$$$('.input_src')[0].value='examples/1.webp';
        c.$$$('.input_src')[1].value='examples/2.webp';
        c.$$$('.input_src')[2].value='examples/3.webp';
        
        c.$$('#btn_ok').click();
    });
    
    c.$$('#btn_example_vid').addOnClk(function() {
        c.$$$('.select_mediatype')[0].value='video';
        c.$$$('.select_mediatype')[1].value='video';
        c.$$$('.select_mediatype')[2].value='none';
        
        c.$$$('.input_src')[0].value='examples/1.mp4';
        c.$$$('.input_src')[1].value='examples/2.mp4';
        c.$$$('.input_src')[2].value='';
        
        c.$$('#btn_ok').click();
    });
    
    
});





