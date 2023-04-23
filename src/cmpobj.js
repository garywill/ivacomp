console.log('cmpobj.js');

import * as c  from './common' ;
window.c = c;

// var cmpObjHandler;
// 
// cmpObjHandler = await cmpObjHandlerClass();
// 
// async function cmpObjHandlerClass() {
//     var R = {};
//     
//     R.cmpObjs = [ 
//         // type = 'image' | 'video' | 'audio'
//         {
//             type: 'image', 
//             src: 'examples/11.webp', 
//         }, 
//         {
//             type: 'image', 
//             src: 'examples/22.webp', 
//         }, 
//         
//     ];
//     
//     
//     return R;
// }


var cmpObjHandler = {
    cmpObjs: [
        // type = 'image' | 'video' | 'audio'
        {
            type: 'image', 
            src: 'examples/11.webp', 
        }, 
        {
            type: 'image', 
            src: 'examples/22.webp', 
        },        
    ], 
    getCurrentCmpObjNum() {
        return this.cmpObjs.length;
    }, 
    getCurrentCmpObjEles() {
        return c.$$$('#div_n_medias_cont .cmp_obj') ;
    }, 
    addNewCmpObj(n, type, src) {
        this.cmpObjs.splice(n-1, 0, { type: type, src: src} );
        this.refreshDom();
    }, 
    refreshDom() {
        c.$$('#div_n_medias_cont').innerHTML = '';
        
        for ( var i = 0; i< this.cmpObjs.length; i++)
        {
            const cmpObj = this.cmpObjs[i];
            const n = i+1;
            
            var src = cmpObj.src;
            
            var cmp_obj_html = '';
            switch (cmpObj.type)
            {
                case 'image':
                    cmp_obj_html = `<img class="cmp_obj cmp_img" n="${n}" src="${src}" />`;
                    break;
                case 'video':
                    cmp_obj_html = `<video  loop playsinline  class="cmp_obj cmp_img" n="${n}" src="${src}" />`;
                    break;
                case 'audio':
                    // TODO
                    break;
            }
            var cmp_div_html = `<div class="cmp_div" n="${n}" cmpObjType="${cmpObj.type}"> 
                                    ${cmp_obj_html} 
                                </div>`;
            
            c.$$('#div_n_medias_cont').innerHTML += cmp_div_html ;
        }
        
        c.$$('#div_n_medias_cont').dispatchEvent( new Event('cmpObjsDomRefreshed'));
    }
    
};

export {cmpObjHandler} ;


