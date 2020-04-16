import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '~/pages/SignIn';

import { OrderList, OrderForm } from '~/pages/Orders';
import { DeliverymanList, DeliverymanForm } from '~/pages/Deliveryman';
import { RecipientsList, RecipientsForm } from '~/pages/Recipients';
import Problems from '~/pages/Problems';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/orders" component={OrderList} isPrivate />
      <Route path="/order/new" component={OrderForm} isPrivate />
      <Route path="/order/edit/:id" component={OrderForm} isPrivate />

      <Route path="/deliverymans" component={DeliverymanList} isPrivate />
      <Route path="/deliveryman/new" component={DeliverymanForm} isPrivate />
      <Route
        path="/deliveryman/edit/:id"
        component={DeliverymanForm}
        isPrivate
      />

      <Route path="/recipients" component={RecipientsList} isPrivate />
      <Route path="/recipient/new/" component={RecipientsForm} isPrivate />
      <Route path="/recipient/edit/:id" component={RecipientsForm} isPrivate />

      <Route path="/problems" component={Problems} isPrivate />
      <Route path="/problem/new" component={Problems} isPrivate />

      <Route path="/" component={() => <h1>Erro. Página não existe</h1>} />
    </Switch>
  );
}
