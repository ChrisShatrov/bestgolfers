import React, {Component} from 'react';
import './GolferTile.css';
import {Well} from 'react-bootstrap';

class GolferTile extends Component {
  render () {
    const noProfilePic = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4ULoM9z723ea6OGb8xHJpuYBVmVvVjPj-hfl-vkARcpVxrveqxg';
    // Checking if url contains an image or not
    const logo = this.props.golfersAvatarUrl.match(/\.(jpeg|jpg|gif|png)$/) != null ? this.props.golfersAvatarUrl : noProfilePic;
    return (
      <Well className="golfers-well" bsSize="large">
        <img src={logo} className="golfers-img" />
        <div className="golfers-name">{this.props.golfersName}</div>
        <div className="golfers-username">{this.props.golfersUsername}</div>
        <div className="golfers-desc">
          {this.props.golfersCatchPhrase}
        </div>
        <span
          className="close-x"
          onClick={() => this.props.handleShowDelete(this.props.golfersName, this.props.golfersId)}
        />
      </Well>
    );
  }
}

export default GolferTile;
