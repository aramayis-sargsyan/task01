import  React from 'react';
import "./Input.css"

 export interface InputType {
    changeInput: () => void
    getItemIndexEnter:()=>void
 }

export const BuildInput=({changeInput,getItemIndexEnter}: InputType):JSX.Element=>{
    return (
        <input onChange={changeInput} onKeyPress={getItemIndexEnter} className={"input"}/>
    )
}

export default BuildInput