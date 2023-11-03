import { ReactQueryHydrate } from "@/components/ReactQueryHydrate";
import { getProducts, getProductsInfinity } from "@/lib/axios";
import { queryClient } from "@/lib/reactQuery/queryClient";
import ProductsPage from "@/views/Products";
import { dehydrate } from "@tanstack/react-query";
import { Suspense } from "react";

const Page = async () => {
  const queryClientLocal = queryClient();
  await queryClientLocal.prefetchInfiniteQuery(["getProducts"], ({ pageParam = 0}) => getProductsInfinity(pageParam));
  const dehydratedState = dehydrate(queryClientLocal);

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <ProductsPage />
    </ReactQueryHydrate>
  );
};

export default Page;
