import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "@/utils/api";
import "@/styles/globals.css";
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import 'react-modern-drawer/dist/index.css'
import AppLayout from "@/components/layout/AppLayout";
import Footer from "@/components/shared/Footer";
import SiteLoader from "@/components/shared/SiteLoader";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <SiteLoader>
        <AppLayout>
          <Component {...pageProps} />
          <Footer />
        </AppLayout>
      </SiteLoader>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
