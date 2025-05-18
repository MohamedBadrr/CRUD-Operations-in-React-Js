export const txtSlicer  = ( txt : string , max :number = 70) : string =>{
    if (txt.length >= max) return `${txt.slice(0,max)}...`
    return txt;
}