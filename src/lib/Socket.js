export default class Socket {
  constructor (config) {
    const {callback, symbol} = config
    this.socket = {}
    this.callback = callback
    this.server = 'stream.binance.cloud'
    this.port = 9443
    this.param = `ws/${symbol}@depth20`
  }
  connect () {
    if (this.socket.readyState === 0 ||
        this.socket.readyState === 1) {
          return;
        }
    this.connect_();
  }

  connect_ () {
    const url = `wss://${this.server}:${this.port}/${this.param}`
    this.socket = new WebSocket(url)
    this.socket.onopen = this.onopen
    this.socket.onmessage = (e) => {
      this.callback(e)
    }
    this.socket.onerror = this.onerror
    this.socket.onclose = this.onclose
    return this.socket
  }

  disconnect (event) {
    if (
        this.socket.readyState === 2 ||
        this.socket.readyState === 3) {
          return;
        }
    this.disconnect_(event);
  }

  disconnect_ (event) {
    this.socket.close(1000)
    return this.socket
  }

  onmessage (event) {
    this.callback(event)
    console.log(event)
  }
  onopen (event) {
    console.log(event)
    console.log('websocket opened.');
  }
  onclose (event) {
    console.log(event)
    console.log('websocket closed.')
  }
  onerror (event) {
    console.log(event)
  }
}
