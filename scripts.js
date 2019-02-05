const content1 = document.getElementById("content1");
const content2 = document.getElementById("content2");
const tittel2 = document.getElementById("tittel2");
const c3 = document.getElementById("content3");

//Setter timer for bildet, h1 og p
//setTimeout(function () {
  //  document.getElementById('content1').style.display = 'block';
//}, 1000); 

//setTimeout(function () {
  //  document.getElementById('tittel1').style.display = 'block';
//}, 1000);

//setTimeout(function () {
  //  document.getElementById('p1').style.display = 'block';
//}, 1000);
//

setTimeout(function () {
    document.getElementById('menuToggle').style.display = 'block';
}, 500);




onscroll = function () {
    console.log(scrollY);
    if (scrollY > 1) {
        content1.className = "content1 slideUp";
    }
    { 

    console.log(scrollY);
    if (scrollY > 300) {
        tittel2.className = "tittel2 fader";     
    }
 { 
        console.log(scrollY);
        if (scrollY > 600) {
            content2.className = "content2 slideUp";
        }

   {  
    console.log(scrollY);
    if (scrollY > 1400) {
        content3.className = "content3 slideUp";
    }
}
} 
}}






/**
 * This was built using the scrollie jQuery Plugin
 * https://github.com/Funsella/jquery-scrollie
 */
