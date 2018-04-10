/**
 * Created by w on 2018/4/4.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './dragAbsolute.css';

class Drag extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isDragging: false,
      mouseX: 0,
      mouseY: 0,
      left: 0,
      top: 0,
      lastMovedX: 0,
      lastMovedY: 0
    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  componentDidMount() {
    console.log('mount');  //初始化
    this.dragDiv.style.left = '30px';
    this.dragDiv.style.top = '30px';
  }

  handleMouseDown(e) {
    let container = this.container;

    this.setState({
      isDragging: true,
      mouseX: e.clientX - container.offsetLeft,
      mouseY: e.clientY - container.offsetTop
    });
  }

  handleMouseMove(e) {
    const container = this.container;

    if (this.state.isDragging) {
      const movedX = e.clientX - container.offsetLeft - this.state.mouseX;
      const movedY = e.clientY - container.offsetTop - this.state.mouseY;

      const throughX = movedX - this.state.lastMovedX;
      const throughY = movedY - this.state.lastMovedY;

      this.dragDiv.style.left = this.state.left + throughX + 'px';
      this.dragDiv.style.top = this.state.top + throughY + 'px';

      this.setState({
        left: this.state.left + throughX,
        top: this.state.top + throughY,
        lastMovedX: movedX,
        lastMovedY: movedY
      });
    }
  }

  handleMouseUp() {
    this.setState({
      isDragging: false,
    });

  }

  handleMouseLeave() {
    this.setState({
      isDragging: false
    })
  }

  render() {
    return <div>
      <div className="container"
           ref={container => {
             this.container = container
           }}>
        <div className="dragImg"
             ref={dragDiv => {
               this.dragDiv = dragDiv
             }}
             onMouseDown={this.handleMouseDown}
             onMouseMove={this.handleMouseMove}
             onMouseUp={this.handleMouseUp}
             onMouseLeave={this.handleMouseLeave}
        />
      </div>
    </div>
  }
}

ReactDOM.render(<Drag/>, document.getElementById('root'));