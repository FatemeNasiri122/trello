import {createSlice} from "@reduxjs/toolkit";

const initialState = [{title: "to do", items:[] , id: 0 },{title: "doing", items:[] ,id: 1},{title: "done", items:[] ,id: 2}];

export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodoCard: (state ,action) =>{
            state.push({title: action.payload.input , items:[] , id: action.payload.id});
            return state;
        },
        addItem: (state ,action) =>{
            state.forEach((s) => {
                if (s.title === action.payload.title){
                    s.items.push({name: action.payload.input , dragId: 14,id: Math.floor(Math.random() * 100) , showInput: false , priority : 4})
                }
                s.items.sort((a, b) => a.priority - b.priority)
            })
            return state;
        },
        changePriority: (state ,action) =>{
            state.forEach((s) => {
                    s.items.map((item) => {
                        if (item.id === action.payload.item.id){
                            item.priority = action.payload.num
                            s.items.sort((a, b) => a.priority - b.priority)
                        }
                        s.items.sort((a, b) => a.priority - b.priority)
                    })
            })
            return state;
        },
        editTitle: (state ,action) =>{
            state.forEach((s , i) => {
                if (i === action.payload.id){
                    s.title = action.payload.inputTitle
                }
            })
            return state;
        },
        deleteList: (state ,action) =>{
            state.splice(action.payload.id , 1)
            return state;
        },

        editItem: (state ,action) =>{
            state.forEach((s) => {
                s.items.forEach((item , i) =>{
                    if (item.id === action.payload.item.id)
                        item.name = action.payload.input
                        item.showInput = false
                })
            })
            return state;
        },
        handleDrag: (state ,action) =>{
            state.forEach((s) => {
                if (s.id === +action.payload.destination.droppableId){
                    s.items.push(action.payload.temp);
                }
                if (s.id === +action.payload.source.droppableId){
                    s.items.forEach((item ,i ) =>{
                        s.items.splice(i , 1)
                    })
                }

            })
            return state;
        },
        moveItem: (state ,action) =>{
            const source = +action.payload.source.index ;
            const destination = +action.payload.destination.index;
            const ids = state.length
            state[source].id = destination
            state[destination].id = source
            state.sort((a, b) => a.id - b.id)
            for (let i = 0; i < ids; i++) {
                state[i].id = i
            }
            return state;
        },
    }
})

export const { addTodoCard , addItem , changePriority , moveItem, editTitle , deleteList , editItem , handleDrag } = todoSlice.actions;

export default todoSlice.reducer;