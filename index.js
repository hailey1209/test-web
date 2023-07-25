
const btn = document.querySelector('.open-btn')
const closeBtn = document.querySelector('.close-btn')
const modal = document.querySelector('.modal-window')
const container = document.querySelector('.container')
const backToTop = document.querySelector('.top')
const nav = document.querySelector('.nav')
const navBtn = document.querySelectorAll(".menu")
const navBar = document.querySelectorAll("dropdown-content")
console.log(btn.getBoundingClientRect())


// 테마 변경(다크 / 일반)
window.onload = () => {
  const mode = document.querySelector('.mode')
  const icons = document.querySelectorAll('.material-symbols-outlined')
  const menuBtn = document.querySelectorAll('.nav-btn')
  nav
  mode.addEventListener('click', (e) => {
    document.body.classList.toggle('dark')
    nav.classList.toggle('dark')
    
    for(let btn of menuBtn){  //메뉴 버튼이 여러개라서 for문으로 돌려서 하나씩 지정해줌
      btn.classList.toggle('dark')
    }
    for(let icon of icons){  //모드 버튼의 display설정 변경
      icon.classList.contains('show') ? 
      icon.classList.remove('show')
      : icon.classList.add('show')
    }
    console.log(e.target)
  })
}

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
btn.addEventListener('click', openModal)
closeBtn.removeEventListener('click', openModal)
closeBtn.addEventListener('click', closeModal)

//모달창 내 위로가기
function toTop(){
 document.documentElement.scrollTo({top:0, left:0, behavior: 'smooth'})
}
// 스크롤 내렷을때 네비게이션 나오게하기
// function scrollAct(){
//   const pageYOffset = window.pageYOffset
//   if(pageYOffset > 0 && pageYOffset < 60){
//     backToTop.classList.add('hidden')
//     nav.classList.add('hidden')
//   }else if(pageYOffset >= 60){
//     backToTop.classList.remove('hidden')
//     nav.classList.remove('hidden')
//   }
//   // console.log(window.pageYOffset)
// }
// backToTop.addEventListener('click', toTop)
// window.addEventListener('scroll', scrollAct)


//네비게이션 사이드 메뉴 (드롭다운메뉴 안사라지는거 해결해야함)
function showNav(e){
  const menus = document.querySelectorAll('.dropdown-content')
  if(e.target.classList.contains('nav-btn')){
    for(let menu of menus){
      menu.style.display = 'none'
    }
  }
  const classList = ['first', 'second', 'third', 'fourth']
  const target = e.target.classList
  if(target.contains('first')){
    menus[0].style.display = 'block'
  }else if(target.contains('second')){
    menus[1].style.display = 'block'
  }else if(target.contains('third')){
    menus[2].style.display = 'block'
  }else if(target.contains('fourth')){
    menus[3].style.display = 'block'
  }
  return 
}
nav.addEventListener('mouseover', showNav)
nav.removeEventListener('moseleave', showNav)


//API 데이터 가져오기 & 마운트
function loadAPI(url){
  return fetch(url)
  .then(response => response.json())
}

function loadAPIData(data){
  return fetch(`http://universities.hipolabs.com/search?country=United+States`)
  .then(response => response.json())
}

const itemContainer = document.querySelector('scroll-box')
const itemBox = document.querySelector('.scroll-container')

function showData(data){
  // console.log(data)
  return new Promise(function(resolve, reject){

    for(let i=0; i < 10; i++){
      // console.log(data[0].domains.web_pages)
      // const data = response
            
      const contentBox = document.createElement('div')
      contentBox.className = 'content-box'

      const content = document.createElement('div')
      content.className = 'content'
      content.innerHTML = `<h2>${data[i].name}</h2>
                           <button class="popup">More info</button>`
      contentBox.appendChild(content)
      
      const images = ["imgs/uni01.avif", "imgs/uni02.avif", "imgs/uni03.avif", "imgs/uni04.avif", "imgs/uni05.avif", "imgs/uni06.avif", "imgs/uni07.avif", "imgs/uni08.avif", "imgs/uni09.avif", "imgs/uni10.avif"]
      const img = document.createElement('img')
      img.className = 'img'
      img.src = images[i]
      contentBox.appendChild(img)
      itemBox.appendChild(contentBox)

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

//card click event
const popupBtn = document.querySelectorAll('.scroll-box .scroll-container .content-box')
const cards = document.querySelectorAll('.details')
console.log(cards)
console.log(popupBtn)
// function popup(e){
//   if(e.target.classList.contains('popup')){
//     for(let card of cards){
//       card.classList.add('show')
//     }
//   }
// }
// cards.addEventListener('click', popup)

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


