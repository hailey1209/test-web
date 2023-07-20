
const btn = document.querySelector('.open-btn')
const closeBtn = document.querySelector('.close-btn')
const modal = document.querySelector('.modal-window')
const container = document.querySelector('.container')

function openModal(){
  modal.classList.add('show')
  container.classList.add('show')
  btn.classList.add('hidden')
  document.body.style.overflow = 'hidden'
  
}
function closeModal(){
  modal.classList.remove('show')
  container.classList.remove('show')
  btn.classList.remove('hidden')
  document.body.style.overflow = "auto"
}
btn.addEventListener('click', openModal)
closeBtn.removeEventListener('click', openModal)
closeBtn.addEventListener('click', closeModal)