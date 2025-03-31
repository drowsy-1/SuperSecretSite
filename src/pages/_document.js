// src/pages/_document.js (create if it doesn't exist)
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                {/* Force indexing */}
                <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" key="robots" />
            </Head>
            <body>
            <Main />
            <NextScript />
            </body>
        </Html>
    )
}