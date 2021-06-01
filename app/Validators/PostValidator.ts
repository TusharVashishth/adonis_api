import { schema, rules } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class PostValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    user_id: schema.number(),
    title: schema.string({ trim: true }, [
      rules.minLength(2),
      rules.maxLength(50),
    ]),
    description: schema.string({ trim: true }, [
      rules.minLength(10),
      rules.maxLength(5000),
    ]),
    image: schema.file({
      size: "1mb",
      extnames: ["jpg", "gif", "png", "jpeg"],
    }),
  });

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages = {};
}
