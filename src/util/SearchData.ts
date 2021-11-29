import {data} from "./Data";

export interface ChangeProps {
    text: string
}

export function searchData(text: string, selectText: string):Number[]  {
    // @ts-ignore
    let indexArr:Number[]=[]
let x = data().filter((el, index)=>{
    // @ts-ignore
    if(el[selectText].slice(0,text.length)===text){
        indexArr.push(index)
    }
    // @ts-ignore
   return el[selectText][0]===text[0]
})
    return indexArr

}
