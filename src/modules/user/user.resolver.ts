import { validateEmail } from "../../helpers/function/string";
import { Context } from "../../helpers/graphql/context";
import { UserModel, UserRole } from "./user.model";
import passwordHash from "password-hash";
import { userService } from "./user.service";
export default {
  Query: {
    getAllUser: async (root: any, args: any, context: Context) => {
      console.log("args",args)

      // return await UserModel.find({});
   
      // check permission user if not logged in then throw err 
      //  and check role user not is admin then throw err
      context.auth(["ADMIN","USER"])
     
      const {q} = args;
      return await userService.fetch(q)
    },

    getOneUser: async (root: any, args: any, context: any) => {
      const { id } = args;
     return await userService.findById(id)
    },
  },

  Mutation: {
    createUser: async (root: any, args: any, context: Context) => {
      context.auth(["ADMIN"]).grant(["user.create"])

      const { data } = args;

      const { username, name, email, phone, password, role } = data;

      if (username < 6) {
        throw new Error("username must be at least 6 character");
      }
      if (password < 6) {
        throw new Error("password must be at least 6 character");
      }
      checkEmailIsValid(email);

      await checkUsernameIsExist(username);
      // crete user

      const user = await userService.create({
        username: username,
        name: name,
        email: email,
        password: passwordHash.generate(password),
        role: role,
        phone: phone,
      });

      return user;
    },

    updateUser: async (root: any, args: any, context: Context) => {
      context.auth(["ADMIN"]).grant(["user.update"])

      const { id, data } = args;
      const { email, name, phone } = data;

      

      // check email have is valid

      if (email) {
        checkEmailIsValid(email);
      }
      // update user

      return await userService.update(id,data);
    },
    deleteUser: async (root: any, args: any, context: Context) => {
      context.auth(["ADMIN"]).grant(["user.delete"])

      const {id} = args;
      // check user is exist
      return await userService.delete(id);
    },
  },
};

function checkEmailIsValid(email: any) {
  if (validateEmail(email) == false) {
    throw new Error("email is valid");
  }
}

async function checkUsernameIsExist(username: string) {
  const user = await UserModel.findOne({ username });
  if (user) {
    throw new Error("User is existed");
  }
  return user;
}
