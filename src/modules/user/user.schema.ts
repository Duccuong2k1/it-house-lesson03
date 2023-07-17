import { gql } from "apollo-server-express";
import { UserRole } from "./user.model";

export default gql`
    

    extend type Query {
        getAllUser(q:QueryInput): UserPageData
        getOneUser(id:ID!): User
    }

    # extend type Mutation {
    #     createUser:(data:CreateUserInput!): User
    #     updateUser:(id: ID!, data:UpdateUserInput!): User
    #     deleteUser:(id: ID!): Boolean
    # }

    extend type Mutation {
        createUser(data: CreateUserInput!): User
        updateUser(id: ID!, data: UpdateUserInput!): User
        deleteUser(id: ID!): Boolean
    }

    type UserPageData{
        data:[User]
        pagination:Pagination
    }
    type User {
        id:ID!
        createdAt:DateTime
        updatedAt:DateTime
        "Username"
        username:String 
        "ho ten"
        name:String 
        "so dien thoai"
        phone:String
        "Quyen ${Object.values(UserRole)}"
        role:String 
   
        email:String
    }


    input CreateUserInput {
        "Username"
        username:String!
        "ho ten"
        name:String!
        "so dien thoai"
        phone:String
        "Quyen ${Object.values(UserRole)}"
        role:String
   
        email:String!
        password:String!
    }
    input UpdateUserInput {
        "ho ten"
        name:String
        "so dien thoai"
        phone:String
        email:String
    }
`;
