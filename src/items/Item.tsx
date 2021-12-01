import React from "react";
import {data} from "../util/Data";
import "./Item.css"

export interface ItemType {
    item: {
        index: number,
        startIndex: number
    }
    text: string,
    searchName:string
    delItem:()=>void
    editItem:()=>void
    id:string

}

export const getTextColor = (item: {
    index: number,
    startIndex: number
}, text:  string,
searchName:string)=>{
    let res:string[] = ["","",""]
    if(text.length>2){
        for(let i=0;i<item.startIndex-text.length+1;i++){
            // @ts-ignore
            res[0]+=data()[item.index][searchName][i]
    }
        for(let i=item.startIndex-text.length+1;i<(item.startIndex+1);i++){
            // @ts-ignore
            res[1]+=data()[item.index][searchName][i]
    }
        // @ts-ignore
        for(let i=(item.startIndex+1);i<data()[item.index][searchName].length;i++){
            // @ts-ignore
            res[2]+=data()[item.index][searchName][i]
    }
    return res
}else
        // @ts-ignore
        res[0]=data()[item.index][searchName]
        return res
}


export const BuildItem = ({item,text,searchName,delItem,editItem,id}:ItemType ):JSX.Element=>{
    return(
        <div className={"itemContainer"}>

            {
                searchName==="name"?
                    <p className={"item"}>Name:
                    {
                        getTextColor(item,text,"name")[0]
                    }
                    <span className={"textColor"}>
                    {
                        getTextColor(item,text,"name")[1]
                    }
                    </span>
                    {
                        getTextColor(item,text,"name")[2]
                    }
                    </p>:
                    <p className={"item"}>Name:{
                        data()[item.index].name
                    }
                    </p>
            }

           {
               searchName==="surname"?
                   <p className={"item"}>Surname:
                   {
                       getTextColor(item,text,"surname")[0]
                   }
                   <span className={"textColor"}>
                    {
                        getTextColor(item,text,"surname")[1]
                    }
                    </span>
                   {
                       getTextColor(item,text,"surname")[2]
                   }

                   </p>:
                   <p className={"item"}>Surname:{
                   data()[item.index].surname
                   }</p>
           }

            {
                searchName==="age"?
                    <p className={"item"}>Age:
                        {
                            getTextColor(item,text,"age")[0]
                        }
                        <span className={"textColor"}>
                {
                    getTextColor(item,text,"age")[1]
                }
                </span>
                        {
                            getTextColor(item,text,"age")[2]
                        }

                    </p>:
                    <p className={"item"}>Age:{
                        data()[item.index].age
                    }</p>
            }

            <div className={"itemButtonContainer"}>
                <button className={"buttonItem"} onClick={delItem} name={id}>del</button>
                <button className={"buttonItem"} onClick={editItem} name={id}>edit</button>
            </div>

        </div>
    )
}

export default BuildItem