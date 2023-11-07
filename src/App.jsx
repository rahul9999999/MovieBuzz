import { useState ,useEffect} from 'react'
import {fetchDataFromApi} from "./utils/api"
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfiguration, getGenres} from './store/homeSlice'
import { BrowserRouter as Router ,Route,Routes } from 'react-router-dom'
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import Home from "./pages/home/Home"
import SearchResult from "./pages/searchResult/SearchResult"
import PageNotFound from "./pages/404/PageNotFound"
import Explore from "./pages/explore/Explore"
import Deatils from "./pages/details/Details"





function App() {
  const dispatch=useDispatch();
  const {url}=useSelector((state)=>state.home)
  useEffect(()=>{
    fetchApiConfig();
    genresCall();

  },[])
  

  const fetchApiConfig=()=>{
    fetchDataFromApi("/configuration").then((res)=>{
      const url={
        backdrop:res.images.secure_base_url + "original",
        poster:res.images.secure_base_url + "original",
        profile:res.images.secure_base_url + "original"

      }

      dispatch(getApiConfiguration(url));
    })

  }
  const genresCall=async()=>{
    let promise=[];
    let endPoint=["tv","movie"]
    let allGenres={};

    endPoint.forEach((url)=>{
      promise.push(fetchDataFromApi(`/genre/${url}/list`))
    })
    const data=await Promise.all(promise)
    
    data.map(({genres})=>{
      return genres.map((item)=>(allGenres[item.id]=item))

    })
    dispatch(getGenres(allGenres))
    
  }


  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/:mediaType/:id" element={<Deatils/>}/>
        <Route path="/search/:query" element={<SearchResult/>}/>
        <Route path="/explore/:mediaType" element={<Explore/>}/>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
