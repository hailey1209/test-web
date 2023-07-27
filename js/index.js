
const btn = document.querySelector('.open-btn')
const closeBtn = document.querySelector('.close-btn')
const modal = document.querySelector('.modal-window')
const container = document.querySelector('.container')
const backToTop = document.querySelector('.top')
const nav = document.querySelector('.nav')
const navBar = document.querySelectorAll("dropdown-content")
console.log(btn.getBoundingClientRect())
const scroller = new Scroller(false) // 스크롤 객체 생성

window.onload = () => {

  //로딩 페이지 구현
  function loadPage(){
    const loadingPage = document.createElement('div')
    loadingPage.className = 'loading-page'

    const spinnerContainer = document.createElement('div')
    spinnerContainer.className = 'spinner-container'
    spinnerContainer.innerHTML = `<h2>Loading...</h2>
                                  <div class="spinner"></div>`
    loadingPage.appendChild(spinnerContainer)
    document.body.appendChild(loadingPage)
  }
  setTimeout(loadPage, 5000)

  scroller.setScrollPosition({top:0, behavior:'smooth'}) // 새로고침시 페이지 상단으로 올리기
  popModal.classList.add('hidden')

  // 테마 변경(다크 / 일반)
  const mode = document.querySelector('.mode')
  const icons = document.querySelectorAll('.material-symbols-outlined')
  const menuBtn = document.querySelectorAll('.nav-btn')
  const hamBtn = document.querySelector('.hambtn')
  nav
  mode.addEventListener('click', (e) => {
    document.body.classList.toggle('dark')
    nav.classList.toggle('dark')
    hamBtn.classList.toggle('dark')
    
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

  //API 데이터 가져오기 & 마운트
function loadAPI(url){
  return fetch(url)
  .then(response => response.json())
}

function loadAPIData(data){
  return fetch('http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline')
  .then(response => response.json())
}

const itemContainer = document.querySelector('scroll-box')
const itemBox = document.querySelector('.scroll-container')

function showData(data){
  return new Promise(function(resolve, reject){
    for(let i=0; i < data.length; i++){
      // console.log(data[i].name)   
      const contentBox = document.createElement('div')
      contentBox.className = 'content-box'

      const content = document.createElement('div')
      content.className = 'content'
      content.innerHTML = `<h2>${data[i].name}</h2>
                           <button class="popup">More info</button>`
      contentBox.appendChild(content)
      
      const img = document.createElement('img')
      img.className = 'img'
      img.src = data[i].image_link
      contentBox.appendChild(img)
      itemBox.appendChild(contentBox)

      const cards = document.querySelector('.cards')
      const detailCard = document.createElement('div')
      detailCard.className = 'details'
      detailCard.innerHTML = `<img src=${data[i].image_link}>
                              <div>
                              <h2><a href = ${data[i].product_link}>${data[i].name}</a></h2>
                              <p>${data[i].brand}</p>
                              <p>	&#36;${data[i].price}</p>
                              <p>${data[i].description}</p>
                              </div>
                              <button class="pop-close-btn">
                              <span class="material-symbols-outlined Xbtn">close</span>
                              </button>`
      cards.appendChild(detailCard)
    } 
    

    //여러개의 데이터 박스 생성, 무한 스크롤
    const mainContentBox = document.querySelector('.main-content')
    const descriptionCardContainer = document.createElement('div')
    descriptionCardContainer.className = 'description-card-container'
    descriptionCardContainer.innerHTML += getCardList(data.length)
    mainContentBox.appendChild(descriptionCardContainer)
    function getCardList(num){
      let cardList = ''
      for(let i=0; i < num; i++){
        cardList +=`
          <div class="card">
            <div class="img"></div>
            <div class="detail">
              <ul>
                <li class="image"><img src="${data[i].image_link}" alt="product-img"></li>
                <li class="name">${data[i].name}</li>
                <li class="brand">${data[i].brand}</li>
                <li class="price">&#36;${data[i].price}</li>
                <li class="product-url"><a href="${data[i].product_link}"><button>자세히 보기</button></a></li>
              </ul>
            </div>
          </div>`
      }
      return cardList
    }

    //무한 스크롤 구현
    window.addEventListener('scroll', (e) => {
      // 무한스크롤 구현 
      // 브라우저창 높이 : document.documentElement.clientHeight
      // 문서 상단 높이 : window.pageYOffset

      const scrollHeight = Math.max(  //전체 문서 높이(항상 스크롤 이벤트 내부에 있어야 함)
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
      )

      //스크롤을 다 내린경우
      if(Math.abs(scroller.getScrollPosition() + document.documentElement.clientHeight - scrollHeight) < 100){
        console.log('scroll is bottom of browser!')
        descriptionCardContainer.innerHTML += getCardList(data.length)
      }
    })
 
    //card click event
    const popupBtns = document.querySelectorAll('.popup')
    const closeBtns = document.querySelectorAll('.Xbtn')
    const cards = document.querySelectorAll('.details')
      
    for(let i=0; i < popupBtns.length; i++){
        function popup(e){
          cards[i].style.display = "none"
          if(e.target.classList.contains('popup')){
            console.log(e.target)
            cards[i].style.display = "block"
          }
        }
        function closePopup(e){
          if(e.target.classList.contains('Xbtn')){
            console.log(e.target)
            cards[i].style.display = "none"
          }
        }
          popupBtns[i].addEventListener('click',popup)
          closeBtns[i].removeEventListener('click',popup)
          closeBtns[i].addEventListener('click',closePopup)
      }

    // 검색창 검색 키워드 기능
    const productDetail = []
    for(let i=0; i<data.length; i++){
      const productName = data[i].name
      const brandName = data[i].brand
      const category = data[i].category
      const productType = data[i].product_type
      const rating = data[i].rating
      const productArr = {productName, brandName, category, productType, rating}
      productDetail.push(productArr)
    }
    console.log(productDetail)

    const searchBox = document.querySelector('.nav .search-box')
    const searchInput = document.querySelector('.nav .search-box .keyword')
    const dataList = document.querySelector('.data-list')
    const datas = productDetail

    function addData(datas){
      for(let data of datas){
        const item = `<div class="data-item">${data}</div>`
        dataList.innerHTML = dataList.innerHTML + item
      }
    }

    function typeKeyword(e){
      console.log(e.target.value)
      if(e.target.value !== ''){
        console.log('you typed something')
        dataList.classList.add('show')
        console.log(dataList)
      }else{
        console.log('you did not type anything')
        dataList.classList.remove('show')
      }
    }

    addData(datas)
    searchInput.addEventListener('input', typeKeyword)


  })
}

loadAPI('http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline')
.then(data => loadAPIData(data))
.then(data => showData(data))

// 마우스 가로 스크롤 이벤트 
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

// 스크롤 내렷을때 사이드 모달창 나오게하기
const popModal = document.createElement('div')
popModal.className = 'pop-modal'
popModal.innerHTML = `<p>Now you're on '---'</p>
                      <button>
                      <span class="material-symbols-outlined side-modal-close">close</span>
                      </button>`
document.body.appendChild(popModal)

function scrollAct(e){
  const pageYOffset = window.pageYOffset
  // console.log(pageYOffset)
  if(pageYOffset > 0 && pageYOffset < 300 ){
    popModal.classList.add("hidden")
  }else if(pageYOffset > 300){
    popModal.classList.remove("hidden")
  }
}

const sideModalboxCloseBtn = document.querySelector('.pop-modal button')
function closeSideModal(e){
  console.log(e.target)
  if(e.target.classList.contains('side-modal-close')){
    popModal.classList.add('hidden')
  }
}

backToTop.addEventListener('click', toTop)
window.addEventListener('scroll', scrollAct)
sideModalboxCloseBtn.removeEventListener('click', scrollAct)
sideModalboxCloseBtn.addEventListener('click', closeSideModal)


//네비게이션 사이드 메뉴 (드롭다운메뉴 안사라지는거 해결해야함)  forEach로 해보기
const menus = document.querySelectorAll('.dropdown-content')
const navBtns = document.querySelectorAll(".menu")

for(let i=0; i <menus.length; i++){
  function showNav(e){
    if(e.target.classList.contains('nav-btn')){
      menus[i].style.display = 'none'
    }
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

  function hiddenMenuBox(){
    if(!e.target.classList.contains('nav-btn')){
      menus[i].style.display = 'none'
    }
  }
  nav.addEventListener('mouseover', showNav)
  nav.removeEventListener('moseleave', showNav)
  nav.addEventListener('moseleave', hiddenMenuBox)
}