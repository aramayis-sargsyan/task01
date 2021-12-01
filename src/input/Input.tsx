import  React from 'react';
import "./Input.css"

 export interface InputType {
    changeInput: () => void
    getItemIndexEnter:()=>void
    text:string
 }

export const BuildInput=({changeInput,getItemIndexEnter,text}: InputType):JSX.Element=>{
    return (
        <input onChange={changeInput} onKeyPress={getItemIndexEnter} className={"input"} value={text}/>

    )
}

export default BuildInput