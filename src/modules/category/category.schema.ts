import { gql } from "apollo-server-express";


export default gql`
    

    extend type Query {
        getAllCategory(q:QueryInput): CategoryPageData
        getOneCategory(id:ID!): Category
    }

  

    extend type Mutation {
        createCategory(data: CreateCategoryInput!): Category
        updateCategory(id: ID!, data: UpdateCategoryInput!): Category
        deleteCategory(id: ID!): Boolean
    }

    type CategoryPageData{
        data:[Category]
        pagination:Pagination
    }
    type Category {
        id:ID!
        createdAt:DateTime
        updatedAt:DateTime
        name:String!

      
        description: String
        "trang thái"
        active: Boolean
        "mã sản phẩm"
        productIds: [ID] 
        "ưu tiên"
        priority: Int 

        "san pham"
        products:[Product]
       
    }


    input CreateCategoryInput {
        name:String
        description: String
        "trang thái"
        active: Boolean
        "mã sản phẩm"
        productIds: [ID] 
        "ưu tiên"
        priority: Int 
        
    }
    input UpdateCategoryInput {
        name:String
        description: String
        "trang thái"
        active: Boolean
        "mã sản phẩm"
        productIds: [ID] 
        "ưu tiên"
        priority: Int 
       
    }
`;
