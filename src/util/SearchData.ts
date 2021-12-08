
export interface ChangeProps {
    text: string
}

export interface dataItem {
    name: string,
    surname: string,
    age: string
    index:number
}

export function searchData(text: string, searchText: string,dataItems:{
    name: string,
    surname: string,
    age: string
    index:number
}[]):{
    index:number,
    endIndex:number
}[] {
    let indexArr: {
        index: number,
        endIndex: number
    }[] = []
    if (text.length > 2) {

        dataItems.map((el: dataItem, ) => {
            let count = 0
            // @ts-ignore
            for (let i = 0; i < el[searchText].length; i++) {
                // @ts-ignore
                if (el[searchText][i].toLowerCase() === text[count].toLowerCase()) {
                    if (count === text.length - 1) {
                        indexArr.push({index: el.index, endIndex: i})
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
for (let i = 0;i<dataItems.length;i++){

    if(dataItems[i]!==null){
        res.push({index:dataItems[i].index, endIndex: 0})
    }
}
        return res
    }

}