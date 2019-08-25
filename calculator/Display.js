import React from 'react'

class Display extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <p className='result' id={this.props.id}>{this.props.result}</p>
    )
  }
}

export default Display