import * as c  from './common' ;
window.c = c;
 

c.$$('#btn_play_pause').addOnClk(function() {
    if ( c.$$('#div_vid_ctrls').getAttribute('playing') === 'true' )
    { 
        c.$$('#div_vid_ctrls').removeAttribute('playing');
        for (var videoEle of c.$$$('video.cmp_obj') )
        {
            videoEle.pause();
        }
        // syncVideosProg();
    } 
    else
    {
        // syncVideosProg();
        c.$$('#div_vid_ctrls').setAttribute('playing', 'true');
        for (var videoEle of c.$$$('video.cmp_obj') )
        {
            videoEle.play();
        }
    }
});

function getVideosProg() 
{
    var results = [];
    for (var videoEle of c.$$$('video.cmp_obj') )
    {
        results.push(videoEle.currentTime);
    }
    return results;
}
window.getVideosProg = getVideosProg;

function getVideoEle(n)
{
    return  c.$$(`video.cmp_obj[n="${n}"]`);
}
window.getVideoEle = getVideoEle;

function syncVideosProg(n=1)
{
    for (var videoEle of c.$$$('video.cmp_obj') )
    { 
        console.log(videoEle.currentTime);
        
        if ( parseInt(videoEle.getAttribute('n') ) != n )
        {
            videoEle.fastSeek( c.$$(`video.cmp_obj[n="${n}"]`).currentTime ) // TODO no fastseek
        }
    } 
}