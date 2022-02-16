import { useFetch } from "./hooks/useFetch"

type Repository = {
  full_name: string;
  description: string;
}

function App() {
  //Rename data to repositories
  const { data: repositories, isFetching } = useFetch<Repository[]>('/users/gabriellennon/repos', {
    headers: { 'Authorization': 'token'}
  })

  return (
   <ul>
     { isFetching && <p>Carregando...</p>}

     {
       repositories?.map(repo => {
         return (
           <li key={repo.full_name}>
             <strong>{repo.full_name}</strong>
             <p>{repo.description}</p>
           </li>
         )
       })
     }
   </ul>
  )
}

export default App
