import Link from "next/link"
import NavBar from "../components/NavBar"
import Footer from '../components/Footer'

const Home = () =>{
  return(
      <div>
          <NavBar></NavBar>
           <div className = 'back-img'>
                  <div className="row1 word "> 
                      <div className="cole">
                          <h1>A GOOD PERFUME MAKES</h1>
                          <h1 > ME MORE SPECIAL. </h1>
                          <Link href=" /Listproduct">
                            <a  className="btn2 navbar-brand ">GO TO STORE</a>
                          </Link>
                          
                      </div>
                  </div>
              </div>
             <Footer></Footer>
      </div>
           
              
  )
}

export default Home