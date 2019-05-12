import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
  } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register }  from '../../actions/authActions';
import { clearErrors }  from '../../actions/errorActions';


class RegisterModal extends React.Component {
  state = {
    modal: false,
    name: '',
    email: '',
    password: '',
    msg: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps){
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      //check for register error
      if (error.id === 'REGISTER_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null })
      }
    }

    //if authenticated close modal
    if (this.state.modal) {
      if (isAuthenticated) {
        this.toggle();
      }
    }
  }

  toggle = () => {
    //clear errors
    this.props.clearErrors();
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

    const { name, email, password } = this.state;

    //create user object
    const newUser = {
      name,
      email,
      password
    };

    //attemp to register
    this.props.register(newUser);


  };

  render(){
    return(
      <div>
        <NavLink onClick={this.toggle} href="#">
          Register
        </NavLink>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
            { this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="name">Name</Label>
                <br/>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  onChange={this.onChange}
                />
                <br/>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email@email.com"
                  onChange={this.onChange}
                />
                <br/>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your Password"
                  onChange={this.onChange}
                />
                <Button
                  color="dark"
                  style={{marginTop: '2rem'}}
                  block
                >Register</Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { register, clearErrors })(RegisterModal);
