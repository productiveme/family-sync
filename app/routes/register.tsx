import { json, redirect, type ActionFunctionArgs, type LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
    import { Form, Link, useActionData, useLoaderData } from "@remix-run/react";
    import { eq } from "drizzle-orm";
    import bcrypt from "bcryptjs";
    import { nanoid } from "nanoid";
    import initializeORM from "~/db";
    import { User } from "~/entities/User";
    import { Profile } from "~/entities/Profile";
    import { createUserSession, getUser } from "~/utils/auth.server";
    import Layout from "~/components/Layout";

    export const meta: MetaFunction = () => {
      return [{ title: "Register - FamilySync" }];
    };

    export async function loader({ request }: LoaderFunctionArgs) {
      const user = await getUser(request);
      if (user) return redirect("/");
      return { user: null };
    }

    export async function action({ request }: ActionFunctionArgs) {
      const formData = await request.formData();
      const email = formData.get("email");
      const password = formData.get("password");
      const name = formData.get("name");
      const role = formData.get("role");

      if (
        typeof email !== "string" ||
        typeof password !== "string" ||
        typeof name !== "string" ||
        typeof role !== "string" ||
        !email.includes("@") ||
        password.length < 8
      ) {
        return json(
          { error: "Please provide valid registration information" },
          { status: 400 }
        );
      }

      const orm = await initializeORM();
      const userRepository = orm.em.getRepository(User);
      const existingUser = await userRepository.findOne({ email: email.toLowerCase() });

      if (existingUser) {
        await orm.close();
        return json(
          { error: "A user with this email already exists" },
          { status: 400 }
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const userId = nanoid();

      // Create user and profile in a transaction
      try {
        await orm.em.transactional(async em => {
          const user = new User();
          user.id = userId;
          user.email = email.toLowerCase();
          user.name = name;
          user.role = role as "parent" | "child";
          user.passwordHash = hashedPassword;
          await em.persistAndFlush(user);

          const profile = new Profile();
          profile.user = user;
          profile.color = "#" + Math.floor(Math.random()*16777215).toString(16);
          await em.persistAndFlush(profile);
        });
      } catch (error) {
        await orm.close();
        console.error("Error during registration:", error);
        return json({ error: "Error during registration" }, { status: 500 });
      }
      await orm.close();

      return createUserSession(userId, "/");
    }

    export default function Register() {
      const { user } = useLoaderData<typeof loader>();
      const actionData = useActionData<typeof action>();

      return (
        <Layout user={user}>
          <div className="min-h-[80vh] flex items-center justify-center">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
              <div>
                <h2 className="text-center text-3xl font-bold text-gray-900">
                  Create your account
                </h2>
              </div>
              <Form method="post" className="mt-8 space-y-6">
                {actionData?.error && (
                  <div className="text-red-600 text-center text-sm">
                    {actionData.error}
                  </div>
                )}
                <div className="rounded-md shadow-sm space-y-4">
                  <div>
                    <label htmlFor="name" className="sr-only">
                      Full name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                      placeholder="Full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                      placeholder="Email address"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                      placeholder="Password (min. 8 characters)"
                    />
                  </div>
                  <div>
                    <label htmlFor="role" className="sr-only">
                      Role
                    </label>
                    <select
                      id="role"
                      name="role"
                      required
                      className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    >
                      <option value="">Select role</option>
                      <option value="parent">Parent</option>
                      <option value="child">Child</option>
                    </select>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Create account
                  </button>
                </div>

                <div className="text-center text-sm">
                  <span className="text-gray-600">Already have an account? </span>
                  <Link
                    to="/login"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Sign in here
                  </Link>
                </div>
              </Form>
            </div>
          </div>
        </Layout>
      );
    }
