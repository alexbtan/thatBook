import '@styles/globals.css'

import Nav from '@components/Nav'
import Provider from '@components/Provider'

export const metadata = {
    title: "ThatBook",
    description: "Create a library of the books you've read"
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
        <head>
            <link rel='icon' href='/favicon.ico'/>
        </head>
        <body>
            <Provider>
                <div className="main">
                    <div className="gradient" />
                </div>
                <main className="app">
                    <Nav />
                    {children}
                </main>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout