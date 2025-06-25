const allProducts=[
{name:"Semințe de ardei gogoșar",page:"/Seminte/seminte.html"},
{name:"Semințe pentru gazon ornamental",page:"/Seminte/seminte.html"},
{name:"Semințe pentru gazonul din parc",page:"/Seminte/seminte.html"},
{name:"Semințe de ardei lung",page:"/Seminte/seminte.html"},
{name:"Semințe de roșii",page:"/Seminte/seminte.html"},
{name:"Semințe de ridichi",page:"/Seminte/seminte.html"},
{name:"Substrat universal",page:"/Seminte/seminte.html"},
{name:"Semințe de vinete",page:"/Seminte/seminte.html"},
{name:"Semințe de varză",page:"/Seminte/seminte.html"},
{name:"Semințe de morcov",page:"/Seminte/seminte.html"},
{name:"Semințe de ardei iute",page:"/Seminte/seminte.html"},
{name:"Semințe de lavandă",page:"/Seminte/seminte.html"},
{name:"Semințe de lucernă",page:"/Seminte/seminte.html"},
{name:"Semințe Gura Leului",page:"/Seminte/seminte.html"},
{name:"Semințe gazon sport",page:"/Seminte/seminte.html"},
{name:"Topor coada fibră",page:"/Unelte/unelte.html"},
{name:"Topor despicat lemne",page:"/Unelte/unelte.html"},
{name:"Topor de tăiat lemne",page:"/Unelte/unelte.html"},
{name:"Topor lamă oțel și coadă fibră",page:"/Unelte/unelte.html"},
{name:"Mini lopată",page:"/Unelte/unelte.html"},
{name:"Lopată pliabilă multifuncțională",page:"/Unelte/unelte.html"},
{name:"Hârleț profesional",page:"/Unelte/unelte.html"},
{name:"Hârleț simplu",page:"/Unelte/unelte.html"},
{name:"Hârleț cu coadă metalică",page:"/Unelte/unelte.html"},
{name:"Greblă reglabilă",page:"/Unelte/unelte.html"},
{name:"Greblă pentru sol",page:"/Unelte/unelte.html"},
{name:"Greblă fân Kotarbau",page:"/Unelte/unelte.html"},
{name:"Foarfecă pentru grădinărit",page:"/Unelte/unelte.html"},
{name:"Foarfecă de cules legume",page:"/Unelte/unelte.html"},
{name:"Foarfecă universală",page:"/Unelte/unelte.html"},
{name:"Ingrasamant pentru legume",page:"/Pamant/pamant.html"},
{name:"Ingrasamant pentru rododendroni",page:"/Pamant/pamant.html"},
{name:"Ingrasamant pentru plantele de apartament",page:"/Pamant/pamant.html"},
{name:"Uree granule",page:"/Pamant/pamant.html"},
{name:"Ingrasamant Plante",page:"/Pamant/pamant.html"},
{name:"Ingrasamant pentru gazon",page:"/Pamant/pamant.html"},
{name:"Ingrasamant spray pentru orhidee",page:"/Pamant/pamant.html"},
{name:"Ingrasamant pentru frunze",page:"/Pamant/pamant.html"},
{name:"Elixir pelargoni si plante balcon",page:"/Pamant/pamant.html"},
{name:"Ingrasamant pentru arbusti",page:"/Pamant/pamant.html"},
{name:"Ferticomplex NPK",page:"/Pamant/pamant.html"},
{name:"Accelerator de compost",page:"/Pamant/pamant.html"},
{name:"Ingrasamant pentru soluri acide",page:"/Pamant/pamant.html"},
{name:"Pachet Start A-Z",page:"/Pamant/pamant.html"},
{name:"Calciu premium",page:"/Pamant/pamant.html"}
];
function normalize(str){
return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9 ]/g,"").replace(/\s+/g," ").trim();
}
document.addEventListener("DOMContentLoaded",function(){
const searchBtn=document.querySelector(".search-icon");
const searchInput=document.querySelector(".search input");
if(!searchBtn||!searchInput)return;
searchBtn.addEventListener("click",function(){
const input=searchInput.value;
const normalizedInput=normalize(input);
if(!normalizedInput){
alert("Introduceți un termen de căutare.");
return;
}
const foundProduct=allProducts.find(p=>normalize(p.name).includes(normalizedInput));
if(foundProduct){
window.location.href=foundProduct.page;
}else{
alert("Produsul căutat nu a fost găsit.");
}
});
searchInput.addEventListener("keydown",function(e){
if(e.key==="Enter"){
searchBtn.click();
}
});
});
