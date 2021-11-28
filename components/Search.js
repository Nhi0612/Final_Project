import React, {useState, useEffect} from 'react'
import filterSearch from '../utils/filterSearch'
import {getData} from '../utils/fetchData'
import {useRouter} from 'next/router'

const Search = ({state}) => {
    const [search, setSearch] = useState('')

    const router = useRouter()

    useEffect(() => {
        filterSearch({router, search: search ? search.toLowerCase() : 'all'})
    },[search])


    return (
        <div>
             <form autoComplete="off" >
                <input type="text" className="form-control" list="title_product"
                placeholder = "Search Product"
                value={search.toLowerCase()} onChange={e => setSearch(e.target.value)} />
            </form>
        </div>
    )
}

export default Search
