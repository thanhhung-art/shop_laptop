import { ReactQueryHydrate } from "@/components/ReactQueryHydrate";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import { getOrdersByPhone } from "@/lib/axios";
import { queryClient } from "@/lib/reactQuery/queryClient";
import { GetOrdersByPhone } from "@/utils/keys";
import OrdersPage from "@/views/Orders";
import { dehydrate } from "@tanstack/react-query";

const page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const phoneParam = searchParams["phone"];
  const queryClientLocal = queryClient();

  phoneParam &&
    (await queryClientLocal.prefetchQuery([GetOrdersByPhone], () =>
      getOrdersByPhone(phoneParam)
    ));
  const dehydratedState = dehydrate(queryClientLocal);

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1">
          <OrdersPage phoneParam={phoneParam} />
        </div>
        <Footer />
      </div>
    </ReactQueryHydrate>
  );
};

export default page;
