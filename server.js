const express = require("express");
const app = express();
const {ApolloServer, gql} = require("apollo-server-express");
const sequelize = require("./config/connection");
const db = require("./models");
const PORT = process.env.PORT || 3001;
// const {apiRoutes} = require("./routes");
const path = require("path");

const server = new ApolloServer({
    typeDefs: gql`
        type User {
            username: String,
            id: ID,
            email: String,
            password: String
        }

        type Skill {
            id: ID,
            name: String,
            level: Int,
            current: String,
            goal: String
        }

        type Category {
            id: ID,
            title: String
        }

        type Query {
            skills: [Skill],
            users: [User],
            categories: [Category]
        }
    `,
    resolvers: {
        Query: {
            skills: async () => {
                return db.Skill.findAll();
            },
            users: async () => {
                return db.User.findAll();
            },
            categories: async () => {
                return db.Category.findAll();
            }

        }
    }
});

server.applyMiddleware({app});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "./client/build")));
}

// app.use("/api", apiRoutes);

app.get("*", (req, res) => {
    console.log("Hitting home route");
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log("App listening on " + PORT);
        console.log("The graphql path is: " + server.graphqlPath);
    });
});