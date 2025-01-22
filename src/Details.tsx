import { useParams } from "react-router-dom";
import { useStore } from "./store/store";
import { useEffect, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Hourglass } from "react-loader-spinner";

export const Details = () => {
  const { type, id } = useParams();
  const getById = useStore((state) => state.getById);
  const details = useStore((state) => state.details);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (type && id) {
      const fetchDetails = async () => {
        setLoading(true);
        await getById(type, parseInt(id, 10));
        setLoading(false);
      };
      fetchDetails();
    }
  }, [type, id, getById]);

  console.log(details);

  if (loading) {
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
  }

  return (
    <>
      <ResizablePanelGroup
        direction="horizontal"
        className="max-w-max rounded-lg border md:min-w-[1000px]"
      >
        <ResizablePanel defaultSize={50}>
          <div className="flex h-[600px] items-center justify-center p-6">
            <img
              width="85%"
              src={
                type === "people"
                  ? `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`
                  : `https://starwars-visualguide.com/assets/img/${type}/${id}.jpg`
              }
              alt="imagen"
            />
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={25}>
              <div className="flex h-full items-center justify-center p-6">
                <h1 className="font-semibold">
                  {details?.result?.properties?.name}
                </h1>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={75}>
              <div className="flex h-full items-center justify-center p-6 flex-col gap-5 text-lg font-extralight scale-150">
                <h2>Género: {details.result.properties.gender}</h2>
                <h2>Estatura: {details.result.properties.height}</h2>
                <h2>Fecha Nacimiento: {details.result.properties.birth_year}</h2>
                <h2>Color de pelo: {details.result.properties.hair_color}</h2>
                <h2>Color de piel: {details.result.properties.skin_color}</h2>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
};
