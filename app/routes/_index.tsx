import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Layout from "~/components/Layout";
import { getUser } from "~/utils/auth.server";

export const meta: MetaFunction = () => {
  return [
    { title: "FamilySync - Smart Family Calendar" },
    { name: "description", content: "Organize your family's schedule efficiently" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getUser(request);
  return { user };
}

export default function Index() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <Layout user={user}>
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Welcome to FamilySync
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          Keep your family organized and synchronized
        </p>
        {!user && (
          <div className="space-x-4">
            <a
              href="/login"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700"
            >
              Get Started
            </a>
            <a
              href="/about"
              className="inline-block text-blue-600 px-6 py-3 rounded-lg font-medium hover:text-blue-700"
            >
              Learn More
            </a>
          </div>
        )}
      </div>
    </Layout>
  );
}
