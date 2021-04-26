import React from 'react';
import { Panel } from 'react-bootstrap';

import ProductTable from './ProductTable.jsx';
import ProductAdd from './ProductAdd.jsx';
import graphQLFetch from './graphQLFetch.js';
import Toast from './Toast.jsx';

export default class ProductList extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      toastVisible: false,
      toastMessage: '',
      toastType: 'info',
    };
    this.createProduct = this.createProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.showSuccess = this.showSuccess.bind(this);
    this.showError = this.showError.bind(this);
    this.dismissToast = this.dismissToast.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const vars = {};
    const query = `query {
      productList {
        id category name price image
      }
    }`;

    const result = await graphQLFetch(query, vars, this.showError);
    this.setState({ products: result.productList });
  }

  async createProduct(newProduct) {
    const query = `mutation productAdd($newProduct: ProductInputs!) {
      productAdd(product: $newProduct) {
        id
      }
    }`;

    const response = await graphQLFetch(query, { newProduct }, this.showError);
    if (response) {
      this.loadData();
    }
  }

  async deleteProduct(index) {
    const query = `mutation productDelete($id: Int!) {
      productDelete(id: $id)
    }`;
    const { products } = this.state;
    const { id } = products[index];
    const data = await graphQLFetch(query, { id }, this.showError);
    console.log(data); // eslint-disable-line no-console
    if (data && data.productDelete) {
      this.setState((prevState) => {
        const newList = [...prevState.products];
        newList.splice(index, 1);
        return { products: newList };
      });
      this.showSuccess(`Deleted product ${id} successfully.`);
    } else {
      this.loadData();
    }
  }

  showSuccess(message) {
    this.setState({
      toastVisible: true, toastMessage: message, toastType: 'success',
    });
  }

  showError(message) {
    this.setState({
      toastVisible: true, toastMessage: message, toastType: 'danger',
    });
  }

  dismissToast() {
    this.setState({ toastVisible: false });
  }

  render() {
    const { products } = this.state;
    const { toastVisible, toastType, toastMessage } = this.state;
    return (
      <div>
        <Panel>
          <Panel.Heading>
            <Panel.Title>Showing all available product</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <ProductTable
              products={products}
              deleteProduct={this.deleteProduct}
            />
          </Panel.Body>
        </Panel>
        <h2>Add a new product to inventory</h2>
        <ProductAdd createProduct={this.createProduct} />
        <Toast
          showing={toastVisible}
          onDismiss={this.dismissToast}
          bsStyle={toastType}
        >
          {toastMessage}
        </Toast>
      </div>
    );
  }
}
