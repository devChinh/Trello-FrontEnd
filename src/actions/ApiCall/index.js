import axios from "axios"

// Status 200
export const fetchBoardDetails = async (id) => {
    const request = await axios.get(`http://localhost:8080/trelloApi/boards/${id}`)
    return request.data
}

// status 200
 export const updatedBoard = async (id , data) => {
    const request = await axios.put(`http://localhost:8080/trelloApi/boards/${id}` , data)
    console.log('============= request.data',request.data)
    return request.data
 }

// Status 200
export const createNewColumn = async (data) => {
    const request = await axios.post(`http://localhost:8080/trelloApi/columns` , data)
    return request.data
}


// Status 200
export const updateApiNewColumn = async (id ,data) => {
    const request = await axios.put(`http://localhost:8080/trelloApi/columns/${id}` , data)
    console.log('============= request.data',request.data)
    return request.data
}


// status 200
export const createNewCard = async (data) => {
    const request = await axios.post(`http://localhost:8080/trelloApi/cards` , data)
    return request.data
}

// status 200
export const deleteCardApi = async (id) => {
    const request = await axios.delete(`http://localhost:8080/trelloApi/cards/${id}`)
    return  request.data
}

export const updateCard = async (id ,data) => {
    const request = await axios.put(`http://localhost:8080/trelloApi/cards/${id}`, data)
    console.log('============= request.card',request.data)
    return request.data
}

// status 200
export const deleteColumn = async (id) => {
    const request = await axios.delete(`http://localhost:8080/trelloApi/columns/${id}` )
    return request.data
}


