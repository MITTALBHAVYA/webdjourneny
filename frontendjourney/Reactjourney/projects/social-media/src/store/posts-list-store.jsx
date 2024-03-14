import { createContext, useReducer } from "react";


export const PostList = createContext({
    postList:[],
    addPost:()=>{},
    addInitialPosts:()=>{},
    deletePost:()=>{},
}
);
//contract design
const postListReducer = (currPostList,action)=>{
    let newPostList=currPostList;
    if(action.type === 'DELETE_POST'){
        newPostList=currPostList.filter((post)=>post.id!==action.payload.postId);
    }
    else if(action.type==="ADD_INITIAL_POSTS"){
        newPostList=action.payload.posts;
    }
    else if(action.type==="ADD-POST"){
        newPostList=[action.payload,...currPostList]
    }
    return newPostList;
}
const PostListProvider=({children})=>{

    const [postList,dispatchPostList]=useReducer(postListReducer,[]);
    const addPost = (post)=>{
        dispatchPostList({
            type:"ADD-POST",
            payload : {
                post
            },
        });
    };
    const addInitialPosts = (posts)=>{
        dispatchPostList({
            type:"ADD_INITIAL_POSTS",
            payload : {
                posts,
            },
        });
    };
    const deletePost=(postId)=>{
        // console.log(`delete post called for : ${postId}`);
        dispatchPostList({
            type:'DELETE_POST',
            payload:{
                postId,
            },
        });
    };

    return (
        <PostList.Provider value={{
            postList:postList,addPost:addPost,addInitialPosts,deletePost:deletePost
        }}>{children}</PostList.Provider>
    )
};

export default PostListProvider;