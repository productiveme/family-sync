import { createCookieSessionStorage, redirect } from "@remix-run/node";
    import initializeORM from "~/db";
    import { User } from "~/entities/User";
    import { eq } from "drizzle-orm";
    import { EntityRepository } from "@mikro-orm/sqlite";

    const sessionSecret = process.env.SESSION_SECRET;
    if (!sessionSecret) {
      throw new Error("SESSION_SECRET must be set");
    }

    const storage = createCookieSessionStorage({
      cookie: {
        name: "FamilyCalendar_session",
        secure: process.env.NODE_ENV === "production",
        secrets: [sessionSecret],
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
        httpOnly: true,
      },
    });

    export async function createUserSession(userId: string, redirectTo: string) {
      const session = await storage.getSession();
      session.set("userId", userId);
      return redirect(redirectTo, {
        headers: {
          "Set-Cookie": await storage.commitSession(session),
        },
      });
    }

    export async function getUserSession(request: Request) {
      const session = await storage.getSession(request.headers.get("Cookie"));
      return session.get("userId");
    }

    export async function requireUserId(request: Request) {
      const userId = await getUserSession(request);
      if (!userId) {
        throw redirect("/login");
      }
      return userId;
    }

    export async function getUser(request: Request) {
      const userId = await getUserSession(request);
      if (!userId) return null;

      const orm = await initializeORM();
      const userRepository = orm.em.getRepository(User);
      const user = await userRepository.findOne({ id: userId });
      await orm.close();

      return user;
    }

    export async function logout(request: Request) {
      const session = await storage.getSession(request.headers.get("Cookie"));
      return redirect("/login", {
        headers: {
          "Set-Cookie": await storage.destroySession(session),
        },
      });
    }
