import React from 'react'


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      displayText : 'Hello'
    }
    this.updateText = this.updateText.bind(this);
  };
  updateText(soundName) {
    console.log("update text in App" + soundName);
    this.setState({
      displayText : soundName
    }
  )
  }
  render() {
    const buttonArea = arrayItems.map(item => {
      return (
        <Tile item={item} updateTextMethod={this.updateText} /> 
      )
    });
    return (
      <div id='drum-machine' position='relative'>
          <div>
            {buttonArea}
          </div>  
          <p id='display'>{this.state.displayText}</p>
      </div>
    );
  }
}

export default App