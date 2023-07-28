import { gql } from "apollo-server-express";
import { OrderStatus } from "./order.model";


export default gql`
    

    extend type Query {
        getAllOrder(q:QueryInput): OrderPageData
        getOneOrder(id:ID!): Order
    }

  

    extend type Mutation {
        createOrder(data: CreateOrderInput!): Order
        updateOrder(id: ID!, data: UpdateOrderInput!): Order
        deleteOrder(id: ID!): Boolean
    }

    type OrderPageData{
        data:[Order]
        pagination:Pagination
    }
    type Order {
        id:ID!
        createdAt:DateTime
        updatedAt:DateTime
        code: String
        buyerId: ID
        buyerName: String
        buyerPhone: String
        buyerAddress: String
        buyerLocation: Mixed
        "tong tien"
        subtotal: Float
        "giam gia"
        discount: Float
        shipfree: Float
        amount: Float
        "trang thai don hang ${Object.values(OrderStatus)}"
        status: String
        "ten khuyen mai"
        promotionName: String 
        "code khuyen mai"
        promotionCode: String 
        promotionId: ID
        "diem thuong"
        rewardPoint: Int 
        "su dung diem thuong"
        useRewardPoint: Boolean 
        "giam gia diem thuong"
        rewardPointDiscount: Float 
        items: [OrderItem]

        "nguoi mua"
        buyer:User  
       
    }


    input CreateOrderInput {
      buyerId:String!
        
    }
    input UpdateOrderInput {
      buyerId:String!
       
    }
`;
