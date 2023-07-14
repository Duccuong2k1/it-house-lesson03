import { validateEmail } from "../../helpers/function/string";
import { UserModel } from "./user.model";
import passwordHash from "password-hash";
export default {
  Query: {
    getAllUser: async (root: any, args: any, context: any) => {
      return await UserModel.find({});
    },

    getOneUser: async (root: any, args: any, context: any) => {
      const { id } = args;
      const user = await UserModel.findById(id);
      if (!user) {
        throw new Error("user not found");
      }

      return user;
    },
  },

  Mutation: {
    createUser: async (root: any, args: any, context: any) => {
      const { data } = args;

      const { username, name, email, phone, password, role } = data;

      if (username < 6) {
        throw new Error("username must be at least 6 character");
      }
      if (password < 6) {
        throw new Error("password must be at least 6 character");
      }
      if (validateEmail(email) == false) {
        throw new Error("username must be at least 6 character");
      }

      await checkUsernameIsExist(username);
      // crete user

      const user = await UserModel.create({
        username: username,
        name: name,
        email: email,
        password: passwordHash.generate(password),
        role: role,
        phone: phone,
      });

      return user;
    },
  },
};

async function checkUsernameIsExist(username: string) {
  const user = await UserModel.findOne({ username });
  if (user) {
    throw new Error("User is existed");
  }
  return user;
}
