import React, {Component} from 'react';
import './App.css';
import GolferTile from './../tiles/GolferTile';
import {Col, Grid, Row} from 'react-bootstrap';
import AddNewGolferModal from './../modals/addNewGolfer/AddNewGolferModal';
import DeleteConfirmationModal
  from '../modals/delete/DeleteConfirmationModal';

class ListOfPeople extends Component {
  constructor (props, context) {
    super (props, context);

    this.handleShow = this.handleShow.bind (this);
    this.handleClose = this.handleClose.bind (this);
    this.handleShowDelete = this.handleShowDelete.bind (this);
    this.handleCloseDelete = this.handleCloseDelete.bind (this);
    this.updateFailMessage = this.updateFailMessage.bind (this);
    this.getData = this.getData.bind (this);

    this.state = {
      show: false,
      showDelete: false,
      idToBeDeleted: '',
      nameToBeDeleted: '',
      newGolfer: {
        firstName: '',
        lastName: '',
        username: '',
        catchPhrase: '',
        avatar: '',
      },
      allPeeps: [],
      allPeepsCount: 0,
      showSuccessMessage: false,
      showFailMessage: false,
    };
  }

  handleShow () {
    this.setState ({show: true});
  }

  handleClose () {
    this.setState ({show: false});
  }

  handleShowDelete (name, id) {
    this.setState ({
      idToBeDeleted: id,
      nameToBeDeleted: name,
      showDelete: true,
    });
  }

  handleCloseDelete () {
    this.setState ({showDelete: false});
  }

  updateFailMessage (display) {
    this.setState ({
      showFailMessage: display,
    });
  }

  getData (showSuccessMessage) {
    const that = this;
    fetch ('http://localhost:3004/people/')
      .then (function (response) {
        if (response.status === 404) {
          console.log ('error!!! ' + error);
          that.setState ({
            allPeeps: [],
            allPeepsCount: 0,
            showFailMessage: true,
          });
        }
        return response.json ();
      })
      .then (function (jsonData) {
        that.setState ({
          allPeeps: jsonData,
          allPeepsCount: jsonData.length,
        });
        //auto scrolling to the top of the page
        window.scrollTo (0, 0);
        return JSON.stringify (jsonData);
      })
      .catch (error => {
        console.log ('error!!! ' + error);
        that.setState ({
          allPeeps: [],
          allPeepsCount: 0,
          showFailMessage: true,
        });
      });

    if (showSuccessMessage) {
      const that = this;
      this.setState ({showSuccessMessage: true});
      // Automatically hiding the message after 1 second
      setTimeout (function () {
        that.setState ({showSuccessMessage: false});
      }, 1000);
    }
  }

  componentDidMount () {
    // Getting people's data on render
    this.getData (false);
  }

  render () {
    return (
      <div>
        <hr />
        <div className="head-count-header container">
          <span>
            Head Count:
            {' '}
            {this.state.allPeepsCount ? this.state.allPeepsCount : '0'}
          </span>
          <button onClick={this.handleShow}>Add Golfer</button>
          {this.state.showSuccessMessage
            ? <div className="operation-success">Success!</div>
            : null}
          {this.state.showFailMessage
            ? <div className="operation-fail">
                Oops, something went wrong. Please try again later.
              </div>
            : null}
          <div
            className={
              !this.state.allPeeps.length && !this.state.showFailMessage
                ? 'no-people-found'
                : 'hideThis'
            }
          >
            No people found. Feel free to add some.
          </div>
        </div>
        <div className="list-of-golfer-tiles">
          <Grid>
            <Row className="show-grid">
              {this.state.allPeeps.length > 0 &&
                this.state.allPeeps.map (golfer => (
                  <Col key={golfer.id} xs={12} md={6} lg={4}>
                    <GolferTile
                      handleShowDelete={this.handleShowDelete}
                      golfersId={golfer.id}
                      golfersName={golfer.firstName + ' ' + golfer.lastName}
                      golfersUsername={golfer.username}
                      golfersCatchPhrase={golfer.catchPhrase}
                      golfersAvatarUrl={golfer.avatar}
                    />
                  </Col>
                ))}
            </Row>
          </Grid>
          <AddNewGolferModal
            show={this.state.show}
            onHide={this.handleClose}
            getData={this.getData}
            updateFailMessage={this.updateFailMessage}
          />
          <DeleteConfirmationModal
            showDelete={this.state.showDelete}
            onHideDelete={this.handleCloseDelete}
            getData={this.getData}
            idToBeDeleted={this.state.idToBeDeleted}
            nameToBeDeleted={this.state.nameToBeDeleted}
            updateFailMessage={this.updateFailMessage}
          />
        </div>
      </div>
    );
  }
}

export default ListOfPeople;
