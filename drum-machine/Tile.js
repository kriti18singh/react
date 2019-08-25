import React from 'react'

class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown)
        window.focus()
  }
  handleClick() {
    console.log("drum pad click" + this.props.item.id);
    this.audio.play();
    this.props.updateTextMethod(this.props.item.id);
  }
  handleKeyDown(e) {
    console.log("key down");
    if(e.keyCode === this.props.item.keyCode) {
            this.audio.play()
            this.props.updateTextMethod(this.props.item.id);
    }
  }
  render() {
    return (
      <button className="drum-pad button" id={this.props.item.keyCode} onClick={this.handleClick} onKeyDown={this.handleKeyDown}>
        {this.props.item.keyName}
        <audio
          ref={ref => this.audio = ref}
          id={this.props.item.keyName}
          className="clip"
          src={this.props.item.url}>
        </audio>
      </button>
    );
  }
}

export default Tile