import React, { createContext } from "react";
import { useContext,useState } from "react";

const cartContex = createContext();


export const CartProvider = ({children})=> {

    const [isOpen,setIsOpen] = useState(false);

    //Toogle cart

    const toogleCart = ()=>{
        if(!isOpen){
            setIsOpen(true)
        }else{
            setIsOpen(false)
        }
    }

    return <cartContex.Provider value={{toogleCart}} >
            {children}
          </cartContex.Provider>

}