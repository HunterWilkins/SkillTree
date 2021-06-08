import "./reset.css";
import "./style.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from "@apollo/client";

import {useState, useEffect} from "react";

const httpLink = createHttpLink({uri: "/graphql"});
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

function App() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    grabSkills();
  }, []);

  function grabSkills() {
    fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({
          query: `
            query {
              skills {
                id,
                name
              }
              users {
                username
              }
            }
          `
        })
    }).then(response => response.json())
    .then(({data}) => {
      console.log(response, data);
      setPosts(data.skills);
    }).catch(err => console.log(err));
  }

  function renderSkills() {
      return( 
      <div id = "skills">
        {
        posts.map(item => {
          return (
            <div key = {"skill-" + item.id} className = "skill">
              <h2>{item.name}</h2>
            </div>
          )
        })
      }
      </div>
      )
  }

  return (
    <ApolloProvider client = {client}>

    <div id = "content">
      <h1>SkillTree</h1>
      <main>
        <div>
          <h3>Smasball</h3>
          <h3>Pig Pig Dog Pig Man Pig Dog</h3>
        </div>
        {
          
          renderSkills()
         
        }
      </main>
      <footer>
        Hunter Wilkins
      </footer>
    </div>
    </ApolloProvider>

  );
}

export default App;
