"use client";
import Footer from "@/components/footer/Footer";
import ProductDetails from "@/components/product/ProductDetails";
import QuickView from "@/components/product/QuickView";
import Reviews from "@/components/product/Reviews";
import { getProduct } from "@/lib/axios";
import { GetProduct } from "@/utils/keys";
import { useQuery } from "@tanstack/react-query";

const ProductPage = ({
  param,
  colorParam,
}: {
  param: string;
  colorParam: string | undefined;
}) => {
  const { data, isLoading } = useQuery([GetProduct, param], () =>
    getProduct(param)
  );

  if (isLoading) {
    return <div>is loading</div>;
  }

  if (!data) {
    return <div>error</div>;
  }

  return (
    <div>
      <div className="px-4 md:px-0">
        <QuickView
          image={data.data.img}
          name={data.data.name}
          price={data.data.price}
          rating={data.data.rating}
          _id={data.data._id}
          colors={data.data.colors}
          colorParam={colorParam}
        />
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 max-w-7xl m-auto mb-8">
          <Reviews productId={param} />
          <ProductDetails
            brand={data.data.brand}
            colors={data.data.colors}
            configure={data.data.configure}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;
