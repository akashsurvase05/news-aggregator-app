const apikey="8d612853f7d54fd6b92ede82d668fc42";
const article_area=document.getElementById("news-articles");
let output="";
function getNews(news)
{
    try{
   console.log(news.totalResults)
    if( news.totalResults > 0 )
    { 

    news.articles.forEach(ind=>{
     output+=
    ` <section class="container">
        <li class="article">
            <div>
            <img src="${ind.urlToImage}" class="article-img" alt="${ind.title}"></img>
            </div>
            <h2 class="article-title">${ind.title}</h2>
            <p class="article-description">${ind.description || "Description not available."}</p><br>
            <span class="article-author">${ind.author? ind.author: "unknown"}</span><br>
            <a class="article-link" href="${ind.url}" target="_blank">
            </a>
        </li>
    </section> 
    `;
});

article_area.innerHTML=output;

    

}
else{

    article_area.innerHTML=`<h3 class="not-found">No article was found based on the search.</h3>`;
}
    }//try enddd

    
catch(error){
    alert(error);
    console.log(error);
    
}
}

async function reterieve(searchValueText="")
{
    try{
    article_area.innerHTML='<p class="load">News are  loading...</p>';
    
    if(searchValueText!="")
    {
        url=`https://newsapi.org/v2/everything?q=${searchValueText}&apiKey=${apikey}`;
    }
    else{
        url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=${apikey}`;
    }
    const responce = await fetch(url);
    //console.log(url);
    const result = await responce.json();

    getNews(result);
    //console.log(result);
}
catch(error){
    alert(error);
    console.log(error);
    
}
};


//for passing value to retrive function

async function searchvalue(event){

    if(event.which===13 || event.keycode===13 ||  event.key==="Enter")
    {
        console.log(event);
        console.log(event.which);
        console.log(event.key);
        console.log(event.keycode);
        console.log(event.target.value);

        reterieve(event.target.value);


        
    }
};


//let article=document.getElementById("news-articles");


function start()
{
    console.log("onload")//comment to onload start function
    document.getElementById("search").addEventListener('keypress',searchvalue);
    reterieve();

}

(function(){
    start();
  })();