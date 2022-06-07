import { StateProvider } from 'components/StateProvider'
import 'styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <StateProvider>
        <div  className='bg-slate-100'>
        <Component {...pageProps} />
        </div>
      </StateProvider>
    </>
  )
}

export default MyApp
