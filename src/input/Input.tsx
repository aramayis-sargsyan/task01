import React, {ChangeEvent} from 'react';
import "./Input.css"

 export interface InputType {
    changeInput:  (event: any)=>void
    getItemIndexEnter:()=>void
    text:string
 }

export const BuildInput=({changeInput,getItemIndexEnter,text}: InputType):JSX.Element=>{
    return (
        <input onChange={changeInput} onKeyPress={getItemIndexEnter} className={"input"}  maxLength={15}  />
    )
}

export default BuildInput