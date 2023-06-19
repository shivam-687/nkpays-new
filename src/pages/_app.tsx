import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "@/utils/api";
import { ToastContainer } from 'react-toastify';
import "@/styles/globals.css";
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import 'react-modern-drawer/dist/index.css'
import 'react-toastify/dist/ReactToastify.css';
import 'react-quill/dist/quill.snow.css';
import SiteLoader from "@/components/shared/SiteLoader";
import LayoutSwitcher from "@/components/layout/LayoutSwitcher";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ToastContainer/>
      <SiteLoader>
        <LayoutSwitcher>
        <Component {...pageProps} />
        </LayoutSwitcher>
      </SiteLoader>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
