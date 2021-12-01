import React from "react";
import "./Select.css"

export interface SelectType {
    isEdit: boolean
    changeSearchName:()=>void
    changeSearch:()=>void
    searchName:string
}



export const BuildSelect = ({isEdit,changeSearchName,searchName,changeSearch}:SelectType ):JSX.Element=>{
    return(

        <div className={"selectContainer"}>
            {
                isEdit===true?
                    <>
                    <button className={"Button"} onClick={changeSearch} name={searchName}>{searchName}</button>
                    <div className={"selectButtonContainer"}>
                        <button className={"selectButton"} onClick={changeSearchName} name={"name"}>{"Name"}</button>
                        <button className={"selectButton"} onClick={changeSearchName} name={"surname"}>{"Surname"}</button>
                        <button className={"selectButton"} onClick={changeSearchName} name={"age"}>{"Age"}</button>
                    </div>
                    </> :
                    <button className={"Button"} onClick={changeSearch} name={searchName}>{searchName}</button>
            }
        </div>
    )
}

export default BuildSelect