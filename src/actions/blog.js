import config from "../config.js";
import axios from 'axios';
export const FETCH_BLOGS_BEGIN   = 'FETCH_BLOGS_BEGIN';
export const FETCH_BLOGS_SUCCESS = 'FETCH_BLOGS_SUCCESS';
export const EDIT_BLOGS_SUCCESS = 'EDIT_BLOGS_SUCCESS';
export const FETCH_BLOGS_FAILURE = 'FETCH_BLOGS_FAILURE';

export const fetchBlogsBegin = () => ({
  type: FETCH_BLOGS_BEGIN
});

export const fetchBlogsSuccess = (blogs, ary) => ({
  type: FETCH_BLOGS_SUCCESS,
  payload: { blogs, ary }
});

export const editBlogsSuccess = (blogs, ary) => ({
  type: EDIT_BLOGS_SUCCESS,
  payload: { blogs, ary }
});

export const fetchBlogsFailure = error => ({
  type: FETCH_BLOGS_FAILURE,
  payload: { error }
});

export function fetchBlogs() {
  return (dispatch) => {
    axios.get(config.baseURLApi+'get_blogs')
        .then(function (response) {
          const mimeType = 'image/png';
          var ary=[];
          response.data.data.map((res, index) => {
            console.log(res.image);
            if(res.image != null){
              const buffer = res.image;
              const b64 = new Buffer(buffer).toString('base64')
              var url = `data:${mimeType};base64,${b64}`;
              ary.push({'id': res.id, url: url })
            }
          })
          dispatch(fetchBlogsSuccess(response.data.data, ary));
          return response.data.data;
        })
        .catch(function (error) {
            dispatch(fetchBlogsFailure(error))
        })
    }
}

export function createBlog(data) {
  console.log(config.baseURLApi+"create_blog");
  return (dispatch) => {
    const formData = new FormData();
    formData.append('myImage', data.image);
    formData.append('title', data.title);
    formData.append('description', data.description);
    console.log(formData);
    // const config = {
    //     headers: {
    //         'content-type': 'multipart/form-data'
    //     }
    // };
    // axios.post(config.baseURLApi+"create_blog",formData,config)
    axios({
      method: 'post',
      url: config.baseURLApi+"create_blog",
      data: formData,
      headers: {'Content-Type': 'multipart/form-data' }
      })
    .then((response) => {
      dispatch(fetchBlogs())
    })
    .catch((error) => {
      dispatch(fetchBlogsFailure(error))
    });
    }
}

export function updateBlog(data) {
  return (dispatch) => {

    const formData = new FormData()
    formData.append('id', data.id)
    if(data.updateImage){
      formData.append('myImage', data.image)
      formData.append('updateImage', 'true')
    }
    else{
      formData.append('updateImage', 'false')
    }

    formData.append('title', data.title)
    formData.append('description', data.description)

    // axios.post(config.baseURLApi+'updateBlog', formData, { // receive two parameter endpoint url ,form data
    // })
    axios.post(config.baseURLApi+'updateBlog', formData, { // receive two parameter endpoint url ,form data
    })
    .then((response) => {
      dispatch(fetchBlogs())
    })
    .catch((error) => {
      dispatch(fetchBlogsFailure(error))
    });
    // axios.post( config.baseURLApi+"updateBlog/", {id: data.id, title: data.title, description: data.description})
    // .then((response) => {
    //   window.location.reload();
    // })
    // .catch((error) => {
    //   dispatch(fetchBlogsFailure(error))
    // });
    }
}

export function getBlog(data) {
  return (dispatch) => {
    axios({
      method: 'get',
      url: config.baseURLApi+"get_blog/"+data.id,
      })
    .then((response) => {
      const mimeType = 'image/*';
      var ary = '';
      const buffer = response.data.data.image;
      console.log(buffer);
      if(response.data.data.image != null){
        console.log("if");
        const b64 = new Buffer(buffer).toString('base64')
        ary=`data:${mimeType};base64,${b64}`
      }

      dispatch(editBlogsSuccess(response.data.data, ary));
      return response.data.data;
    })
    .catch((error) => {
      dispatch(fetchBlogsFailure(error))
    });
    }
}

export function deleteBlog(data) {
  return (dispatch) => {
    axios({
      method: 'delete',
      url: config.baseURLApi+"delete_blog/"+data.id,
      })
    .then((response) => {
      // return response.data.data;
      dispatch(fetchBlogs())
    })
    .catch((error) => {
      dispatch(fetchBlogsFailure(error))
    });
    }
}




// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
