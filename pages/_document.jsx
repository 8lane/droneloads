import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en" className="text-coolGray-200 leading-tight">
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            rel="preload"
            href="https://fonts.googleapis.com/css2?family=Raleway:wght@200&amp;display=swap"
            as="style"
            onload="this.onload=null;this.rel='stylesheet'"
          />
          <noscript>
            <link
              href="https://fonts.googleapis.com/css2?family=Raleway:wght@200&amp;display=swap"
              rel="stylesheet"
              type="text/css"
            />
          </noscript>
        </Head>
        <body className="min-h-screen bg-coolGray-900">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument