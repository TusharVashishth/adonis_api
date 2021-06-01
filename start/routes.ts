/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";
import User from "App/Models/User";
import Mail from "@ioc:Adonis/Addons/Mail";

Route.get("/", async () => {
  return { hello: "world" };
}).prefix("/adonis-api");

Route.group(() => {
  Route.post("/register", "UserAuthsController.register");
  Route.post("/login", "UserAuthsController.login");
  Route.post("/admin/login", "UserAuthsController.adminLogin");
  Route.get("/dashboard", async ({ auth }) => {
    return auth.use("api").user;
  }).middleware("auth:api");
  Route.get("/admin/dashboard", async ({ auth }) => {
    return auth.use("admin").user;
  }).middleware("auth:admin");

  Route.resource("posts", "PostsController");
  Route.get("/user/post", async () => {
    const data = await User.query()
      .where("id", 1)
      .preload("posts", (query) => {
        query.orderBy("id", "desc");
      })
      .paginate(1);
    // const user = await User.find(1);
    // const withPost = user?.related("posts").query();
    // return withPost;
    return data;
  });
}).prefix("/adonis-api/api");

Route.post("/test-mail", async () => {
  await Mail.sendLater((msg) => {
    msg
      .from("tusharpandit01@gmail.com")
      .to("tusharvashisth4@gmail.com")
      .subject("Adonis Test Mail");
  });

  return "Mail sent successfully!";
}).prefix("/adonis-api");
