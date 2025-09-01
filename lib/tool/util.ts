
export const  cssAttrSymbolTransition=(str:string):string=>{
    const text= str.replace(/[A-Z]/g,function(con){
        return `-${con.toLowerCase()}`
    })
    return text
}
export const isPromise = (object:any) => {
    return object instanceof Promise;
}