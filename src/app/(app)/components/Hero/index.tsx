import Link from "next/link";

function Hero() {
  return (
    <main className="flex min-h-fit flex-col items-center justify-between ">
      <div className="bg-[url('/comprehensive.png')] bg-cover bg-bottom bg-blend-darken w-full h-[80vh] flex items-start justify-center flex-col text-center px-5 lg:px-10 ">
        {/* <p className="text-lg">
            livestock<span className="text-green1">Diary</span>
          </p> */}
        <div className="flex flex-col text-4xl lg:text-7xl font-bold text-left items-start">
          <p className="">
            <span className="text-green1">Optimize</span> Your Livestock,{" "}
          </p>
          <p>
            <span className="text-green1">Grow</span> Your Business
          </p>
        </div>
        <p className="text-left mt-3 w-full lg:w-[70%]">
          Unlock the full potential of your livestock management with
          livestockly, your all-in-one platform designed to streamline
          operations, boost productivity, and ensure the well-being of your
          animals.
        </p>
      </div>

      {/* <div
        style={{}}
        className="flex items-center w-full px-5 lg:px-10 h-[50vh] justify-start duration-5000">
        <p className="text-4xl lg:text-5xl  text-left font-bold w-full">
          A <span className="text-green1 ">new</span> way to keep your <br />{" "}
          records. <span className="text-green1">Here's how!!</span>
        </p>
      </div> */}
    </main>
  );
}

export default Hero;
