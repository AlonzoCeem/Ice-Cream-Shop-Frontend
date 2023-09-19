import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, Link, useNavigate, Routes, Route } from 'react-router-dom';

function App() {
  const [flavors, setFlavors] = useState([])
  const navigate = useNavigate();

  useEffect(()=> {
    const getFlavors = async()=> {
      const response = await axios.get('http://localhost:3000/api/flavors');
      setFlavors(response.data);
    }
    getFlavors()
  }, [])

  const ShowFlavor = ({flavors})=> {
    const { id } = useParams()
    const flavor = flavors.find(flavor => flavor.id === id*1);

    const handleClick = async ()=> {
      const response = await axios.delete(`http://localhost:3000/api/flavors/${id}`)
      navigate('/')
      setFlavors(flavors.filter(f => f !== flavor))
    }

    if(!flavor){
      return null;
    }
    return(
      <div>
        <h1>{flavor.name}</h1>
        <p>{flavor.description}</p>
        <button onClick={handleClick} >Delete</button>
      </div>
    )
  }

  return (
    <>
      <h1>Welcome To My Ice Cream Shop!!</h1>
      <p># of flavors: {flavors.length}</p>
      <ul>
        {
          flavors.map((flavor)=> {
            return (
              <div key={flavor.id}>
                <Link to={`/api/flavors/${flavor.id}`}>
                  <li>{flavor.name}</li>
                </Link>
              </div>

            )
          })
        }
      </ul>
      <Routes>
        <Route path="/api/flavors/:id" element={<ShowFlavor flavors={flavors}/>}/>
      </Routes>
    </>
  )
}

export default App
