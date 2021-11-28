import  Document, {Html ,Head, Main, NextScript} from "next/document";

class MyDocument extends Document{
    render(){
        return(
            <Html lang = "en">
                <Head>
                    <meta name = "description " content = "Lemon"></meta>
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"></link>
                    <link rel="canonical" href="https://getbootstrap.com/docs/4.5/examples/dashboard/"></link>
                    <link href="../assets/dist/css/bootstrap.min.css" rel="stylesheet"></link>
                    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap" rel="stylesheet"></link>
                    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js"></script>
                    <script src="https://kit.fontawesome.com/a076d05399.js"></script>
                    <script src={`https://www.paypal.com/sdk/js?client-id=${process.env.PAYPAL_CLIENT_ID}`}></script>
                </Head>
                <body>
                    <Main></Main>
                    <NextScript></NextScript>
                    
                </body>
            </Html>
        )
    }
}

export default MyDocument