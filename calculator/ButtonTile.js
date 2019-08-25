import React from 'react'

class ButtonTile extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.hcApp(this.props.btnName);
  }
  render() {
    return(
      <button id={this.props.id} onClick={this.handleClick}>
        {this.props.btnName}
      </button>
    )
  }
}

export default ButtonTile