import Inbox from "./Inbox";
import Navbar from "./NavBar";

const MessagesPage = () => {
  return (
    <>
      <main className="pt-32 pb-10">
        <div className="container mx-auto w-full max-w-[1280px]">
          <Navbar />
          <Inbox />
        </div>
      </main>
    </>
  );
};

export default MessagesPage;
