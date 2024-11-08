export default function ({$axios, redirect}) {
  // request interceptor
  $axios.interceptors.request.use(
    config => {
      // do something before request is sent
      return config;
    },
    error => {
      // do something with request error
      return Promise.reject(error)
    }
  )
  $axios.onRequest(config => {
    console.log('Making request to ' + config.url)
  })
  // response interceptor
  $axios.interceptors.response.use(
    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
      const res = response.data;
      if (res.code === 200) {
        return res
      } else {
        return Promise.reject(new Error(res["e_code"]));
      }
    },
    error => {
      console.log('err' + error)
      return Promise.reject(error)
    }
  );
  $axios.onError(error => {
    console.log(error);
    /*const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/404')
    } else if (code === 500) {
      redirect('/500')
    }*/
  })
}
