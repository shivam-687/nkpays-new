import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "@/utils/api";
import "@/styles/globals.css";
import 'swiper/swiper.css'
import AppLayout from "@/components/layout/AppLayout";
import Footer from "@/components/shared/Footer";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <AppLayout>
      <Component {...pageProps} />
      <Footer/>
      </AppLayout>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
