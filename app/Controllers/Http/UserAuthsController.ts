import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import UserRegisterValidator from "App/Validators/UserRegisterValidator";
import User from "App/Models/User";
import { schema, rules } from "@ioc:Adonis/Core/Validator";

export default class UserAuthsController {
  public async register({ request, response }: HttpContextContract) {
    const payload = await request.validate(UserRegisterValidator);

    await User.create(payload);
    return response.json({
      status: 200,
      message: "User Created successfully!",
    });
  }

  public async login({ request, response, auth }: HttpContextContract) {
    const loginSchema = schema.create({
      email: schema.string({ trim: true }, [rules.email()]),
      password: schema.string({ trim: true }),
    });

    const payload = await request.validate({ schema: loginSchema });
    try {
      const token = await auth
        .use("api")
        .attempt(payload.email, payload.password, {
          expiresIn: "90days",
        });
      return token.toJSON();
    } catch (error) {
      return response.json({ status: 400, message: "Invalid Credentials" });
    }
  }
  public async adminLogin({ request, response, auth }: HttpContextContract) {
    const loginSchema = schema.create({
      email: schema.string({ trim: true }, [rules.email()]),
      password: schema.string({ trim: true }),
    });

    const payload = await request.validate({ schema: loginSchema });
    try {
      const token = await auth
        .use("admin")
        .attempt(payload.email, payload.password, {
          expiresIn: "90days",
        });
      return token.toJSON();
    } catch (error) {
      return response.json({ status: 400, message: "Invalid Credentials" });
    }
  }
}
