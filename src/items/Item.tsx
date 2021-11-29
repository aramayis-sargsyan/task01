import React from "react";
import {data} from "../util/Data";
import "./Item.css"
import exp from "constants";

export interface ItemType {
    index: Number
}

export const BuildItem = ({index}:ItemType):JSX.Element=>{
    return(
        <div className={"itemContainer"}>
            <p className={"item"}>Name: {

                // @ts-ignore
                data()[index].name
            }</p>
        <p className={"item"}>Surname: {
            // @ts-ignore
            data()[index].surName
        }</p>
        <p className={"item"}>Age: {
            // @ts-ignore
            data()[index].age
        }</p>
        </div>
    )
}

export default BuildItem