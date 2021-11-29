import React, {useEffect, useState} from 'react';
import BuildInput from "../input/Input";
import BuildItem from "../items/Item";
import {data} from "../util/Data";
import {searchData} from "../util/SearchData";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";
import "./Continer.css"
import Pagination from "../pagination/Pagination";

export interface ISignUpData  {
    items: number[];
    text:string
}

export default function Container():JSX.Element {
    const [items,setItems] = useState([])
    const [text,setText] = useState("")
    const [selectText,setSelectText] = useState("name")
    const [pagination,setPagination] = useState(0)

    useEffect(() => {
            data().forEach((el,index)=>{
                // @ts-ignore
                setItems((items)=>{
                    return [...items,index]
                })
            })

    }, []);

    function buildAllItems(){
        setItems(()=>{
            return []
        })
        data().forEach((el,index)=>{
            // @ts-ignore
            setItems((items)=>{
                return [...items,index]
            })
        })
    }

    function changeInput(e:any){
        setText(()=>{
            return e.target.value
        })
    }

    function changeSelect(e:any){
        setSelectText(()=>{
            return e.target.value
        })
        return selectText
    }

    function getItemIndex() {
        if (text.length > 0) {
            let validIndex = searchData(text, selectText)
            // @ts-ignore
            setItems(() => {
                return validIndex
            })
        }
    }


    function getItemIndexEnter(e:any){
        if(text.length>0 && e.key==="Enter"){
            let validIndex= searchData(text,selectText)
            // @ts-ignore
            setItems(()=>{
                return validIndex
            })
        }
    }

    function getPage(e:any){
        setPagination(()=>{
            return e.target.name
        })
    }

    return(
        <div>
        <div className={"headerContainer"}>
            <button className={"all"} onClick={buildAllItems}>all</button>

            <div className={"inputContainer"}>

            <BuildInput changeInput={ (e:void)=> {changeInput(e)}} getItemIndexEnter={(e:void)=>{getItemIndexEnter(e)}}/>

            <button className={"searchButton"} onClick={getItemIndex}>Search</button>

            <select className={"select"} onChange={changeSelect} >
                <option value="name">Name</option>
                <option value="surName">Surname</option>
                <option value="age">Age</option>
            </select>

            </div>
        </div>
            {
                items.slice(10*pagination,10*(+pagination+1)).map((el)=>{
                    return(
                        <BuildItem index={el} key={generateUniqueID()}/>
                    )
                })
            }
            <div>
                <Pagination getPage={(e:void)=>getPage(e)} item={items.length} />
            </div>
        </div>

    )
}
