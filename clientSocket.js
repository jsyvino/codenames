import io from 'socket.io-client'
import Game from './components/game'

const socket = io('http://172.17.20.46:8080')  //fullstack
// const socket = io('http://192.168.1.77:8080')  //home

socket.on('connect', () => {
  console.log('OMG I AM Connected!')
})


export default socket