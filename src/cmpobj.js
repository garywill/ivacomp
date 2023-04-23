console.log('cmpobj.js');

import * as c  from './common' ;
window.c = c;



var cmpObjHandler = {
    cmpObjs: [
        // type = 'image' | 'video' | 'audio'
        
        // {
        //     type: 'video', 
        //     src: 'examples/1.mp4', 
        // 
        // }, 
        // {
        //     type: 'video', 
        //     src: 'examples/2.mp4', 
        // },        
        
        {
            type: 'image', 
            src: 'examples/1.webp', 
        }, 
        {
            type: 'image', 
            src: 'examples/2.webp', 
        }, 
        {
            type: 'image', 
            src: 'examples/3.webp', 
        }, 
    ], 
    getCurrentCmpObjAmount() {
        return this.cmpObjs.length;
    }, 
    getCurrentCmpObjEles() {
        return c.$$$('#div_n_medias_cont .cmp_obj') ;
    }, 
    getCurrentCmpDivs() {
        return c.$$$('#div_n_medias_cont .cmp_div') ;
    }, 
    addNewCmpObj(n, type, src) {
        this.cmpObjs.splice(n-1, 0, { type: type, src: src} );
        this.refreshDom();
    }, 
    replaceCmpObj(n, type , src) {
        this.cmpObjs.splice(n-1, 1, { type: type, src: src} );
        this.refreshDom();
    }, 
    delCmpObj(n) {
        if (this.getCurrentCmpObjAmount > 2 )
        { 
            this.cmpObjs.splice(n-1, 1 );
            this.refreshDom();
        } 
        else
            console.error("Can't delete cause at least 2 compare objects");
    }, 
    refreshDom() {
        c.$$('#div_n_medias_cont').innerHTML = '';
        
        const N = this.cmpObjs.length;
        for ( var i = 0; i< N; i++)
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
                    cmp_obj_html = `<video  loop playsinline  class="cmp_obj cmp_vid" n="${n}" src="${src}" />`;
                    break;
                case 'audio':
                    // TODO
                    break;
            }
            
            var cmp_div_css = `z-index: ${N+10-n} ;` ;
            if (n<N) {
                cmp_div_css += `
                    border-right : 2px solid red ;
                    pointer-events : none;
                `; 
            }
            
            var cmp_div_html = `<div class="cmp_div" n="${n}" cmpObjType="${cmpObj.type}"
                                    style="${cmp_div_css}"
                                > 
                                    ${cmp_obj_html} 
                                </div>`;
                                

                                
            c.$$('#div_n_medias_cont').innerHTML += cmp_div_html ;
        }
        
        if ( c.$$('#div_n_medias_cont .cmp_div video') )
            c.$$('#div_vid_ctrls').removeAttribute('hidden');
        else
            c.$$('#div_vid_ctrls').setAttribute('hidden', 'true');
        
        c.$$('#div_n_medias_cont').dispatchEvent( new Event('cmpObjsDomRefreshed'));
    }
    
};

export {cmpObjHandler} ;


