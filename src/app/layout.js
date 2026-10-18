
import "./globals.css";
import Provider from '../redux/Provider';
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="h-full"
    >
      <body className="min-h-full flex flex-col">
          <Provider>
                  {children}
          </Provider>
      </body>
    </html>
  );
}
