// import Grids from "./components/grids/page";
// import Navbar from "./components/navbar/page";
// import Newsletter from "./components/Newsletter/page";

import Footer from "./components/Footer/page";
import Posts from "./posts/page";

// import Footer from "./components/Footer/page";
export default function Home() {
  
  return (
    <>
     <div className="space-y-6">
      <h1 className="text-4xl font-bold">Welcome to My Blog</h1>
      <p className="text-gray-600 pb-6">
        This is a dynamic blog built with Next.js. Posts will be loaded from Firebase.
      </p>
    </div>
    <Posts></Posts>
    <Footer></Footer>
    </>
  );
}
