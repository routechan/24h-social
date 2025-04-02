
export async function fetchPost(postId:string){
  return fetch(`/api/post/${postId}`,{
    method:"GET",
    headers:{"Content-Type": "application/json"}
  })
}