import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useStore } from "./store/store";
import { Link } from "react-router-dom";



export const CardComp = ({ type, name, uid, url }) => {
  const favorites = useStore((state) => state.favorites);
  const newFav = useStore((state) => state.newFav);
  const isFavorite = favorites.includes(name);
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <img
          src={ type === 'people' ? `https://starwars-visualguide.com/assets/img/characters/${uid}.jpg` : `https://starwars-visualguide.com/assets/img/${type}/${uid}.jpg` }
        ></img>
      </CardContent>
      <CardFooter className="flex gap-3">
      <Link to={`/${type}/${uid}`}><Button className="w-20">+ info</Button></Link>
        <Button variant={ isFavorite ? "destructive" : "default" } onClick={() => { newFav(name)}} className="w-20">⭐</Button>
      </CardFooter>
    </Card>
  );
};
