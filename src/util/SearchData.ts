import {data} from "./Data";

export interface ChangeProps {
    text: string
}

export interface asd {
    name: string,
    surname: string,
    age: string
}

export function searchData(text: string, searchText: string):{
    index:number,
    startIndex:number
}[] {
    let indexArr: {
        index: number,
        startIndex: number
    }[] = []
    if (text.length > 2) {
        data().map((el: asd, index) => {
            let count = 0
            // @ts-ignore
            for (let i = 0; i < el[searchText].length; i++) {
                // @ts-ignore
                if (el[searchText][i].toLowerCase() === text[count].toLowerCase()) {
                    if (count === text.length - 1) {
                        indexArr.push({index: index, startIndex: i})
                        break
                    }
                    count++
                } else {
                    count = 0
                }
            }
            // @ts-ignore
            return el[searchText][0] === text[0]
        })
        return indexArr

    } else {
        let res = []
for (let i = 0;i<data().length;i++){
    res.push({index: i, startIndex: 0})
}
    return res
    }

}

