import {useState, useEffect} from 'react';



function Pagination() {

    const pages = 10
    
    const numberOfPages = []
    for (let i = 1; i <= pages; i++) {
      numberOfPages.push(i)
    }

   const [currentPage, setCurrentPage] = useState(1)

   const [arrOfCurrPage, setArrOfCurrPage] = useState([])

   useEffect(() =>{
       let tempNumberPage = [...numberOfPages]
       if( currentPage >=1 & currentPage <= 3){
           tempNumberPage = [1,2,3,4, '...', numberOfPages.length]
       }

       else if( currentPage === 4){
        const sliced = numberOfPages.slice(0,5)
        tempNumberPage = [...sliced , '...', numberOfPages.length]
        }

        else if (currentPage > 4 && currentPage < numberOfPages.length - 2) {               
            const sliced1 = numberOfPages.slice(currentPage - 2, currentPage)                 
            const sliced2 = numberOfPages.slice(currentPage , currentPage + 1)                 
            tempNumberPage = ([1, dotsLeft, ...sliced1, ...sliced2, dotsRight, numberOfPages.length]) 
          }

       setArrOfCurrPage(tempNumberPage)
   }, [currentPage])

    return (
      
        <div className="pagination-container">
            
                    <a  href = "a"
                        className = 'disabled'
                        onClick = {() => setCurrentPage((prev) => prev === 1 ? prev : prev -1 )} 
                    >Prev</a>

                    {arrOfCurrPage.map(((item, index) => {
                        return <a
                          href="#"
                          key={index}
                          className={`${currentPage === item ? 'active' : ''}`}
                          onClick={() => setCurrentPage(item)}
                        >
                          {item}
                        </a>
                      }))}
           
                    <a href = "a"
                       className = 'disabled'

                     onClick = {() => setCurrentPage((prev) => prev === numberOfPages.length ? prev :  prev + 1 )}
                    >Next</a>
              
            
        </div>
    );
}

export default Pagination;
 



