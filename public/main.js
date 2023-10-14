const socket =  io.connect("http://localhost:3000")

const message_owner = document.getElementById('message-owner')
const message = document.getElementById('message')
const send_button = document.getElementById('send-button')
const message_display = document.getElementById('message-display')
const activity_area = document.getElementById('activity-area')

send_button.addEventListener('click', () => {
    socket.emit('chat', {
        message: message.value,
        message_owner: message_owner.value
    })
})

socket.on('chat', data => {
    activity_area.innerHTML = ""
    message_display.innerHTML += '<p><strong>' + data.message_owner + ' : </strong>' + data.message + '</p>'
    message.value = ''
})

message.addEventListener('keypress', () => {
    socket.emit('typing', message_owner.value)
})

socket.on('typing', data => {
    activity_area.innerHTML = '<p>' + data + ' yaziyor...</p>'
})