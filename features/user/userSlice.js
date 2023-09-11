const createSlice = require("@reduxjs/toolkit").createSlice;
const createAsyncThunk = require("@reduxjs/toolkit").createAsyncThunk;
const axios = require("axios")

const initialState = {
    loading: false,
    users:[],
    error:"",
    
}

//Esto genera tipos de acciones pending, fulfilled y rejected
//Los reducers no son generados por el slice y tienen que ser creados 
//como extraReducers
const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
    return axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then(response => response.data.map(user => user.id))
    
})

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false
            state.users = action.payload
        })
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    }

})

module.exports= userSlice.reducer;
module.exports.fetchUsers = fetchUsers