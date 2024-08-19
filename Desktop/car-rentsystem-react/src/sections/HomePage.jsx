import Button from "../components/Button";
import { Link } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import Models from "../components/Models";
import models from "../data/models";

const HomePage = () => {
  return (
    <section className="p-8 mt-8">
      {/* Main content section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          <h2 className="text-3xl md:text-5xl font-bold text-center md:text-left">
            The easy way to <br /> takeover a lease
          </h2>
          <div className="flex flex-row items-center justify-center md:justify-start gap-2">
            <CiLocationOn className="text-3xl md:text-4xl" />
            <p className="text-xl md:text-2xl">Sarajevo</p>
          </div>
          <div className="flex justify-center md:justify-start">
            <Link to="/cars">
              <Button>Rent a car</Button>
            </Link>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-4 md:p-6">
          <img
            src={"/src/assets/Audi-A6.webp"}
            alt="audi"
            className="w-full h-auto rounded-3xl shadow-lg"
          />
        </div>
      </div>

      {/* Car logos section */}
      <div className="flex flex-wrap justify-center gap-4">
        {models.map((model) => (
          <Models model={model} key={model.id} />
        ))}
      </div>
    </section>
  );
};

export default HomePage;
