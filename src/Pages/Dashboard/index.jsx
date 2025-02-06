import CarListing from "./CarListing";
import Navbar from "./NavBar";

const Dashboard = () => {
  return (
    <>
      <main className="pt-32 pb-10">
        <div className="container mx-auto w-full max-w-[1280px]">
          <Navbar />
          <CarListing />
        </div>
      </main>
    </>
  );
};

export default Dashboard;
