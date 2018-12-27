// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { default as AppLayout } from '../components/Layout/App';

import { AddItem } from '../actions/AddItem';
import { CancelEditItem } from '../actions/CancelEditItem';
import { DeleteItem } from '../actions/DeleteItem';
import { EditItem } from '../actions/EditItem';
import { ItemCompletion } from '../actions/ItemCompletion';
import { SelectEditItem } from '../actions/SelectEditItem';
import { LoadStateLocalStorage } from '../actions/LoadStateLocalStorage';
import { SaveStateLocalStorage } from '../actions/SaveStateLocalStorage';
import { ReorderItem } from '../actions/ReorderItem';

type Props = {
  handleAddItem: Function,
  handleCancelEditItem: Function,
  handleDeleteItem: Function,
  handleEditItem: Function,
  handleItemCompletion: Function,
  handleSelectEditItem: Function,
  handleLoadStateLocalStorage: Function,
  handleSaveStateLocalStorage: Function,
  handleReorderItem: Function,
};

class App extends Component<Props> {
  componentDidMount = () => this.props.handleLoadStateLocalStorage();
  componentDidUpdate = () => this.props.handleSaveStateLocalStorage(this.props.items);

  handleAddItem = itemValue => this.props.handleAddItem(itemValue);
  handleCancelEditItem = () => this.props.handleCancelEditItem();
  handleDeleteItem = selectedItemId => this.props.handleDeleteItem(selectedItemId);
  handleEditItem = modifiedItem => this.props.handleEditItem(modifiedItem);
  handleItemCompletion = modifiedItem => this.props.handleItemCompletion(modifiedItem);
  handleSelectEditItem = id => this.props.handleSelectEditItem(id);
  handleReorderItem = (initialPosition, newPosition) =>
    this.props.handleReorderItem(initialPosition, newPosition);

  render() {
    return <AppLayout {...this.props} />;
  }
}

const mapStateToProps = state => ({
  items: state.todos.items,
  editingItem: state.todos.editingItem,
});

const mapDispatchToProps = {
  handleAddItem: AddItem,
  handleCancelEditItem: CancelEditItem,
  handleDeleteItem: DeleteItem,
  handleEditItem: EditItem,
  handleItemCompletion: ItemCompletion,
  handleSelectEditItem: SelectEditItem,
  handleSaveStateLocalStorage: SaveStateLocalStorage,
  handleLoadStateLocalStorage: LoadStateLocalStorage,
  handleReorderItem: ReorderItem,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
