
import "./globals.css";
import Provider from '../redux/Provider';
import Navbar from "@/components/Navbar";
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="h-full"
    >
      <body className="min-h-full flex flex-col">
          <Provider>
                <Navbar/>
                  {children}
          </Provider>
      </body>
    </html>
  );
}
