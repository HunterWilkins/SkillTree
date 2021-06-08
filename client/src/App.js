import "./reset.css";
import "./style.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from "@apollo/client";

import SkillList from "./components/SkillList";
import EditSkill from "./components/EditSkill";

import {useState, useEffect} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

const httpLink = createHttpLink({uri: "/graphql"});
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client = {client}>

    <div id = "content">
      <h1>SkillTree</h1>
      <main>
        <div>
          <h3>Smasball</h3>
          <h3>Pig Pig Dog Pig Man Pig Dog</h3>
        </div>
        <Router>
          <Switch>
            <Route exact path = "/skill/:id">
              <EditSkill />
            </Route>
            <Route exact path = "*">
              <SkillList />
            </Route>
          </Switch>
        </Router>
      </main>
      <footer>
        Hunter Wilkins
      </footer>
    </div>
    </ApolloProvider>

  );
}

export default App;
