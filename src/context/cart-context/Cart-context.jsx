import React, { createContext,useReducer } from "react";


const defaultCartState = {
    items:[],
    totalAmount:0
}

const cartReducer = (state,action)=>{
    if(action.type === 'ADD'){
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        
        const existingCartItemIndex = state.items.findIndex(item=>item.id === action.item.id);

        const existingCartItem = state.items[existingCartItemIndex];

        let updatedItems;
        let updatedItem;

        if(existingCartItem){
            updatedItem = {
                ...existingCartItem,
                amount:existingCartItem.amount + action.item.amount
            }
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }else{
            updatedItem = {...action.item};
            updatedItems = state.items.concat(action.item);
        }
        return {
            items:updatedItems,
            totalAmount:updatedTotalAmount
        }
    }
    
    if(action.type === 'REMOVE'){
        const existingCartItemIndex = state.items.findIndex(item=>item.id === action.id);

        const existingCartItem = state.items[existingCartItemIndex];

        const updatedTotalAmount = state.totalAmount - existingCartItem.price;

        let updatedItems;
        let updatedItem;

        if(existingCartItem.amount === 1){
            updatedItems = state.items.filter(item=>item.id !== action.id);
        }else{
            updatedItem = {
                ...existingCartItem,
                amount:existingCartItem.amount - 1
            }
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        return {
            items:updatedItems,
            totalAmount:updatedTotalAmount
        }

    }
  
    return defaultCartState;

}

const cartContex = createContext();

export const CartProvider = ({children})=> {
 
  
    const [cartState,dispatchCartAction] = useReducer(cartReducer,defaultCartState);

    const addItemToCartHandler = (item)=>{
        dispatchCartAction({type:'ADD',item:item})
    }

    const removeItemFromCartHandler = (id)=>{
        dispatchCartAction({type:'REMOVE',id:id})
    }


    return <cartContex.Provider 
            value={{
                items:cartState.items,
                totalAmount:cartState.totalAmount,
                addItemToCartHandler,
                removeItemFromCartHandler                                                    
            }} >
            {children}
          </cartContex.Provider>

}

export default cartContex;




// import { createContext, useState, useEffect } from "react";
// import React from "react";
// import Cookies from "js-cookie";
// import sortArray from "sort-array";

// const DocLibContext = createContext();

// export const DocLibProvider = ({ children }) => {
//   const langCode = document.getElementById("language-code")?.value || "en";
//   //Search State
//   const [randQuery, setRandQuery] = React.useState(0);
//   const [searchInput, setSearchInput] = React.useState("");
//   const [searchedTerm, setSearchedTerm] = useState("");

//   //Filter State
//   const [selectedSector, setSelectedSector] = useState([]);
//   const [sectors, setSectors] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState([]);

//   //Documents state
//   const [docs, setDocs] = useState([]);
//   const [docsIsLoading, setDocsIsLoading] = useState(false);
//   const [filtersIsLoading, setFiltersIsLoading] = useState(false);
//   const [rowsSearchData, setRowsSearchData] = useState({});
//   const [advSearch, setAdvSearch] = useState(false);

//   //query
//   const [rows, setRows] = useState([]);

//   //Docs Count
//   const [count, setCount] = React.useState(0);

//   // Pagination State
//   const [page, setPage] = React.useState(0);
//   const [pageCount, setPageCount] = React.useState(1);

//   // Get fields
//   useEffect(() => {
//     fetchField();
//   }, []);

//   const fetchField = async () => {
//     setFiltersIsLoading(true);
//     const response = await fetch(
//       `/${langCode}/api/search/fields/?table=Documents&context=filters&no_fetching`
//     );
//     const data = await response.json();
//     const sectors = data.filter((obj) => obj.field_name == "sector");
//     const categories = data.filter((obj) => obj.field_name == "categorie");

//     setSectors(sectors[0].values);
//     setCategories(categories[0].values);
//     setFiltersIsLoading(false);
//   };

//   //Get Documents
//   useEffect(() => {
//     //order by first selected filter
//     sortArray(rows, {
//       by: ["order"],
//     });
//     // First, check if the first element is not "where"
//     if (rows.length > 0 && rows[0].condition !== "where") {
//       rows[0].condition = "where";
//     }

//     for (let i = 1; i < rows.length; i++) {
//       if (rows[i].field !== rows[i - 1].field) {
//         rows[i].condition = "and";
//       }
//     }

//     const sortTitleByLang = langCode == "en" ? {
//       ["titre_doc_en.keyword"]: { order: "asc" }
//     } : {
//       ["titre_doc_fr.keyword"]: { order: "asc" }
//     };

//     const searchData = {
//       query: searchInput !== searchedTerm ? searchInput : searchedTerm,
//       page: page + 1,
//       filters: [
//         {
//           Documents: {
//             conditions: rows,
//             sort: sortTitleByLang,
//           },
//         },
//       ],
//     };

//     setRowsSearchData({ conditions: rows });
//     if (!advSearch) fetchDocs(searchData);
//   }, [rows, page, searchedTerm, randQuery]);

//   //Fetch Docs
//   const fetchDocs = async (data) => {
//     setDocsIsLoading(true);

//     const CSRF_TOKEN = Cookies.get("csrftoken");

//     async function postData(url = `/${langCode}/api/search/`, data = {}) {
//       const response = await fetch(url, {
//         method: "POST",
//         mode: "cors",
//         cache: "no-cache",
//         credentials: "same-origin",
//         headers: {
//           "X-CSRFToken": CSRF_TOKEN,
//           "Content-Type": "application/json",
//           // 'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         redirect: "follow", // manual, *follow, error
//         referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//         body: JSON.stringify(data), // body data type must match "Content-Type" header
//       });
//       return response.json();
//     }

//     postData(`/${langCode}/api/search/`, data).then((data) => {
//       const nbrPages = data.count / 10;
//       setPageCount(Math.ceil(nbrPages));
//       const docs = data.results.map((data) => {
//         return data.result;
//       });
//       setCount(data.count);
//       setDocs(docs);
//       setDocsIsLoading(false);
//     });
//   };

//   //Search docs
//   const handleSearchInput = (e, tab = 5) => {
//     if (tab != 5) setAdvSearch(true);
//     setSearchInput(e.target.value);
//   };

//   const searchDocs = () => {
//     setPage(0);
//     setSearchedTerm(searchInput);
//   };

//   // handleKeyDown function
//   const handleKeyDown = (event) => {
//     if (event.key === "Enter") {
//       setPage(0);
//       setSearchedTerm(searchInput);
//     }
//   };

//   // highest order
//   function getHighestOrder(array) {
//     let highestPrice = 99999999;
//     for (let i = 0; i < array.length; i++) {
//       if (array[i].order > highestPrice) {
//         highestPrice = array[i].order;
//       }
//     }
//     return highestPrice;
//   }

//   //Handle sectore Change
//   const handleSelectedSectore = (item) => {
//     setPage(0);
//     //get latest selected
//     const latestSelected = selectedSector
//       .filter((x) => !item.includes(x))
//       .concat(item.filter((x) => !selectedSector.includes(x)));
//     const newSector = {
//       order: 99999999,
//       condition: "or",
//       field: "sector.id",
//       operator: "is",
//       value: latestSelected[0].value,
//     };

//     if (item.length > selectedSector.length) {
//       setSelectedSector(item);

//       setRows((prevStat) => {
//         return [...prevStat, newSector];
//       });

//       if (rows.some((obj) => Object.values(obj).includes("sector.id"))) {
//         const indx = rows.findIndex((obj) => obj["field"] === "sector.id");
//         newSector.order = rows[indx].order;
//       } else {
//         const bigOrder = getHighestOrder(rows);
//         newSector.order = bigOrder + 1;
//       }
//     } else {
//       //get the removed option
//       const removedOption = selectedSector
//         .filter((x) => !item.includes(x))
//         .concat(item.filter((x) => !selectedSector.includes(x)));

//       setSelectedSector(item);

//       setRows(() =>
//         rows.filter((item) => {
//           return item.value !== removedOption[0].value;
//         })
//       );
//     }
//   };

//   //Handle category Change
//   const handleSelectedCategory = (item) => {
//     setPage(0);
//     //get latest selected
//     const latestSelected = selectedCategories
//       .filter((x) => !item.includes(x))
//       .concat(item.filter((x) => !selectedCategories.includes(x)));
//     const newSector = {
//       order: 99999999,
//       condition: "or",
//       field: "categorie.id",
//       operator: "is",
//       value: latestSelected[0].value,
//     };

//     if (item.length > selectedCategories.length) {
//       setSelectedCategories(item);

//       setRows((prevStat) => {
//         return [...prevStat, newSector];
//       });

//       if (rows.some((obj) => Object.values(obj).includes("categorie.id"))) {
//         const indx = rows.findIndex((obj) => obj["field"] === "categorie.id");
//         newSector.order = rows[indx].order;
//       } else {
//         const bigOrder = getHighestOrder(rows);
//         newSector.order = bigOrder + 1;
//       }
//     } else {
//       //get the removed option
//       const removedOption = selectedCategories
//         .filter((x) => !item.includes(x))
//         .concat(item.filter((x) => !selectedCategories.includes(x)));
//       setSelectedCategories(item);

//       setRows(() =>
//         rows.filter((item) => {
//           return item.value !== removedOption[0].value;
//         })
//       );
//     }
//   };

//   const resetFilters = () => {
//     setSelectedSector([]);
//     setSelectedCategories([]);
//     setRows([]);
//   };

//   // Handle page change
//   const handlePageClick = (e) => {
//     setPage(e.selected);
//     window.scrollTo(0, 0);
//   };

//   return (
//     <DocLibContext.Provider
//       value={{
//         searchDocs,
//         setSearchInput,
//         handleSearchInput,
//         setSearchedTerm,
//         handleSelectedSectore,
//         resetFilters,
//         handleSelectedCategory,
//         handleKeyDown,
//         handlePageClick,
//         rows,
//         pageCount,
//         page,
//         selectedCategories,
//         searchInput,
//         selectedSector,
//         docs,
//         docsIsLoading,
//         filtersIsLoading,
//         count,
//         sectors,
//         categories,
//         rowsSearchData,
//         setAdvSearch,
//         setRandQuery,
//       }}
//     >
//       {children}
//     </DocLibContext.Provider>
//   );
// };

// export default DocLibContext;
