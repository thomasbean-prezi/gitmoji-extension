function createNode(element) {
    return document.createElement(element); // Create the type of element you pass in the parameters
}

function append(parent, el) {
    return parent.appendChild(el); // Append the second parameter(element) to the first one
}

const url = 'https://api.github.com/emojis';
var mojiData = {}

window.onload=function(){
    var serch_bar = document.getElementById("search");

    serch_bar.addEventListener("input",function () {
        let searchTerms = serch_bar.value;
        updateList(searchTerms);
    })
}

fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
        mojiData = data;
        constructList(data);
    }).catch(function(error) {
        console.log("hit an error")
        console.log(error);
    });

function constructList(data){
    var listContainer = document.getElementById('container');
    while (listContainer.firstChild) {
        listContainer.removeChild(listContainer.firstChild);
    }
    for (var moji in data){
        let imgElem = document.createElement('img');
        imgElem.src = data[moji];
        imgElem.alt = moji;
        imgElem.title = moji;
        imgElem.addEventListener('click', function(){
            console.log(imgElem.alt);
            var dummy = document.createElement("input");
            document.body.appendChild(dummy);
            dummy.setAttribute("id", "dummy_id");
            document.getElementById("dummy_id").value = ":"+imgElem.alt+":";
            dummy.select();
            document.execCommand("copy");
            document.body.removeChild(dummy);
        });
        imgElem.addEventListener('mouseover', function(){
            console.log("IM HOVERING");
            imgElem.style.transform = "scale(3,3)";
        })
        imgElem.addEventListener('mouseout', function(){
            console.log("IM off");
            imgElem.style.transform = "scale(1,1)";
        })
        append(listContainer, imgElem);
    }
}

function updateList(searchTerms){
    var newData = {};
    for (var moji in mojiData){
        if(moji.indexOf(searchTerms) !== -1){
            newData[moji] = mojiData[moji];
        }
    }
    constructList(newData);
}
