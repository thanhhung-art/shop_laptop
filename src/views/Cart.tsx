import ListProducts from "@/components/cart/ListProducts";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";

const CartPage = () => {
  return (
    <>
      <Navbar />
      <section className="max-w-7xl m-auto flex gap-4 bg-white rounded-md my-8 mx-4 md:mx-auto">
        <ListProducts />
      </section>
      <Footer />
    </>
  );
};

export default CartPage;
