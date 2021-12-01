import React from "react";
import {pageNumber} from "../config/Config";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";
import "./Pagination.css"

export interface PageType {
    getPage: ()=>void
    item:number
}

export const BuildPagination=({getPage,item}:PageType)=>{
    let page =[0]
    for(let i = 1;i<Math.ceil(item/pageNumber);i++){
        page.push(i)
    }

return(

    <div className={"paginationContainer"}>
        {
            page.map((el)=>{
               return <button className={"page"} onClick={getPage} name={`${el}`} key={generateUniqueID()}>{el+1}</button>
            })
        }
    </div>
)
}

export default BuildPagination