import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="zh">
            <Head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
              (function() {
                if (typeof window !== 'undefined') {
                  window.addEventListener('load', function() {
                    document.body.classList.remove('vsc-initialized');
                  });
                }
              })();
            `,
                    }}
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
} 