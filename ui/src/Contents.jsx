import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import ProductList from './ProductList.jsx';
import ProductView from './ProductView.jsx';
import ProductEdit from './ProductEdit.jsx';
import About from './About.jsx';

const NotFound = () => <h1>Page Not Found</h1>;
export default function Contents() {
  return (
    <Switch>
      <Redirect exact from="/" to="/products" />
      <Route path="/products" component={ProductList} />
      <Route path="/view/:id" component={ProductView} />
      <Route path="/edit/:id" component={ProductEdit} />
      <Route path="/about" component={About} />
      <Route component={NotFound} />
    </Switch>
  );
}
