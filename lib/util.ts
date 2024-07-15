
export const  className=(str:string):string=>{
    return str.replace(/^\s+|\s+$/g,"")
}
export const  cssAttrSymbolTransition=(str:string):string=>{
    let text= str.replace(/[A-Z]/g,function(con){
        return `-${con.toLowerCase()}`
    })
    return text
}
export const isPromise = (object:any) => {
    return object instanceof Promise;
}