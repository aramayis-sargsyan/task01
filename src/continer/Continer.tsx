import React, {useEffect, useState} from 'react';
import BuildInput from "../input/Input";
import BuildItem from "../items/Item";
import {data} from "../util/Data";
import {searchData} from "../util/SearchData";
import Pagination from "../pagination/Pagination";
import BuildSelect from "../select/Select";
import {pageNumber} from "../config/Config";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";
import {FaSearch } from "react-icons/fa"
import "./Continer.css"

export interface items  {
    index:number,
    startIndex:number
}



export default function Container():JSX.Element {
    const [items,setItems] = useState<items[]>([])
    const [text,setText] = useState<string>("")
    const [pagination,setPagination] = useState<number>(0)
    const [isEdit,setIsEdit] = useState<boolean>(false)
    const [searchName,setSearchName] = useState<string>("name")
    const [isCompleted,setIsCompleted] = useState<boolean>(false)


    useEffect(() => {
            data().forEach((el,index)=>{
                setItems((items)=>{
                    return [...items, {index:index,startIndex:-1}]
                })
            })
    }, []);

    function buildAllItems(){
        setItems(()=>{
            return []
        })

        data().forEach((el,index)=>{
            setItems((items)=>{
                return [...items,{index:index,startIndex:-1}]
            })
        })
    }

    function changeInput(e:any){
        setText(()=>{
            return e.target.value
        })
            let validIndex = searchData(e.target.value, searchName)
            setItems(() => {
                return validIndex
            })
            setPagination(()=>{
                return 0
            })
    }

    function getItemIndex() {
        if (text.length > 2) {
            let validIndex = searchData(text, searchName)
            setItems(() => {
                return validIndex
            })
            setPagination(()=>{
                return 0
            })
        }
    }


    function getItemIndexEnter(e:any){
        if(text.length>2 && e.key==="Enter"){
            let validIndex= searchData(text,searchName)
            setItems(()=>{
                return validIndex
            })
            setPagination(()=>{
                return 0
            })
        }

    }

    function getPage(e:any){
        if(+e.target.name===+pagination){
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }else {
            window.scrollTo(0,0);
        }

        setPagination(()=>{
            return e.target.name
        })
    }

    function changeSearchName(e:any){
        setIsEdit(()=>{
            return false
        })

        setText(()=>{
            return ""
        })

        setSearchName(()=>{
         return e.target.name
        })
    }

    function changeSearch(){
        setIsEdit((IsEdit)=>{
            return !IsEdit
        })
    }

    function delItem(e:any){
        console.log(e.target.name)
        setIsCompleted((isCompleted)=>{
            return !isCompleted
        })

    }

    function editItem(e:any){
        console.log(e.target.name)

    }

    return(
        <div>
            {
                isCompleted === true ?
                    <div className={"delContainer"}>
                        <button onClick={delItem} className={"del"}>yes</button>
                        <button onClick={delItem} className={"del"}>no</button>
                    </div> :
                    <div>
                        <div className={"headerContainer"}>
                            <button className={"all"} onClick={buildAllItems}>all items</button>

                            <div className={"inputContainer"}>

                                <BuildInput changeInput={(e: void) => {
                                    changeInput(e)
                                }} getItemIndexEnter={(e: void) => {
                                    getItemIndexEnter(e)
                                }} text={text}/>

                                <button className={"searchButton"} onClick={getItemIndex}><FaSearch
                                    className={"searchIcon"}/></button>

                                <BuildSelect isEdit={isEdit} changeSearchName={(e: void) => changeSearchName(e)}
                                             searchName={searchName} changeSearch={changeSearch}/>

                            </div>
                        </div>
                        <div className={"allItemContainer"}>
                            {
                                items.slice(pageNumber * pagination, pageNumber * (+pagination + 1)).map((el) => {
                                    return (
                                        <BuildItem
                                            item={el}
                                            key={generateUniqueID()}
                                            id={generateUniqueID()}
                                            text={text}
                                            searchName={searchName}
                                            delItem={(e: void) => {
                                                delItem(e)
                                            }}
                                            editItem={(e: void) => {
                                                editItem(e)
                                            }}/>
                                    )
                                })
                            }
                        </div>
                        <div className={"footer"}>
                            <Pagination getPage={(e: void) => getPage(e)} item={items.length}/>
                        </div>
                    </div>
            }
        </div>
    )
}

