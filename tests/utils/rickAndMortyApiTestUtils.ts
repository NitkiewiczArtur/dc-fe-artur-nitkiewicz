import { Character } from "@/types/Character";

export function getTestCharacterList(listLength: number): Character[] {
  let count = 1;
  const list: Character[] = [];
  while (count <= listLength) {
    list.push({
      id: count.toString(),
      name: "Test Rick Sanchez nr " + count.toString(),
      image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      gender: "Male",
      species: "Human",
      episode: [{}, {}]
    });
    count++
  }
  return list;
}


