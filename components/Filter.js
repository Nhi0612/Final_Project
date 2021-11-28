
import React, {useState, useEffect} from 'react'
import filterSearch from '../utils/filterSearch'
import {getData} from '../utils/fetchData'
import {useRouter} from 'next/router'
import Search from './Search'

const Filter = ({state}) => {

    const [sort, setSort] = useState('')
    const [category, setCategory] = useState('')

    const {categories} = state

    const router = useRouter()


    const handleCategory = (e) => {
        setCategory(e.target.value)
        filterSearch({router, category: e.target.value})
    }

    const handleSort = (e) => {
        setSort(e.target.value)
        filterSearch({router, sort: e.target.value})
    }

  

    return (
        <div className="input-group justify-content-end d-lock ">
            <div className="input-group-prepend " style= {{marginRight: "10px"}}>
                <select className="custom-select text-capitalize filter-sort"
                value={category} onChange={handleCategory}>

                    <option value="all">All Products</option>

                    {
                        categories.map(item => (
                            <option key={item._id} value={item._id}>{item.name}</option>
                        ))
                    }
                </select>
            </div>
            <div className="input-group-prepend ">
                <select className="custom-select text-capitalize filter-sort"
                value={sort} onChange={handleSort}>

                     <option value="-createdAt">Newest</option>
                     <option value="oldest">Oldest</option>
                     <option value="-sold">Best sales</option>
                     <option value="-price">Price: Hight-Low</option>
                     <option value="price">Price: Low-Hight</option>

                </select>
            </div>


        </div>
    )
}

export default Filter
