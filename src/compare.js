console.log('compare.js');

import * as c  from './common'
window.c = c;

import './style1.css'
import './style2.css'

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