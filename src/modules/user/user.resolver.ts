import { validateEmail } from "../../helpers/function/string";
import { UserModel } from "./user.model";
import passwordHash from "password-hash";
export default {
  Query: {
    getAllUser: async (root: any, args: any, context: any) => {
      // return await UserModel.find({});
      const {q} = args;
      return await fetch(q)
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
      checkEmailIsValid(email);

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

    updateUser: async (root: any, args: any, context: any) => {
      const { id, data } = args;
      const { email, name, phone } = data;

      // check user is exist
      const user = await UserModel.findById(id);
      if (!user) {
        throw new Error("User not found");
      }

      // check email have is valid

      if (email) {
        checkEmailIsValid(email);
      }
      // update user

      return await UserModel.findByIdAndUpdate(
        id,
        {
          $set:  data ,
        },
        { new: true }
      );
    },
    deleteUser: async (root: any, args: any, context: any) => {
      const {id} = args;
      // check user is exist
      const user = UserModel.findById(id);
      if(!user) throw new Error("User is not exist");
      await UserModel.findByIdAndDelete(id);
      return true;
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
type QueryInput = {
  limit?:number
  page?:number
  order?:any
  filter?:any
  search?:string
}

async function fetch(queryInput: QueryInput, select?: string) {

  const limit = queryInput.limit || 10;
  const skip = ((queryInput.page || 1 ) - 1) * limit || 0;
  const order = queryInput.order;
  const search = queryInput.search;
  const model = UserModel;
  const query = UserModel.find();

  // if (search) {
  //   if (search.includes(" ")) {
  //     set(queryInput, "filter.$text.$search", search);
  //     query.select({ _score: { $meta: "textScore" } });
  //     query.sort({ _score: { $meta: "textScore" } });
  //   } else {
  //     const textSearchIndex = this.model.schema
  //       .indexes()
  //       .filter((c: any) => values(c[0]!).some((d: any) => d == "text"));
  //     if (textSearchIndex.length > 0) {
  //       const or: any[] = [];
  //       textSearchIndex.forEach((index) => {
  //         Object.keys(index[0]!).forEach((key) => {
  //           or.push({ [key]: { $regex: search, $options: "i" } });
  //         });
  //       });
  //       set(queryInput, "filter.$or", or);
  //     }
  //   }
  // }

  if (order) {
    query.sort(order);
  }
  if (queryInput.filter) {
    const filter = JSON.parse(
      JSON.stringify(queryInput.filter).replace(/\"(\_\_)(\w+)\"\:/g, `"$$$2":`)
    );
    query.setQuery({ ...filter });
  }
  const countQuery = model.find().merge(query);
  query.limit(limit);
  query.skip(skip);
  // console.time("Fetch");
  // console.time("Count");
  if (select) {
    query.select(select);
  }
  return await Promise.all([
    query.exec().then((res) => {
      // console.timeEnd("Fetch");
      return res;
    }),
    countQuery.count().then((res) => {
      // console.timeEnd("Count");
      return res;
    }),
  ]).then((res) => {
    return {
      data: res[0],
      pagination: {
        page: queryInput.page || 1,
        limit: limit,
        total: res[1],
      },
    };
  });
}