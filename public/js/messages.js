const selector = document.querySelector('select')
const messages = document.querySelectorAll('.message')
const view = document.querySelector('#message-view')

// filter messages based on category
selector.addEventListener('change', e => {
  e.preventDefault()
  let filter = e.target.value
  // if user selects 'all' print all messages to view
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
    // if user selects a specific category print messages to view with only matching category
    while (view.firstChild) {
      view.removeChild(view.firstChild)
    }
    messages.forEach(message => {
      if (message.id == filter) {
        let newMessage = document.createElement('div')
        view.appendChild(newMessage)
        newMessage.classList = 'card'
        newMessage.innerHTML = `<div class='message'>${message.innerHTML}</div>`
      }
    })
  }
})
