import { ActionNotify } from './notifyAction.graphql';

import { gql } from "apollo-server-express";


export default gql`
    

    extend type Query {
        getAllNotification(q:QueryInput): NotificationPageData
        getOneNotification(id:ID!): Notification
    }

  


    type NotificationPageData{
        data:[Notification]
        pagination:Pagination
    }
    type Notification {
        id:ID!
        createdAt:DateTime
        updatedAt:DateTime
        userId: ID
        title: String
        body: String
        image: String
        read: Boolean
        createAt: DateTime
        action: ActionNotify
       
    }


  
`;
