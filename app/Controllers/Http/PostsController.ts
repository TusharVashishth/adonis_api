import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Post from "App/Models/Post";
import PostValidator from "App/Validators/PostValidator";
import Application from "@ioc:Adonis/Core/Application";
import Env from "@ioc:Adonis/Core/Env";

export default class PostsController {
  public async index({}: HttpContextContract) {
    const posts = await Post.query().preload("user").orderBy("id", "desc");
    return posts;
  }

  public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(PostValidator);
    const fileName = Date.now() + "." + payload?.image?.extname;
    await payload?.image.move(Application.publicPath("images"), {
      name: fileName,
    });
    payload.image = fileName;
    payload.image_url = Env.get("DOMAIN") + "/images/" + fileName;

    await Post.create(payload);
    return response.json({
      status: 200,
      message: "Post Created successfully!",
    });
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
