import Header from "../../components/Home/Header/Header";
import NewProducts from "../../components/Home/NewProducts/NewProducts";
import About from "../../components/Home/About/About";
import Reviews from "../../components/Home/Review/Reviews";
export default function Home() {

  return (
    <>
      <Header />
      <NewProducts />
      <About />
      <Reviews/>
    </>
  );
}
