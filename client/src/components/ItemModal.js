import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
  } from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import PropTypes from 'prop-types';


class ItemModal extends React.Component {
  state = {
    modal: false,
    name: '',
    direccion: '',
    telf: ''
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      [e.target.direccion]: e.target.value,
      [e.target.telf]: e.target.value
    });
  }


  onSubmit = e => {
    e.preventDefault();

    const newItem = {
      name: this.state.name,
      direccion: this.state.direccion,
      telf: this.state.telf
    }
    // add item via additem action
    this.props.addItem(newItem);

    // Close Modal
    this.toggle();
  };

  render(){
    return(
      <div>
        {this.props.isAuthenticated ?
          <Button
            color="dark"
            style={{marginBottom: '2rem'}}
            onClick={this.toggle}
          >New Place</Button>
        : <h4 className="mb-3 ml-4">Please log in to manage items</h4>}


        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>Add to Directory</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">New Place</Label>
                <br/>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Escriba el nombre del lugar"
                  onChange={this.onChange}
                />
                <br/>
                <Input
                  type="text"
                  name="direccion"
                  id="item"
                  placeholder="direccion"
                  onChange={this.onChange}
                />
                <br/>
                <Input
                  type="text"
                  name="telf"
                  id="item"
                  placeholder="Telefono"
                  onChange={this.onChange}
                />
                <Button
                  color="dark"
                  style={{marginTop: '2rem'}}
                  block
                >Add New Place</Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { addItem })(ItemModal);
