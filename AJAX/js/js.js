var id;
var resultado = document.getElementById("resultado");
var categoria = document.getElementById("gatos");
var raza = document.getElementById("raza");
var limit=1;
var page=1;
var api_key = "d104f738-e619-4fea-9dd6-d3598e934a8e";
var respTotales = "";
var busqueda = "";
var cantidadPag = "";
var fotos = "";

window.addEventListener("load", function () {
    url1();
    url2();
    document.getElementById('gatos').addEventListener('change', function(){busqueda = "category_ids="; id = document.getElementById('gatos').value;console.log(id)});
    document.getElementById('raza').addEventListener('change', function(){busqueda = "breed_ids="; id = document.getElementById('raza').value; console.log(id)});
    document.getElementById('search').addEventListener('click', obtenerImagenes);
});
/*
document.getElementById("search").addEventListener("click", function () {
    opciones();
});

document.getElementById("search1").addEventListener("click", function () {
    opciones2();
});*/

function url1() {
    //limit=document.getElementById("limit").value;
    let url = `https://api.thecatapi.com/v1/categories`;

    const api = new XMLHttpRequest();
    api.open('GET', url, true);
    api.send();
    
    api.onreadystatechange = function () {
        if (this.status == 200 && this.readyState == 4) {
            let datos = JSON.parse(this.responseText);
            console.log(datos);


            for (let item of datos) {
                var option = document.createElement("option");
                option.value=item.id;
                option.id=item.id;
                option.innerHTML =item.name;
                categoria.appendChild(option);
            }

        }
    }
}

function url2() {
    //limit=document.getElementById("limit").value;
    let url = `https://api.thecatapi.com/v1/breeds`;

    const api = new XMLHttpRequest();
    api.open('GET', url, true);
    api.send();

    api.onreadystatechange = function () {
        if (this.status == 200 && this.readyState == 4) {
            let datos = JSON.parse(this.responseText);
            console.log(datos);
            for (let item of datos) {
                var option = document.createElement("option");
                option.value=item.id;
                option.id=item.id;
                option.innerHTML =item.name;
                raza.appendChild(option);
            }

        }
    }
}

function paginasTotales() {
    var x = respTotales/document.getElementById('limit').value;
    return Math.ceil(x);
}
/*
function opciones() {
    limit=document.getElementById("limit").value;
    if (document.querySelector("#gatos").value == "hats") id = 1;
    else if (document.querySelector("#gatos").value == "sunglasses") id = 4;
    else if (document.querySelector("#gatos").value == "clothes") id = 15;
    else if (document.querySelector("#gatos").value == "boxes") id = 5;
    else if (document.querySelector("#gatos").value == "sinks") id = 14;
    else if (document.querySelector("#gatos").value == "space") id = 2;
    else if (document.querySelector("#gatos").value == "ties") id = 7;
    //else if (document.querySelector("#gatos").value == "None") id="" ;

    obtenerImagenes();

}
*/
function obtenerImagenes() {

    var limite =(document.getElementById('limit').value != "")? document.getElementById('limit').value : 1;
    //let url = `https://api.thecatapi.com/v1/images/search?api_key=`+api_key+`&limit=${limit}&`+busqueda+`${id}`;
    let url = `https://api.thecatapi.com/v1/images/search?api_key=`+api_key+'&limit=100&'+busqueda+`${id}`;
    console.log(url )
    const api = new XMLHttpRequest();
    api.open('GET', url, true);
    api.send();
    api.onreadystatechange = function () {
        if (this.status == 200 && this.readyState == 4) {
            let datos = JSON.parse(this.responseText);
            resultado.innerHTML = '';

            respTotales = api.getResponseHeader("Pagination-Count");
            console.log(respTotales)
            fotos = datos;
            page = 1;
            mostrarFotos();
           /* for (let item of datos) {
                resultado.innerHTML += `<img width=300px height=200px src=${item.url}>`;
            }*/
        }
    }
    

}

function mostrarFotos(){
    var limite =(document.getElementById('limit').value != "")? document.getElementById('limit').value : 1;
    var mostradas = limite*page;
    
    document.getElementById('pagAct').innerHTML = page + " de " + paginasTotales();

    if(page == paginasTotales()) {
        document.getElementById('sig').style.display = 'none';
    }
    else {
        document.getElementById('sig').style.display = 'block';
    }

    if(page == 1){
        document.getElementById('ant').style.display = 'none';
    }
    else {
        document.getElementById('ant').style.display = 'block';
    }
    resultado.innerHTML = '';

    for(let i=mostradas-limite ; i < mostradas;i++){
        let foto = "<img src='"+fotos[i]['url']+"'>";
        resultado.innerHTML += foto;
    }

}

function opciones2() {
    limit=document.getElementById("limit").value;
    obtenerRaza();
}
/*
function obtenerRaza() {
    id2=document.getElementById("raza").value;
    let url = `https://api.thecatapi.com/v1/images/search?page=${page}&limit=${limit}&breed_ids=${id2}`;

    const api = new XMLHttpRequest();
    api.open('GET', url, true);
    api.send();
    api.onreadystatechange = function () {
        if (this.status == 200 && this.readyState == 4) {
            let datos = JSON.parse(this.responseText);
            resultado.innerHTML = '';

            for (let item of datos) {
                resultado.innerHTML += `<img width=300px height=200px src=${item.url}>`;
            }
            document.getElementById("ant").style.display="block";
            document.getElementById("sig").style.display="block";
        }
    }
}
*/
document.getElementById("ant").addEventListener("click",function(){
    page -= 1;
    mostrarFotos();
});

document.getElementById("sig").addEventListener("click",function(){
    page += 1;
    mostrarFotos();
});

/*function atras(){
    page--;
}

function adelante(){
    page++;
}*/


