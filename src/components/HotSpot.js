import React, { Component } from "react";
import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";
import { connect } from "react-redux";
import { handleDeleteHotspot, handleEditHotspot } from "../actions/hotspots";

class HotSpot extends Component {
  state = {
    text: "",
    title: ""
  };
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      popoverOpen: false
    };
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }
  handleChange = name => e => {
    this.setState({
      [name]: e.target.value
    });
  };
  deleteHotSpot = e => {
    e.preventDefault();
    const { id, dispatch } = this.props;
    dispatch(handleDeleteHotspot(id));
  };
  editHotspot = e => {
    e.preventDefault();
    const { id, dispatch } = this.props;
    console.log(this.state.title, this.state.text);
    dispatch(handleEditHotspot(this.state.title, this.state.text, id));
  };
  render() {
    const { hotspots } = this.props;
    const { text, title, id, x, y } = hotspots;
    return (
      <div className="row">
        <h3 className="hotspot">{title ? title : "Hotspot   "}</h3>{" "}
        <Button onClick={this.deleteHotSpot}>Delete</Button>
        <a
          className="mark btn-floating pulse red"
          id={id}
          style={{
            position: "absolute",
            top: `${x}px`,
            left: `${y}px`
          }}
        />
        <Popover
          placement="bottom"
          isOpen={this.state.popoverOpen}
          target={id}
          toggle={this.toggle}
        >
          <PopoverHeader>
            {title ? title : <input onChange={this.handleChange("title")} />}
          </PopoverHeader>
          <PopoverBody>
            {text ? (
              text
            ) : (
              <div>
                <input onChange={this.handleChange("text")} />{" "}
                <Button onClick={this.editHotspot}>Enviar</Button>
              </div>
            )}
          </PopoverBody>
        </Popover>
      </div>
    );
  }
}

function mapStateToProps({ hotspots }, { id }) {
  const hotspot = hotspots[id];
  return {
    hotspots: hotspot
  };
}

export default connect(mapStateToProps)(HotSpot);
