const selector = document.querySelector('select')
const messages = document.querySelectorAll('.message')
const view = document.querySelector('#message-view')

selector.addEventListener('change', e => {
  e.preventDefault()
  console.log(messages)
  let filter = e.target.value
  console.log(filter)
  if (filter === 'all') {
    while (view.firstChild) {
      view.firstChild.removeChild(view.firstChild)
    }
    messages.forEach(message => {
      let newMessage = document.createElement('div')
      view.appendChild(newMessage)
      newMessage.classList = 'card'
      newMessage.innerHTML = `<div class='message'>${message.innerHTML}</div>`
    })
  } else {
    while (view.firstChild) {
      view.removeChild(view.firstChild)
    }
    messages.forEach(message => {
      console.log(filter, message)
      if (message.id == filter) {
        let newMessage = document.createElement('div')
        view.appendChild(newMessage)
        newMessage.classList = 'card'
        newMessage.innerHTML = `<div class='message'>${message.innerHTML}</div>`
      }
    })
  }
})
