
import '../public/assets/css/style.scss'
import 'react-toastify/dist/ReactToastify.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

export default function MyApp ({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <>
      {getLayout(<Component {...pageProps} />)}
      <ToastContainer />
    </>
  ) 
}
