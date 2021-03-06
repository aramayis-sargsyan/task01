import React, {useEffect, useState, useCallback} from 'react';
import BuildInput from "../input/Input";
import BuildItem from "../items/Item";
import {data} from "../util/Data";
import { searchData} from "../util/SearchData";
import Pagination from "../pagination/Pagination";
import BuildSelect from "../select/Select";
import {pageNumber} from "../config/Config";
// @ts-ignore
import debounce from 'lodash.debounce';
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";
import {FaSearch } from "react-icons/fa"
import "./Continer.css"

export interface items  {
    index:number,
    endIndex:number
}

export interface dataItem  {
    name: string,
    surname: string,
    age: string
    index:number
}

export default function Container():JSX.Element {
    const [items,setItems] = useState<items[]>([])
    const [text,setText] = useState<string>("")
    const [searchText,setSearchText] = useState<string>("")
    const [pagination,setPagination] = useState<number>(0)
    const [isEdit,setIsEdit] = useState<boolean>(false)
    const [searchName,setSearchName] = useState<string>("name")
    const [isCompleted,setIsCompleted] = useState<boolean>(false)
    const [isEditable,setIsEditable] = useState<boolean>(false)
    const [changeIndex,setChangeIndex] = useState<number>(-1)
    const [dataItems,setDataItems] = useState<dataItem[]>([])


    useEffect(() => {

        data().forEach((el,index)=>{
                setItems((items)=>{
                    return [...items, {index:index,endIndex:-1}]
                })
            })
    }, []);

    useEffect(() => {
            data().forEach((el,index)=>{
                setDataItems((dataItems)=>{
                    return [...dataItems,{...el,index:index}]
                })
            })
    }, []);


    function buildAllItems(){
        setItems(()=>{
            return []
        })
        dataItems.forEach((el,)=>{
            setItems((items)=>{
                return [...items,{index:el.index,endIndex:-1}]
                })
        })

        setSearchText(()=>{
            return ""
        })
    }

const x = useCallback((e)=>{
    console.log(2,searchText)
    changeInput(e)
},[dataItems])

    const a= debounce((e:any)=>{
        setSearchText(e.target.value)

        console.log(1,searchText)
        x(e.target.value)
    }, 1000)

    function changeInput(e: string) {
        console.log(3,dataItems)
        setItems(() => {
            return searchData(e, searchName,dataItems)
        })
        setPagination(()=>{
            return 0
        })
    }

    function getItemIndex(e:any) {
        console.log(dataItems)
        if (searchText.length > 2) {
            setItems(() => {
                return searchData(searchText, searchName,dataItems)
            })
            setPagination(()=>{
                return 0
            })
        }
    }


    function getItemIndexEnter(e:any){
        if(searchText.length>2 && e.key==="Enter"){
            setItems(()=>{
                return searchData(searchText,searchName,dataItems)
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

        setSearchText(()=>{
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

    function openDelItemPopup(e:any){
        setIsCompleted((isCompleted)=>{
            return !isCompleted
        })

        setChangeIndex(()=>{
            return +e.target.name
        })
    }

    function prevItem(){
        setIsCompleted((isCompleted)=>{
            return !isCompleted
        })
    }

    function delItem(){
        setIsCompleted((isCompleted)=>{
            return !isCompleted
        })

        setItems((items)=>{
            return items.filter((el)=>{
                return el.index!==changeIndex
            })

        })

        setDataItems((dataItems)=>{
            return dataItems.filter((el)=>{
                return el.index!==changeIndex
            })

        })
    }

    function openEditItemPopup(e:any){
        setIsEditable((isEditable)=>{
            return !isEditable
        })

        setChangeIndex(()=>{
            return +e.target.name
        })

    }


    function changeI(){
        let y= dataItems.find((el)=>{
            return el.index===changeIndex
        })
        // @ts-ignore
        let x= items[dataItems.indexOf(y)]
        // @ts-ignore
        return dataItems[x.index]
    }



    function changeInputName(e:any){

        // @ts-ignore
        setDataItems((dataItems)=>{
            return  dataItems.map((el)=>{
                if(el.index===changeI().index){
                    console.log(7)
                    // @ts-ignore
                    return {name:e.target.value,surname:el.surname,age:el.age,index:el.index}
                }else return el
            })
        })
        console.log(dataItems)

        return e.target.value
    }

    function changeInputSurname(e:any){
        // @ts-ignore
        setDataItems((dataItems)=> {
            return dataItems.map((el) => {
                if (el.index === changeI().index) {
                    // @ts-ignore
                    return {name: el.name, surname: e.target.value, age: el.age, index: el.index}
                } else return el
            })
        })
        return e.target.value
    }

    function changeInputAge(e:any){
        // @ts-ignore
        setDataItems((dataItems)=> {
            return dataItems.map((el) => {
                if (el.index === changeI().index) {
                    // @ts-ignore
                    return {name: el.name, surname: el.surname, age: e.target.value, index: el.index}
                } else return el
            })
        })
        return e.target.value
    }

    return(
        <div>
            {
                isCompleted?
                    <div className={"delContainer"}>
                        <button onClick={delItem} className={"del"}>yes</button>
                        <button onClick={prevItem} className={"del"}>no</button>
                    </div> :isEditable?

                        <div className={"changeInputContainer"}>
                            <input className={"changeInput"} onChange={changeInputName} defaultValue={changeI().name }  maxLength={12}/>
                            <input className={"changeInput"} onChange={changeInputSurname} defaultValue={changeI().surname} maxLength={12}/>
                            <input className={"changeInput"} onChange={changeInputAge} defaultValue={changeI().age} maxLength={3}/>
                            <button className={"changeInputButton"} onClick={openEditItemPopup}>edit</button>
                        </div>:

                    <div>
                        <div className={"headerContainer"}>
                            <button className={"all"} onClick={buildAllItems}>all items</button>

                            <div className={"inputContainer"} >

                                <BuildInput changeInput={(e:any)=>a(e)}
                                            getItemIndexEnter={(e: void) => {getItemIndexEnter(e)}}
                                            text={text}
                                />

                                <button className={"searchButton"} onClick={(e)=>getItemIndex(e)}><FaSearch
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
                                            dataItems={dataItems}
                                            item={el}
                                            key={generateUniqueID()}
                                            text={searchText}
                                            searchName={searchName}
                                            openDelItemPopup={(e: void) => {
                                                openDelItemPopup(e)
                                            }}
                                            openEditItemPopup={(e: void) => {
                                                openEditItemPopup(e)
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

