import React from 'react';
import { Container,
         ListGroup,
         ListGroupItem,
         Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';


class Directorio extends React.Component {
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  }

  componentDidMount() {
    this.props.getItems();
  }

  onDeleteClick = (id) => {
    this.props.deleteItem(id);
  }

  render(){

    const { items } = this.props.item;
    return(
      <Container>
        <ListGroup>
          <TransitionGroup className="directorio-list">
            {items.map(({ _id, name, direccion, telf }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  Nombre: {name}<br/>
                  Direccion: {direccion}<br/>
                  Telefono: {telf}<br/>
                  { this.props.isAuthenticated ?
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={this.onDeleteClick.bind(this, _id)}
                  >Delete &times;
                  </Button>
                  : null}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

// another way to do it
// Directorio.propTypes = {
//   getItems: PropTypes.func.isRequired,
//   item: PropTypes.object.isRequired
// }

const mapStateToProps = (state) => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { getItems, deleteItem })(Directorio);
