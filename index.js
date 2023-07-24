
const btn = document.querySelector('.open-btn')
const closeBtn = document.querySelector('.close-btn')
const modal = document.querySelector('.modal-window')
const container = document.querySelector('.container')
const backToTop = document.querySelector('.top')
const nav = document.querySelector('.nav')
const navBtn = document.querySelectorAll(".menu")
const navBar = document.getElementsByClassName("dropdown-content")
const itemContainer = document.querySelector('scroll-box')
const itemBox = document.querySelector('.scroll-container')

console.log(btn.getBoundingClientRect())
// 모달창 열기
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

// 모달창 닫기
function closeModal(){
  modal.classList.remove('show')
  container.classList.remove('show')
  btn.classList.remove('hidden')
  backToTop.classList.remove('hidden')
  document.body.style.overflow = "auto"
  console.log(document.body.clientWidth)
}
//모달창 내 위로가기
function toTop(){
 document.documentElement.scrollTo({top:0, left:0, behavior: 'smooth'})
}
// 스크롤 내렷을때 네비게이션 나오게하기
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

// window.onload = ()=> {
//   backToTop.classList.add('hidden')
//   nav.classList.add('hidden')
//   openModal()
//   setTimeout(() => closeModal(),5000)
// }

//네비게이션 사이드 메뉴 
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


//API 데이터 가져오기 & 마운트
function loadAPI(url){
  return fetch(url)
  .then(response => response.json())
}

function loadAPIData(data){
  return fetch(`http://universities.hipolabs.com/search?country=United+States`)
  .then(response => response.json())
}

function showData(data){
  // console.log(data)
  return new Promise(function(resolve, reject){

    for(let i=0; i < 10; i++){
      // console.log(data[0].domains.web_pages)
      // const data = response
      const images = ["imgs/uni01.avif", "imgs/uni02.avif", "imgs/uni03.avif", "imgs/uni04.avif", "imgs/uni05.avif", "imgs/uni06.avif", "imgs/uni07.avif", "imgs/uni08.avif", "imgs/uni09.avif", "imgs/uni10.avif"]
      const img = document.createElement('img')
      img.className = 'img'
      img.src = images[i]
            
      const contentBox = document.createElement('div')
      contentBox.className = 'content-box'
      contentBox.innerHTML = `<h2>${data[i].name}</h2>
                              <button>More info</button>`
      itemBox.appendChild(contentBox)
      contentBox.appendChild(img)


      const cards = document.querySelector('.cards')
      const detailCard = document.createElement('div')
      detailCard.className = 'details'
      detailCard.style.background = `url(${images[i]}) no-repeat center`
      detailCard.style.backgroundSize = 'cover'
      detailCard.innerHTML = `<h2>${data[i].name}</h2>
                              <p>${data[i].country}</p>
                              <a href = "${data[i].web_pages}">${data[i].web_pages}</a>`
      cards.appendChild(detailCard)
    }
  })
}

loadAPI('http://universities.hipolabs.com/search?country=United+States')
.then(data => loadAPIData(data))
.then(data => showData(data))

// 마우스 스크롤 이벤트 
let isDown = false
let startX
let scrollLeft

itemBox.addEventListener('mousedown', e => {
  isDown = true
  itemBox.classList.add('scroll-active')
  startX = e.pageX - itemBox.offsetLeft
  scrollLeft = itemBox.scrollLeft
})

function deactive(){
  isDown = false
  itemBox.classList.remove('scroll-active')
}

itemBox.addEventListener('mouseleave', deactive)
itemBox.addEventListener('mouseup', deactive)

itemBox.addEventListener('mousemove', e => {
  if(!isDown) return
  e.preventDefault()
  const x= e.pageX -itemBox.offsetLeft
  const walk = x - startX
  itemBox.scrollLeft = scrollLeft - walk
})

// 마우스 호버시 버튼이 자꾸 나옴 수정 필요