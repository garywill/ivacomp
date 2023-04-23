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
    async resetAni() {
        console.debug('resetAni()');
        this.stopAni();
        await c.sleep(100);
        
        this.curObj = 0;
        // aniHandler.timerId = null; // 这里有就造成其他地方读到都是null。未知问题 TODO
        c.$$('#div_curObjN').textContent = '-';
        
        const divs = cmpObjHandler.getCurrentCmpDivs();
        const N = divs.length;
        for (var i=0; i<N; i++) {
            const n = i+1;
            divs[i].style.width = `${(100/N)*n}%`;
        }
    }, 
    async startAni() {
        this.stopAni();
        await c.sleep(100);
        
        this.curObj = 0;
        c.$$('#div_curObjN').textContent = '-';
        aniHandler.timerId = setInterval(this.nextAniFrame, 1300);
        console.log('new interval timer ID: ', aniHandler.timerId);
    }, 
    stopAni() {
        console.log('clearing interval timer ID: ', aniHandler.timerId);
        clearInterval(aniHandler.timerId);
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
        
        for (var n=1; n<=N; n++) {
            const video_tag = c.$$(`#div_n_medias_cont .cmp_div[n="${n}"] .cmp_vid`)
            if (video_tag) {
                if ( n == this.curObj )
                    video_tag.muted=false;
                else
                    video_tag.muted=true;
            }
        } 
        
    }, 
}
export {aniHandler} ;

