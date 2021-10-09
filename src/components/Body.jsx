import React from 'react';
import { Container } from 'react-bootstrap';
import { Switch, Route } from 'react-router-dom';
import About from './About';
import Dashboard from './Dashboard';

const Body = () => {
  return (
    <Container>
      <main>
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </Switch>
      </main>
    </Container>
  );
};

export default Body;
