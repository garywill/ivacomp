console.log('ani.js');
 
import * as c  from './common' ;
window.c = c;

var aniHandler = {
    curObj : 0, 
    timerId : null, 
    
    init() {
        c.$$('#div_n_medias_cont').addEventListener('cmpObjsDomRefreshed', function() {
            aniHandler.resetAni();
        });
        
    }, 
    resetAni() {
        // console.debug('resetAni()');
        
        this.curObj = 0;
        this.timerId = null; 
        c.$$('#div_curObjN').textContent = '-';
        
        const divs = cmpObjHandler.getCurrentCmpDivs();
        const N = divs.length;
        for (var i=0; i<N; i++) {
            const n = i+1;
            divs[i].style.width = `${(100/N)*n}%`;
        }
    }, 
    startAni() {
        this.curObj = 0;
        c.$$('#div_curObjN').textContent = '-';
        this.timerId = setInterval(this.nextAniFrame, 1300);
    }, 
    stopAni() {
        clearInterval(this.timerId);
    }, 
    nextAniFrame() {
        const N = cmpObjHandler.getCurrentCmpObjAmount();
        
        if ( this.curObj+1 <= N )
            this.curObj += 1;
        else 
            this.curObj = 1;
        c.$$('#div_curObjN').textContent = this.curObj;
        
        for (var n=1; n<this.curObj; n++) {
            c.$$(`#div_n_medias_cont .cmp_div[n="${n}"]`).style.width = `${2*n}%`;
        }
        for (var n=this.curObj; n<=N-1; n++) {
            c.$$(`#div_n_medias_cont .cmp_div[n="${n}"]`).style.width = `${ 100 - 2*(N-n) }%`;
        }
        
    }, 
}
export {aniHandler} ;

var cur_lr = 0; // 0=left 1=right
window.moveSplitToAnother = function moveSplitToAnother()
{
    const stag = c.$$('#styletag_ani');
    
    var new_width ; 
    if (cur_lr == 0)
    {
        new_width = 900
        cur_lr = 1;
    }
    else{
        new_width = 100
        cur_lr = 0;
        
    }
    
    var stag_content = `
        .cmp_div[n='1'] {
            width: ${new_width}px !important;
        }
    `;
    stag.textContent = stag_content;
    
}
