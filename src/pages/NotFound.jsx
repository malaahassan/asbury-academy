import { Link } from 'react-router-dom';

function NotFound() {
  
  return (
    <div>
     <div className="inner-content">
        <div
            style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "calc(100vh - 81px)",
                color: "rgb(51, 51, 51)",
                /* backgroundColor: 'rgb(248, 248, 248)', */ /* fontFamily: 'Arial, sans-serif', */ width:
                "100%"
            }}
            >
            {/* <h1 style={{ fontSize: 96, fontWeight: "bold", margin: 0 }}>
                <span style={{ fontSize: 110, color: "#e7267f" }}>4</span>0
                <span style={{ fontSize: 110, color: "#e7267f" }}>4</span>
            </h1>
            <p style={{ fontSize: 18, fontWeight: "bold", margin: 0 }}>
                OOPS! PAGE NOT FOUND
            </p> */}
            <img src="/images/404.png" className="not-found-page-img" />
            <p style={{ fontSize: 17, fontWeight: "normal" }}>
                We are sorry, but the page you requested was not found
            </p>
            <Link to='/'
                className="post-button"
                style={{ width: 130, height: 30, borderRadius: 30 }}
            >
                Dashboard
            </Link>
        </div>
     </div>
   </div>
 );

}
  
export default NotFound;