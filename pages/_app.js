import 'antd/dist/antd.css';
import '../styles.css';
import { AuthProvider } from "../store";

function MyApp({ Component, pageProps }) {
    return (
        <>
            <AuthProvider>
                <Component {...pageProps} />
            </AuthProvider>
        </>
    );
}

export default MyApp;


