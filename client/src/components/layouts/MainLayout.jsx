import Footer from "./navigation/Footer"
import Navbar from "./navigation/Navbar"

// eslint-disable-next-line react/prop-types
const MainLayout = ({ children }) => {
  return (
    <div className='flex flex-col min-h-screen bg-background'>
        <Navbar />

        <main className='flex-1 flex-col pt-navbar-default sm:pt-navbar-md'>
            {children}
        </main>

        <Footer />
    </div>
  )
}

export default MainLayout