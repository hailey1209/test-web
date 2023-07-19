const container = document.createElement('div')
      container.className = 'container'

const navContainer = document.createElement('div')
      navContainer.className = 'nav'

const btn1 = document.createElement('button')
      btn1.className = 'nav-btn'
      btn1.innerText = 'Movies'
      navContainer.appendChild(btn1)

const btn2 = document.createElement('button')
      btn2.className = 'nav-btn'
      btn2.innerText = 'Recipes'
      navContainer.appendChild(btn2)

const options = {
    method: "GET",
    url: "https://tasty.p.rapidapi.com/recipes/list",
    params: { from: "0", size: "20", tags: "under_30_minutes" },
    headers: {
      "x-rapidapi-host": "tasty.p.rapidapi.com",
      "x-rapidapi-key": "31276411cfmsh0efd07dc2760712p136b67jsnbcdc93b074f2"
    }
  }
  fetch("https://tasty.p.rapidapi.com/recipes/list", options)
  .then(response => console.log(response))

function loadAPI(url){
    return fetch(url)
            .then(response => response.json())
            // .then(response => console.log(response))
}
function loadAPIData(data){
    return fetch(`https://yts.mx/api/v2/list_movies.json/${data}`)
            .then(response => response.json())
            .then(response => response.data)
            .then(response => response.movies)         
}
function showData(data){
    new Promise(function(resolve,reject) {  
            for( let i=0; i < data.length; i++){
                const respone = data[i]
                const arr =[]
                arr.push(respone.title, respone.medium_cover_image, respone.genres)
                // console.log(arr)

                const card = document.createElement('div')
                card.className = 'card'

                const img = document.createElement('img')
                img.src = respone.medium_cover_image
                card.appendChild(img)

                const title = document.createElement('div')
                title.className ='title'
                title.innerHTML = `<h3>${respone.title}</h3>
                                   <p>${respone.genres}</p>`
                card.appendChild(title)
                container.append(card)
            }
            document.body.append(navContainer)
            document.body.append(container)
        })
}

loadAPI('https://yts.mx/api/v2/list_movies.json')
    .then(data => loadAPIData(data))
    .then(data => showData(data))
