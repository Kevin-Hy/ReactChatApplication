import React from "react";
import { socket } from "../App";

class MessageArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alltext: [...this.props.alltext]
    };
  }

  componentDidUpdate() {
    let msgArea = document.getElementById("messageArea");
    msgArea.scrollTop = msgArea.scrollHeight;
  }
  componentDidMount() {
    socket.on("response", data => {
      this.setState({ alltext: [...this.state.alltext, data] });
    });
  }

  render() {
    return (
      <div id="messageArea">
        <b id="head">Chat Log:</b>
        <br />
        {this.state.alltext !== []
          ? this.state.alltext.map((val, ctr) => {
              return (
                <div className="entry" key={ctr}>
                  <p>
                    <b>{val.sender}</b> : {val.msg} - <small>{val.time}</small>
                  </p>
                  <br />
                </div>
              );
            })
          : "no room"}
      </div>
    );
  }
}

export default MessageArea;
