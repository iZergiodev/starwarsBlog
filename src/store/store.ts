import { create } from "zustand";

const fetchData = async (type: string) => {
  try {
    const res = await fetch(`https://www.swapi.tech/api/${type}/`);
    const { results } = await res.json();
    return results || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

const fetchDataId = async (type: string, id: number) => {
  try {
    const res = await fetch(`https://www.swapi.tech/api/${type}/${id}`);

    if(!res.ok) {
        console.error(`Error: ${res.status} - ${res.statusText}`)
    }

    const data = await res.json();
    console.log(data)
    return data || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

interface Store {
  characters: string[];
  planets: string[];
  vehicles: string[];
  favorites: string[];
  details: any;
  getCharacter: () => void;
  getPlanets: () => void;
  getVehicles: () => void;
  newFav: (name: string) => void;
  deleteFav: (name: string) => void;
  getById: (type:string, id: number) => Promise<void>
}

const enum FetchType {
  people = "people",
  planets = "planets",
  vehicles = "vehicles",
}

export const useStore = create<Store>((set, get) => ({
  characters: [],
  planets: [],
  vehicles: [],
  favorites: [],
  details: null,

  getCharacter: async () => {
    const data = await fetchData(FetchType.people);
    set({ characters: data });
  },

  getPlanets: async () => {
    const data = await fetchData(FetchType.planets);
    set({ planets: data });
  },

  getVehicles: async () => {
    const data = await fetchData(FetchType.vehicles);
    set({ vehicles: data });
  },
  newFav: (name) => {
    const currentFavorites = get().favorites;
    if (!currentFavorites.includes(name)) {
      set({ favorites: [...currentFavorites, name] });
    }
  },
  deleteFav: (name) => {
    const currentFavorites = get().favorites;
    const updatedFavorites = currentFavorites.filter((e) => e !== name);
    set({ favorites: updatedFavorites });
  },
  getById: async (type: string, id: number) => {
    const data = await fetchDataId(type, id);
    set({ details: data });
  },
}));
