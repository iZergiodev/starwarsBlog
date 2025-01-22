import { useStore } from "./store/store";
import "./App.css";
import { useEffect, useState } from "react";
import { CardComp } from "./CardComp";
import { Hourglass } from "react-loader-spinner";

function App() {
  const characters = useStore((state) => state.characters);
  const planets = useStore((state) => state.planets);
  const vehicles = useStore((state) => state.vehicles);

  const getCharacters = useStore((state) => state.getCharacter);
  const getPlanets = useStore((state) => state.getPlanets);
  const getVehicles = useStore((state) => state.getVehicles);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([getCharacters(), getPlanets(), getVehicles()]);
      setLoading(false);
    };

    fetchData();
  }, [getCharacters, getPlanets, getVehicles]);

  if (loading)
    return (
      <Hourglass
        visible={true}
        height="100"
        width="100"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={["#306cce", "#72a1ed"]}
      />
    );

  return (
    <>
      <div className="flex gap-3 overflow-x-scroll mt-40">
        {characters.map((e) => (
          <CardComp
            key={e.uid}
            type="people"
            uid={e.uid}
            name={e.name}
            url={e.url}
          />
        ))}
      </div>

      <div className="flex gap-3 overflow-x-scroll mt-5">
        {planets.map((e) => {
          if (e.name === "Tatooine") return;

          return (
            <CardComp
              key={e.uid}
              type="planets"
              uid={e.uid}
              name={e.name}
              url={e.url}
            />
          );
        })}
      </div>

      <div className="flex gap-3 overflow-x-scroll mt-5">
        {vehicles.map((e) => (
          <CardComp
            key={e.uid}
            type="vehicles"
            uid={e.uid}
            name={e.name}
            url={e.url}
          />
        ))}
      </div>
    </>
  );
}

export default App;
