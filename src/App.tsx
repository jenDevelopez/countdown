import { useEffect,Suspense } from "react";
import { useTimeStore } from "./context/TimeStore";
import Spinner from "./Spinner";

function App() {
  const timeLeft = useTimeStore((state) => state.timeLeft);
  const setTimeLeft = useTimeStore((state) => state.setTimeLeft);
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minuts = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  useEffect(() => {
    const timeLeftDate: number = new Date(
      "Dec 5,2023 18:00:00"
    ).getTime();
    
    const intervalid = setInterval(() => {
      const now: number = new Date().getTime();
      const distance = timeLeftDate - now;
      setTimeLeft(distance);
    }, 1000);
    return () => clearInterval(intervalid);
  }, []);
  return (
    <main 
      className="
      w-full h-screen 
      flex flex-col justify-start items-center gap-4 md:justify-center md:gap-10
      bg-gray-900 
      py-4 px-2 ">
      <h1 className="text-3xl font-semibold text-white mt-8 lg:mt-0">VIAJE INMINENTE</h1>
      {timeLeft > 0 ? (
        <Suspense fallback={<Spinner />}>
          <h2 className="text-2xl text-white">LLEGAMOS EN</h2>
          <div 
            className="
            w-full h-[80%] md:w-[90%] md:h-[40%] lg:w-[50%] lg:h-[50%]
            bg-gradient-to-r from-orange-800 to-yellow-800 flex flex-col items-center justify-around md:flex-row
            py-4 gap-4">
            <div className="flex flex-col justify-center items-center w-24 h-24 rounded-full shadow-max ">
              <p className="text-white text-4xl">{seconds}</p>
              <p className="text-white text-xs">SEGUNDOS</p>
            </div>
            <div className="flex flex-col justify-center items-center w-24 h-24 rounded-full shadow-max ">
              <p className="text-white text-4xl">{minuts}</p>
              <p className="text-white text-xs">MINUTOS</p>
            </div>
            <div className="flex flex-col justify-center items-center w-24 h-24 rounded-full shadow-max ">
              <p className="text-white text-4xl">{hours}</p>
              <p className="text-white text-xs">HORAS</p>
            </div>
            <div className="flex flex-col justify-center items-center w-24 h-24 rounded-full shadow-max ">
              <p className="text-white text-4xl">{days}</p>
              <p className="text-white text-xs">DIAS</p>
            </div>
          <img className="w-24 absolute left-0 top-1 animate-slide" src="/image.png" alt="tren" />
          </div>
        </Suspense>
      ) : (
        <div className="w-full h-[80%] border bg-slate-700 flex flex-col items-center justify-around mt-4 py-4 gap-4">

          <p className="text-4xl text-white ">¡HEMOS LLEGADO!</p>
        </div>
      )}
    </main>
  );
}

export default App;
