export default {
    Query:{
        
        getDistrict: async (root:any, args:any, context:any) => {
            return [
                {id:1,name:"Quan 1"}
            ]
        },
        getWarn: async (root:any, args:any, context:any) => {
            return [
                {id:1,name:"phuong 25"}
            ]
        }
    }
}