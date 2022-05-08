import { Avatar, Typography } from '@material-ui/core'
import React from 'react'
import useStyles from './style'

function LoginPage({children}) {
    const classes = useStyles()
    
    return (
        <div className={classes.container}>
            <h3 className={classes.header}>
                <Avatar className={classes.avatar} src="logo.jpg" />
            </h3>
            {children}
            <div className={classes.footer}>
            </div>
        </div>
    )
}

export default LoginPage
