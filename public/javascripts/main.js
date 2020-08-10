var slideshowContainer = document.querySelector('#container');
var form = document.querySelector("#form-container");
var loader = `<div id="loader-container" class="loadingio-spinner-spinner-b7xgm5xplz"><div class="ldio-4921mgkxf7b">
              <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
              </div></div>`;

//function to take input from form
const handleForm = (event) => {
    event.preventDefault();
    slideshowContainer.querySelectorAll('*').forEach(n => n.remove());     //removing the previous elements inside slider
    const newUrl = document.querySelector('#newUrl').value;     //getting newUrl from the form
    const addUrl = newUrl + '/wp-json/wp/v2/posts?_embed=true';
    getPosts(addUrl);       //getting posts from new website
    document.querySelector("#newUrl").value = "";
}

//adding event listener for the form
form.addEventListener('submit', handleForm);


//main function which gets the data from wordpress api endpoint
var baseUrl = "https://wptavern.com/wp-json/wp/v2/posts?_embed=true";
const getPosts = async (baseUrl) => {
    try {
        slideshowContainer.innerHTML = loader;        //adding loading animation
        const response = await fetch(baseUrl);
        if (response.ok && response.status == 200 &&response.headers.get('content-type') == 'application/json; charset=UTF-8') {        //validating response
            const data = await response.json();
            if (data) {     //Remove loding animation
                const loader = document.querySelector("#loader-container");
                if (loader) {
                    loader.remove();
                }
            }

            const date = {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            };

            data.forEach(async (post) => {
                if (post._embedded["wp:featuredmedia"]) {
                    slideshowContainer.innerHTML += `
                        <div class= "mySlides">
                        <a href="${post.link}"><img src='${post._embedded["wp:featuredmedia"][0].source_url}'></a>
                            <div class='description'>
                                <h1><a href="${post.link}">${post.title.rendered}</a></h1>
                                <br>
                                <i><h2>- <a href="${post._embedded.author[0].link}">${post._embedded.author[0].name}</a> (${(new Date(post.date)).toLocaleDateString("en-US", date)})</h2></i>
                            </div>
                        </div>
                    `;      //Insert slides
                    showDivs(slideIndex);       //Display slides
                }
            });
            slideshowContainer.innerHTML += `
            <button class="btn button-left" onclick="plusDivs(-1)">&#10094;</button>
            <button class="btn button-right" onclick="plusDivs(1)">&#10095;</button>`; //add next and prev buttons
        }

    } catch (err) {
        console.error(err.message);
    }
}

getPosts(baseUrl);      //get posts from base url

var slideIndex = 1;

const showDivs = n => {
    var i;
    var posts = document.getElementsByClassName("mySlides");
    if (n > posts.length) {slideIndex = 1}
    if (n < 1) {slideIndex = posts.length}
    for (i = 0; i < posts.length; i++) {
        posts[i].style.display = "none";  
    }
    posts[slideIndex-1].style.display = "block";  
}


let timerId = setInterval(() => plusDivs(1),5000);      //changing slides after every 5seconds

const plusDivs = n => {
    clearInterval(timerId);     //Clearing Interval Timer value after manual slide change
    timerId = setInterval(() => plusDivs(1),5000);  //Reastarting Interval Timer fromz zero after manual slide change
    showDivs(slideIndex += n);
}