

const btnHtml=document.getElementById('html');
const btnCss=document.getElementById('css');
const btnJs=document.getElementById('js');







       
// display die elemente für jede header nav element
async function topnav(el){
    try{
        const res= await fetch("www-Navi.json");
        const data= await res.json();
        console.log(el);
        document.getElementById('main').innerHTML='';//main erstmal leeren bei clicken andere header element

        const jsKeys=Object.keys(data[el]);// array von header elementen [html,css,javascript]

        console.log(jsKeys);
        document.getElementById('aside').innerHTML='';

        for(const i of jsKeys){
            
            document.getElementById('aside').innerHTML+=`<button id="${i}" onclick="sidenav('${el}','${i}')">${i}</button>`;
            
        }



    }catch(error){
        console.log(error);
    }

}

// display die elemente für jede header nav element
async function sidenav(el1,el2){ //2 param el1:gewälte header element(html,css oder js), el2: gewählte aside element
    try{
        const res= await fetch("www-Navi.json");
        const data= await res.json();
        const content=data[el1][el2].content; //bsp: data[html][body].content, zugriff auf value (content) die in key el2 in key el1 in data
        const ref=data[el1][el2].references;
        console.log(ref);

        
        document.getElementById('main').innerHTML=content;
        document.getElementById('urls').innerHTML='';
        for(i of ref){
            document.getElementById('urls').innerHTML+=`<a style="overflow-wrap: anywhere" href="${i}">${i}</a>`;
        }


    }catch(error){
        console.log(error);
    }
}