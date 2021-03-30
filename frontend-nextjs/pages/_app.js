import '../assets/style.css'
import useSWR, { SWRConfig } from 'swr'
import axios from 'axios'

axios.defaults.baseURL = "http://localhost:1337/"
axios.defaults.withCredentials = true;

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
     let {data} = useSWR('/user/auth', (url) => axios(url).then(r => r.data));

     return (
          <SWRConfig value={{fetcher: (url) => axios(url).then(r => r.data)}}>
               <Component {...pageProps} user={data} />
          </SWRConfig>
     )
}
