import dotenv from 'dotenv';

dotenv.config();

module.exports = {
    secret:"hello-kitty",
    mongo:{
        url:null
    },
    number:123,
    flag:false,
    object:{
        a:1,
        b:2
    },
    array:["123","3434","56456"]
}