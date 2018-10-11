//Hoisting
//refactor
const app = document.getElementById('root');

const logo = document.createElement('img');
logo.src='logo.png';

const container= document.createElement('div');
container.setAttribute('class','container');

app.appendChild(logo);
app.appendChild(container);

var data;
var filmsImages = getFilmsAndImages();

var request = new XMLHttpRequest();
request.open('GET','https://ghibliapi.herokuapp.com/films',true);
request.onload= function(){
    data= JSON.parse(this.response);
    if(request.status >=200 && request.status<400){
        //Success Request
        drawList(data);
    }else{
        //Error Message
        const errorMessage= document.createElement('marquee');
        errorMessage.textContent='Faillll!!!!';
        app.appendChild(errorMessage);
    }
};
request.send();

//Events
var button = document.getElementById('btn-search');
button.addEventListener('click',function(e){
    search(e);
},false);
var txtSearch= document.getElementById('txt-search');
txtSearch.addEventListener('keyup',function(e){
    if(e.keyCode===13){
        search(e);
    }
});

//Refactor
function drawList(list){
    list.forEach(movie => {
        //console.log(movie.title);
        const card = document.createElement('div');
        card.setAttribute('class','card');

        const h1 = document.createElement('h1');
        h1.textContent = movie.title;

        const p = document.createElement('p');
        movie.description = movie.description.substring(0,300);
        p.textContent= `${movie.description}...`;

        const imageFilm= document.createElement('img');
        imageFilm.src = (filmsImages[movie.id]!=undefined)?filmsImages[movie.id].image:'';

        container.appendChild(card);
        card.appendChild(h1);
        card.appendChild(imageFilm);
        card.appendChild(p);
    });
}
function search(e){
    let searchString = txtSearch.value.toLowerCase();
    console.log(searchString);
    var result = data.filter(function(element){
        return element.title.toLowerCase().includes(searchString);
    });
    removeChildrenFromNode(container);
    drawList(result);
}
function removeChildrenFromNode(myNode){
    while(myNode.firstChild){
        myNode.removeChild(myNode.firstChild);
    }
}