import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme)=> ({
    container: {
        width: "100%",
        height: "100vh",
        background: `linear-gradient(to bottom,rgba(170,123,95,0.9),rgba(100,123,95,1)),
            url(https://giakethoitrang.com/Images/kinh-nghiem-mo-shop-quan-%C3%A1o.jpg)`,
        backgroundSize: "cover",
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
    },
    header: {
       
    },
    avatar:{
        width:"90px",
        height:"90px ",
    },
    footer:{
        flex:0.4
    },
   
}))