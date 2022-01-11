import _ from "lodash";
import { Character } from "@/types/Character";

const NAME_SEARCH_KEY = "Name";
const EPISODE_SEARCH_KEY = "Episode";

export function isByEpisodeSearch(searchKey: string): boolean {
  return searchKey === EPISODE_SEARCH_KEY;
}
export function isByNameSearch(searchKey: string): boolean {
  return searchKey === NAME_SEARCH_KEY;
}
export function getCharactersPaginatedFromSearchByEpisodeResponse(apiResponse, itemsPerPage:number) : Character[][]{
  return _.chunk(apiResponse.data.data.episodes.results[0].characters, [itemsPerPage]);
}
export function getCharactersCountFromSearchByEpisodeResponse(apiResponse): number {
  return apiResponse.data.data.episodes.results[0].characters.length
}
export function getCharactersFromSearchByNameResponse(apiResponse): Character[]{
  return apiResponse.data.data.characters.results
}
export function getCharactersCountFromSearchByNameResponse(apiResponse): number{
  return apiResponse.data.data.characters.info.count
}
export function getCharacterFromSearchByIdResponse(apiResponse): Character {
  return apiResponse.data.data.character
}
export function getSearchCharactersByEpisodeQuery(episode: string): Record<string, unknown> {
  return {
    query: `{
   episodes (filter: {episode: "${episode}"}){
    info {
      count
    }
    results {
      id,
      name,
      episode,
      characters {
        id,
        name,
        image,
        gender,
        species,
        episode{
          episode
        }
      }
    }
  }
}`
  };
}
export function getSearchCharactersByNameQuery(name: string, page:number): Record<string, unknown> {
  return {
    query: `{
   characters( page: ${page.toString()}, filter: { name: "${name}"}) {
    info {
      count
    }
    results {
      id,
      name,
      image,
     	gender,
      species,
      episode {
        episode
      }
    }
  }
  }`
  };
}
export function getFindCharacterByIdQuery(id: string): Record<string, unknown> {
 return {
   query: `{
     character(id:"${id}") {
         id,
         name,
         image,
         gender,
         species,
         episode {
         episode
       }
     }
   }`
 }
}
