import React from 'react';

import graphQLFetch from './graphQLFetch.js';

export default class ProductView extends React.Component {
  constructor() {
    super();
    this.state = {
      product: {},
    };
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `query product($id: Int!) {
      product(id: $id) {
        id category name price image
      }
    }`;

    const { match: { params: { id } } } = this.props;
    const data = await graphQLFetch(query, { id });
    this.setState({ product: data ? data.product : {} });
  }

  render() {
    const { product: { category, image } } = this.state;
    return (
      <img src={image} alt={category} />
    );
  }
}
