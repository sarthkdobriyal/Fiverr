export const INITIAL_STATE = {
    userId: "",
    title:"",
    category: "",
    coverImg:"",
    images:"",
    desc:"",
    shortTitle:"",
    shortDesc: "",
    deliveryTime:"",
    revisionNumber:0,
    features:[],
    price: 0
}


export const gigReducer = (state, action) => {
    switch (action.type) {
        case "CHANGE_INPUT":
            return {
                ...state,
                [action.payload.name]: action.payload.value,

            };
        case "ADD_IMAGES":
            return {
                ...state,
                coverImg : action.payload.coverImg,
                images : action.payload.images,
            };
        case "ADD_FEATURES":
            return {
                ...state,
                features : [...state.features, action.payload]
            }
        case "REMOVE_FEATURES":
            return {
                ...state,
                features : state.features.filter((feature) => feature !== action.payload)
            }
        default:
            return state
    }
}