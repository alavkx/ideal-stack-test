import { withTRPC } from "@trpc/next";
import { AppType } from "next/dist/shared/lib/utils";
import superjson from "superjson";
import { AppRouter } from "./api/trpc/[trpc]";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};
export default withTRPC<AppRouter>({
  config({ ctx }) {
    if (typeof window !== "undefined") {
      // During client requests
      return {
        transformer: superjson,
        url: "/api/trpc",
      };
    }
    // During SSR below

    // Use SSG-caching for each rendered page
    const ONE_DAY_SECONDS = 60 * 60 * 24;
    ctx?.res?.setHeader(
      "Cache-Control",
      `s-maxage=1, stale-while-revalidate=${ONE_DAY_SECONDS}`
    );

    // The server needs to know your app's full url
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : "http://localhost:3000/api/trpc";

    return {
      transformer: superjson,
      url,
      headers: {
        // Inform server that it's an ssr request
        "x-ssr": "1",
      },
    };
  },
  ssr: true,
})(MyApp);
