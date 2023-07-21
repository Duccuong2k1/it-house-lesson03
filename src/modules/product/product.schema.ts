import { gql } from "apollo-server-express";


export default gql`
    

    extend type Query {
        getAllProduct(q:QueryInput): ProductPageData
        getOneProduct(id:ID!): Product
    }

    extend type Mutation {
        createProduct(data: CreateProductInput!): Product
        updateProduct(id: ID!, data: UpdateProductInput!): Product
        deleteProduct(id: ID!): Boolean
    }

    type ProductPageData{
        data:[Product]
        pagination:Pagination
    }
    type Product {
        id:ID!
        createdAt:DateTime
        updatedAt:DateTime
        name:String
        code: String
        description: String
        "giá gốc"
        basePrice: Float
        "giá bán"
        sellPrice: Float
        images: [String]
        "Id danh mục"
        categoryId: ID
        "lượt xem"
        view: Int
        "thuộc tính"
        attributeIds: [Mixed]
        "trang thái"
        active: Boolean
       
    }


    input CreateProductInput {
        name:String!
        code: String!
        description: String
        "giá gốc"
        basePrice: Float
        "giá bán"
        sellPrice: Float
        images: [String]
        "Id danh mục"
        categoryId: ID
        "thuộc tính"
        attributeIds: [Mixed]
        "trang thái"
        active: Boolean
        
    }
    input UpdateProductInput {
        name:String
        code: String
        description: String
        "giá gốc"
        basePrice: Float
        "giá bán"
        sellPrice: Float
        images: [String]
        "Id danh mục"
        categoryId: ID
       
        "thuộc tính"
        attributeIds: [Mixed]
        "trang thái"
        active: Boolean
       
    }
`;
