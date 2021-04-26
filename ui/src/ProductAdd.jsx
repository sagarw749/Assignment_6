import React from 'react';
import {
  Form, FormControl, FormGroup, ControlLabel, ButtonToolbar, Button,
  Row, Col,
} from 'react-bootstrap';

export default class ProductAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.productAdd;
    const price = form.price.value.replace('$', '');
    const product = {
      name: form.productName.value,
      price: price > 0 ? price : 0,
      category: form.category.value,
      image: form.imageURL.value,
    };
    console.log(product); // eslint-disable-line no-console
    const { createProduct } = this.props;
    createProduct(product);
    form.productName.value = '';
    form.price.value = '$';
    form.category.selectedIndex = 0;
    form.imageURL.value = '';
  }

  render() {
    return (
      <Form name="productAdd" onSubmit={this.handleSubmit}>
        <Row>
          <Col xs={6} sm={4} md={3} lg={2}>
            <FormGroup>
              <ControlLabel>Category</ControlLabel>
              <FormControl
                componentClass="select"
                name="category"
              >
                <option value="Shirts">Shirts</option>
                <option value="Jeans">Jeans</option>
                <option value="Jackets">Jackets</option>
                <option value="Sweaters">Sweaters</option>
                <option value="Accessories">Accessories</option>
              </FormControl>
            </FormGroup>
          </Col>
          <Col xs={6} sm={4} md={3} lg={2}>
            <FormGroup>
              <ControlLabel>Price Per Unit</ControlLabel>
              <FormControl type="text" name="price" defaultValue="$" />
            </FormGroup>
          </Col>
          <Col xs={6} sm={4} md={3} lg={2}>
            <FormGroup>
              <ControlLabel>Product Name</ControlLabel>
              <FormControl type="text" name="productName" />
            </FormGroup>
          </Col>
          <Col xs={6} sm={4} md={3} lg={2}>
            <FormGroup>
              <ControlLabel>Image URL</ControlLabel>
              <FormControl type="text" name="imageURL" />
            </FormGroup>
          </Col>
          <Col xs={6} sm={4} md={3} lg={2}>
            <FormGroup>
              <ControlLabel>&nbsp;</ControlLabel>
              <ButtonToolbar>
                <Button bsStyle="primary" type="submit">Add Product</Button>
              </ButtonToolbar>
            </FormGroup>
          </Col>
        </Row>
      </Form>
    );
  }
}
