
const btn = document.querySelector('.open-btn')
const closeBtn = document.querySelector('.close-btn')
const modal = document.querySelector('.modal-window')
const container = document.querySelector('.container')
const backToTop = document.querySelector('.top')
const nav = document.querySelector('.nav')
const navBtn = document.querySelectorAll(".menu")
const navBar = document.getElementsByClassName("dropdown-content")

console.log(btn.getBoundingClientRect())
function openModal(){
  let btnPsition = btn.getBoundingClientRect()
  modal.style.left = (btnPsition.left-250) + 'px'
  modal.style.top =  (btnPsition.bottom +25) +'px'

  modal.classList.add('show')
  container.classList.add('show')
  btn.classList.add('hidden')
  backToTop.classList.add('hidden')
  document.body.style.overflow = 'hidden'
  // document.body.style.padding = '13px'
  console.log(document.body.clientWidth)
  setTimeout(closeModal,5000)
}


function closeModal(){
  modal.classList.remove('show')
  container.classList.remove('show')
  btn.classList.remove('hidden')
  backToTop.classList.remove('hidden')
  document.body.style.overflow = "auto"
  console.log(document.body.clientWidth)
}
function toTop(){
 document.documentElement.scrollTo({top:0, left:0, behavior: 'smooth'})
}
function scrollAct(){
  const pageYOffset = window.pageYOffset
  if(pageYOffset > 0 && pageYOffset < 60){
    backToTop.classList.add('hidden')
    nav.classList.add('hidden')
  }else if(pageYOffset >= 60){
    backToTop.classList.remove('hidden')
    nav.classList.remove('hidden')
  }
  // console.log(window.pageYOffset)
}
  
btn.addEventListener('click', openModal)
closeBtn.removeEventListener('click', openModal)
closeBtn.addEventListener('click', closeModal)
backToTop.addEventListener('click', toTop)
// window.addEventListener('scroll', scrollAct)

window.onload = ()=> {
  // backToTop.classList.add('hidden')
  // // nav.classList.add('hidden')
  // openModal()
  // setTimeout(() => closeModal(),5000)
}

function showNav(e){
  
  if(e.target.classList.contains('nav-btn')){
    const menus = document.querySelectorAll('.dropdown-content')
    for(let i=0; i < menus.length; i++){
      menus[i].style.display = 'none'
    }
  }
  
  const target = e.target.classList
  if(target.contains('first')){
    navBar[0].style.display = 'block'
  }else if(target.contains('second')){
    navBar[1].style.display = 'block'
  }else if(target.contains('third')){
    navBar[2].style.display = 'block'
  }else if(target.contains('fourth')){
    navBar[3].style.display = 'block'
  }
  return
}

nav.addEventListener('mouseover', showNav)
nav.removeEventListener('mouseleave', showNav)

function loadAPI(url){
  return fetch(url)
  .then(response => response.json())
}
function loadAPIData(artists){
  const dataArr = []
  return fetch('http://api.kcisa.kr/API_CNV_048/request?serviceKey=ca1cbaa4-c972-481d-b9af-93c6f89fdd28&numOfRows=10&pageNo=1')
  .then(response => response.json())
  .then(response => dataArr.push.apply(response.artists.items))
  .then(response => console.log(response))
}
function showData(data){
  new Promise(function(resolve,reject) {  
    const scrollContainer = document.querySelector('.scroll-container')
    for( let i=0; i < data.length; i++){
        const respone = data[i]
        const arr =[]
        arr.push(respone.artists, respone.countries, respone.trending, respone.videos)
        console.log(arr)

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
})
}

loadAPI('http://api.kcisa.kr/API_CNV_048/request?serviceKey=ca1cbaa4-c972-481d-b9af-93c6f89fdd28&numOfRows=10&pageNo=1')
.then(data => loadAPIData(data))
.then(data => showData(data))