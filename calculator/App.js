import React from 'react'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result : '0'
    }
    this.handleClickApp = this.handleClickApp.bind(this);
    this.clear = this.clear.bind(this);
    this.back = this.back.bind(this);
    this.calculate = this.calculate.bind(this);
    this.isOp = this.isOp.bind(this);
  }
  clear() {
    this.setState({
      result : '0'
    })
  }
  back() {
    this.setState((prevState) => {
      if(prevState.result === '0' || prevState.result === '') {
        return ({
          result : '0'
        })
      } else {
        var s = prevState.result.slice(0,-1);
        return ({
          result : s === '' ? '0' : s
        });
      }
      });
  }
  calculate() {
    try {
            this.setState({
                // eslint-disable-next-line
                result: (eval(this.state.result) || "" ) + ""
            })
        } catch (e) {
              if (e instanceof SyntaxError) {
                alert(e.message);
              } else {
                 //throw( e );
                console.log(e.name);
                console.log(e.message);
              }
          this.setState({
            result: "error"
          })
      }
  }
  isOp(str) {
    if(str === '+' || str === '-' || str === '*' || str === '/') {
      return true;
    }
    return false;
  }
  
  handleClickApp(btnClicked) {
    if(btnClicked === 'C') {
      this.clear();
    } else if(btnClicked === 'Back') {
      this.back();
    } else if(btnClicked === '=') {
      this.calculate();
    } else if (btnClicked === '.') {
          
        this.setState((prevState) => {    
            if (prevState.result.indexOf('.') !=-1 &&              prevState.result.match(/\/|\*|\+|-/g) === null ||     prevState.result.substring(prevState.result.length-1, prevState.result.length) == '.') {
              return({
                result: prevState.result
              })  ;
            } else {
              return({
                result: prevState.result + btnClicked
              })  ;
          } 
        });
      } else if(this.isOp(btnClicked)) {
        
          this.setState((prevState) => {
            var s = prevState.result[prevState.result.length-1];
            console.log("s = " + s);
            if(this.isOp(s) && btnClicked !== '-') {
              var prev = prevState.result;
              var last = prev[prev.length-1];
              while(this.isOp(last)) {
                prev = prev.substring(0, prev.length-1);
                last = prev[prev.length-1];
              }
              
              return ({
                result: prev + btnClicked
              })
            } else {
                return ( {
                  result:prevState.result+btnClicked
                }           
               )
            }
          });
        
      } else {  
        
      this.setState((prevState) => {
        if(prevState.result === '0') {
          if(this.isOp(btnClicked)) {
            return({
              result: prevState.result+btnClicked
            });
          } else {
            return({
              result: btnClicked
            })
          }
        } 
        else {
           return({
             result: prevState.result+btnClicked
           })  ;
        }
        
      });
    }
    
  }
  render() {
    return(
      <div className='calculator'>
        <Display id='display' result={this.state.result}/>
        <div className='button'>
          <ButtonTile id='zero' btnName='0' hcApp={this.handleClickApp}/>
          <ButtonTile id='one' btnName='1' hcApp={this.handleClickApp}/>
          <ButtonTile id='two' btnName='2' hcApp={this.handleClickApp}/>
          <ButtonTile id='three' btnName='3' hcApp={this.handleClickApp}/>
          <ButtonTile id='four' btnName='4' hcApp={this.handleClickApp}/>
          <ButtonTile id='five' btnName='5' hcApp={this.handleClickApp}/>
          <ButtonTile id='six' btnName='6' hcApp={this.handleClickApp}/>
          <ButtonTile id='seven' btnName='7' hcApp={this.handleClickApp}/>
          <ButtonTile id='eight' btnName='8'hcApp={this.handleClickApp} />
          <ButtonTile id='nine' btnName='9' hcApp={this.handleClickApp}/>
          <ButtonTile id='add' btnName='+' hcApp={this.handleClickApp}/>
          <ButtonTile id='subtract' btnName='-' hcApp={this.handleClickApp}/>
          <ButtonTile id='multiply' btnName='*' hcApp={this.handleClickApp}/>
          <ButtonTile id='divide' btnName='/' hcApp={this.handleClickApp}/>
          <ButtonTile id='equals' btnName='=' hcApp={this.handleClickApp}/>
          <ButtonTile id='decimal' btnName='.' hcApp={this.handleClickApp}/>
          <ButtonTile id='clear' btnName='C' hcApp={this.handleClickApp}/>
          <ButtonTile id='back' btnName='Back' hcApp={this.handleClickApp}/>
        </div>
       </div> 
      
    )
  }
}
export default App
