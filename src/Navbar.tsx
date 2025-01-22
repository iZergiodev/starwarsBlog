import { Button } from "./components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useStore } from "./store/store";
import { Link } from "react-router-dom";

export const Navbar = () => {
    const favorites = useStore((state) => state.favorites);
    const deleteFav = useStore((state) => state.deleteFav);

    console.log(favorites)
  return (
    <nav className="fixed top-5 flex justify-between w-[57%] h-44">
      <div>
        <Link to={`/`}>
        <img
          width={200}
          src="https://cdn.worldvectorlogo.com/logos/star-wars-4.svg"
          alt="logo de starwars"
        />
        </Link>
      </div>
      <div>
      <Select>
      <SelectTrigger className="w-[100px] text-lg bg-slate-100">
        <SelectValue placeholder="⭐" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="flex flex-col">
          {favorites.map(e => (
            <Button variant={"outline"} onClick={() => deleteFav(e)}>{e}   🗑️</Button>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
      </div>
    </nav>
  );
};


