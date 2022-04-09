import { ApolloServer, gql } from "apollo-server-express";
import config from "config";
import jwt from 'jsonwebtoken';
const users = [
	{ id: 1, name: "nguyen van a", age: 20, friendIds: [1, 2, 3] },
	{ id: 2, name: "nguyen van b", age: 10, friendIds: [1, 2,] },
	{ id: 3, name: "nguyen van c", age: 30, friendIds: [2, 3] },
	{ id: 4, name: "nguyen van d", age: 40, friendIds: [2] },
]
const server = new ApolloServer({
	introspection: true,
	typeDefs: gql`
		type Query {
			getOneUser(id: String!): User
			getAllUser: [User]
		}
		type User {
			id:Int
			name:String
			age:Int
			email:String
			password:String
			view:Int
			comment:Int
			friendIds:[String]
			friends:[User]
		}
		type Mutation {
			setUser(id: String!): String
			login(username:String! , password:String!) : LoginData
		}
		type LoginData {
			user:User
			token:String
		}
    `,
	resolvers: {
		Query: {
			getOneUser: (root, args, context, info) => {
				if (!context.isAuth) {
					throw Error('Unauthenticated!')
				}
				console.log('root', root);
				console.log("context", context);
				context.step = 1;
				return {
					name: "cuong",
					age: 20,
					email: "doduccuong@gmail.com"
				};

			},
			getAllUser: (root, args, context, info) => {
				return users
			}

		},
		Mutation: {
			setUser: (root, args, context, info) => {
				return `Hello ${args.id}`;
			},
			login: (root, args, context, info) => {
				const { username, password } = args;
				if (username != "admin") {
					throw Error("username is not valid");
				}
				if (password != "admin") {
					throw Error("Password is not valid");
				}
				//  generate token
				const token = jwt.sign({ id: 1, name: "cuong" }, config.get("secret"));
				console.log("token", token);

				return {
					user: {
						name: "cuong",
						age: 20,
					},
					token: token
				}
			}
		},
		User: {
			age: (root, args, context) => {
				console.log('root', root);
				console.log('context', context);

				return root.age
			},
			view: (root, args, context) => {
				return 20
			},
			comment: (root, args, context) => {
				return 10
			},
			friends:(root, args, context) => {
				return users.filter(user => root.friendIds.includes(user.id))
			}
		}
	},
	context: ({ req }) => {
		const context: any = {
			isAuth: false
		}
		const token = req.headers["x-token"];
		if (token) {
			try {
				const payload = jwt.verify(token as string, config.get("secret"));
				context.payload = payload;
				context.isAuth = true;
			} catch (err) {
				context.isAuth = false;

			}
		}
		return context;
	}


});

export default server;