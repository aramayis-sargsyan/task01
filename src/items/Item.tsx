import React from "react";
import {data} from "../util/Data";
import "./Item.css"

export interface ItemType {
    dataItems:{
        name: string,
        surname: string,
        age: string
        index:number
    }[],
    item: {
        index: number,
        endIndex: number
    },
    text: string,
    searchName:string
    openDelItemPopup:()=>void
    openEditItemPopup:()=>void
}

export const getTextColor = (dataItems:{
                                 name: string,
                                 surname: string,
                                 age: string
                                 index:number
                             }[],item: {
    index: number,
    endIndex: number
}, text:  string,
searchName:string)=>{
    let res:string[] = ["","",""]
    if(text.length>2){
        // @ts-ignore
        res[0]=dataItems[item.index][searchName].substring(0,item.endIndex-text.length+1)

        // @ts-ignore
        res[1]=dataItems[item.index][searchName].substring(item.endIndex-text.length+1,item.endIndex+1)

        // @ts-ignore
        res[2]=dataItems[item.index][searchName].substring(item.endIndex+1)

    return res
}else
        { // @ts-ignore
            res[0]=dataItems[item.index][searchName]
        }
        return res
}


export const BuildItem = ({dataItems,item,text,searchName,openDelItemPopup,openEditItemPopup}:ItemType ):JSX.Element=>{
    return(
        <div className={"itemContainer"}>

            {
                searchName==="name"?
                    <p className={"item"}>Name:
                    {
                        getTextColor(dataItems,item,text,"name")[0]
                    }
                    <span className={"textColor"}>
                    {
                        getTextColor(dataItems,item,text,"name")[1]
                    }
                    </span>
                    {
                        getTextColor(dataItems,item,text,"name")[2]
                    }
                    </p>:
                    <p className={"item"}>Name:{
                        dataItems[item.index].name
                    }
                    </p>
            }

           {
               searchName==="surname"?
                   <p className={"item"}>Surname:
                   {
                       getTextColor(dataItems,item,text,"surname")[0]
                   }
                   <span className={"textColor"}>
                    {
                        getTextColor(dataItems,item,text,"surname")[1]
                    }
                    </span>
                   {
                       getTextColor(dataItems,item,text,"surname")[2]
                   }

                   </p>:
                   <p className={"item"}>Surname:{
                       dataItems[item.index].surname
                   }</p>
           }

            {
                searchName==="age"?
                    <p className={"item"}>Age:
                        {
                            getTextColor(dataItems,item,text,"age")[0]
                        }
                        <span className={"textColor"}>
                {
                    getTextColor(dataItems,item,text,"age")[1]
                }
                </span>
                        {
                            getTextColor(dataItems,item,text,"age")[2]
                        }

                    </p>:
                    <p className={"item"}>Age:{
                        dataItems[item.index].age
                    }</p>
            }

            <div className={"itemButtonContainer"}>
                <button className={"buttonItem"} onClick={openDelItemPopup} name={`${item.index}`}>del</button>
                <button className={"buttonItem"} onClick={openEditItemPopup} name={`${item.index}`}>edit</button>
            </div>

        </div>
    )
}

export default BuildItem