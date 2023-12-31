import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import store from "@/reduxstore/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {  useRouter } from "next/router";
import { useEffect,useState } from "react";
import { Provider } from "react-redux";
import LoadingBar from 'react-top-loading-bar'


export default function App({ Component, pageProps }: AppProps) {

  const [user, setUser] = useState({value :null , email :null})
  const [key, setkey] = useState(0)
  const [progress, setProgress] = useState(0)
  const router = useRouter()
  const [sidebar, setSidebar] = useState(false);


  


  const logout = () =>{
    localStorage.removeItem('myuser')
    setkey(Math.random())
    setUser({value : null , email:null})
    location.href = `/`
  }

 useEffect(() => {
  if (!process.env.NEXT_PUBLIC_HOST) {
    return
  }
  router.events.on('routeChangeStart', ()=>{
    setProgress(40)
  })
  router.events.on('routeChangeComplete', ()=>{
    setProgress(100)
  })
  let myuser = JSON.parse(localStorage.getItem('myuser'))
   if (myuser) {
    setUser({value: myuser.token, email : myuser.email})
    setkey(Math.random())
   }
    // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [])
 
  

  return (
    <>
    <LoadingBar
        color='#f11946'
        progress={progress}
        waitingTime ={400}
        onLoaderFinished={() => setProgress(0)}
      />
      <Provider store={store}>
        <Navbar logout={logout} user={user} key={key} />
        <Component logout={logout} user={user} {...pageProps} />
        <Footer />
      </Provider>
    </>
  );
}
