import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

type Repository = {
  full_name: string;
  description: string;
}

export function Repos() {
  //first param is the key cache to I identify after, and second param is the function to call api
  const { data, isFetching } = useQuery<Repository[]>('repos', async () => {
    const response = await axios.get('http://api.github.com/users/gabriellennon/repos')

    return response.data;
  }, {
    //Case i want disabled refetch automatic
    // refetchOnWindowFocus: false,

    //how much time i want to maintain datas in cache
    staleTime: 1000 * 60, //1 minute
  });

  return (
   <ul>
     { isFetching && <p>Carregando...</p>}

     {
       data?.map(repo => {
         return (
           <li key={repo.full_name}>
             <Link to={`repos/${repo.full_name}`}>
             {repo.full_name}
            </Link>
             
             <p>{repo.description}</p>
           </li>
         )
       })
     }
   </ul>
  )
}
