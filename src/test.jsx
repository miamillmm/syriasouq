const Test = () => {
  const updaetdArr = [
    { BMW: [""] },
    { Chevrolet: [""] },
    { Ferrari: [""] },
    { Ford: [""] },
    { Jaguar: [""] },
    { Lamborghini: [""] },
    { Maserati: [""] },
    { Mazda: [""] },
    { McLaren: [""] },
    { "Mercedes-Benz": [""] },
    { "Rolls-Royce": [""] },
    { Skoda: [""] },
    { Volkswagen: [""] },
    { Abarth: [""] },
    { "Alfa Romeo": [""] },
    { "Aston Martin": [""] },
    { Audi: [""] },
    { Avatr: [""] },
    { BAIC: [""] },
    { Bentley: [""] },
    { Bestune: [""] },
    { Bugatti: [""] },
    { BYD: [""] },
    { Cadillac: [""] },
    { Changan: [""] },
    { Chery: [""] },
    { Chrysler: [""] },
    { Citroen: [""] },
    { CMC: [""] },
    { Dodge: [""] },
    { DongFeng: [""] },
    { Exeed: [""] },
    { Fengon: [""] },
    { Fiat: [""] },
    { Forthing: [""] },
    { Foton: [""] },
    { GAC: [""] },
    { Geely: [""] },
    { Genesis: [""] },
    { GMC: [""] },
    { "Great Wall": [""] },
    { Haval: [""] },
    { Hino: [""] },
    { HiPhi: [""] },
    { Honda: [""] },
    { Hongqi: [""] },
    { Hummer: [""] },
    { Hyundai: [""] },
    { INEOS: [""] },
    { Infiniti: [""] },
    { Isuzu: [""] },
    { JAC: [""] },
    { Jeep: [""] },
    { Jetour: [""] },
    { JMC: [""] },
    { Kaiyi: [""] },
    { Kia: [""] },
    { Koenigsegg: [""] },
    { Lancia: [""] },
    { "Land Rover": [""] },
    { Lexus: [""] },
    { "Li auto": [""] },
    { Lincoln: [""] },
    { Lotus: [""] },
    { Lucid: [""] },
    { Mahindra: [""] },
    { Maxus: [""] },
    { MG: [""] },
    { Mini: [""] },
    { Mitsubishi: [""] },
    { Nissan: [""] },
    { Opel: [""] },
    { Peugeot: [""] },
    { Polestar: [""] },
    { Porsche: [""] },
    { RAM: [""] },
    { Renault: [""] },
    { Rivian: [""] },
    { ROX: [""] },
    { Seat: [""] },
    { Seres: [""] },
    { Smart: [""] },
    { Subaru: [""] },
    { Suzuki: [""] },
    { Tesla: [""] },
    { Toyota: [""] },
    { VGV: [""] },
    { Volvo: [""] },
    { Xiaomi: [""] },
    { Zeekr: [""] },
  ];

  return (
    <div className="shadow-sm shadow-indigo-100 rounded ">
      <Link to={`/listing/${data._id}`} key={data._id}>
        <div className="overflow-hidden rounded-t-md">
          <img
            alt=""
            src={`http://api.syriasouq.com//uploads/cars/${data.images[0]}`}
            className="h-40 sm:h-56 w-full object-cover transition-transform duration-500 hover:scale-105 ease-in-out"
          />
        </div>
      </Link>
      <div>
        <div className="mt-4 ml-4 space-y-1 sm:space-y-2 text-[16px] sm:text-[18px] font-semibold">
          <div className="flex items-center gap-2">
            <h2 className=" text-[#314352]">{data.make}</h2>
            <p className="px-2 text-xs bg-red-400 text-white rounded-full">
              {data.model}
            </p>
          </div>
          <h2 className=" text-[#314352]">${data.priceUSD}</h2>
          <div className="flex items-center justify-between text-sm text-slate-500">
            <p>{data.kilometer} KM</p>
            <p>Year {data.year}</p>
          </div>
        </div>
        <div className="mt-6 text-xs border-t-2 border-gray-100 py-3">
          <div className="flex justify-between px-4 py-2">
            <div className="flex gap-2 items-center">
              {/* <div className="hover:text-red-500 hover:border-red-500 duration-500 w-8 h-8 rounded-full flex justify-center items-center border border-gray-400">
                            <IoEyeOutline className="w-1/2 h-1/2" />
                          </div>
                          <div className="hover:text-red-500 hover:border-red-500 duration-500 w-8 h-8 rounded-full flex justify-center items-center border border-gray-400">
                            <IoIosGitCompare className="w-1/2 h-1/2" />
                          </div> */}
              <div
                onClick={() => handleWishlist(data)}
                className={`hover:text-red-500 hover:border-red-500 duration-500 w-8 h-8 rounded-full flex justify-center items-center border border-gray-400 cursor-pointer ${
                  wishlist.some((item) => item.car === data._id)
                    ? "bg-red-500 text-white border-red-500"
                    : ""
                }`}
              >
                <CiHeart className="w-1/2 h-1/2" />
              </div>
              <div
                onClick={() => handleShare(data)}
                className={`hover:text-red-500 hover:border-red-500 duration-500 w-8 h-8 rounded-full flex justify-center items-center border border-gray-400 cursor-pointer`}
              >
                <CiShare2 className="w-1/2 h-1/2" />
              </div>
            </div>
            <div className="flex justify-center items-center cursor-pointer">
              {/* <p className="text-gray-400 text-[12px] sm:text-[14px]">
                            {data.views} Views
                          </p> */}
              <Link
                to={`/listing/${data._id}`}
                className="btn  bg-blue-600 text-white hover:bg-blue-500"
              >
                Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
