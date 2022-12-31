import { Grid, Typography } from '@mui/material'
import React from 'react'

export const AuthLayout = ({children, title='', imageSrc='nothing', heightBox=420}) => {
  return (
    <>
      <Grid container
            spacing={0}
            justifyContent='center'
            alignItems='center'
            directions= "column"
          sx={{
            backgroundColor: '#0A1713',
            height: '100vh'
          }}>

            <Grid item 
            xs={4}
                  sx={{
                    backgroundColor: '#F5F5F5',
                    height: `${heightBox}px`,
                    borderRadius: '50px 0px 0px 50px'
                  }}>
                    <img src={imageSrc} 
                            height={`${heightBox}px`} 
                            width={'100%'} 
                            style={{
                              borderRadius: '50px 0px 0px 50px', 
                              boxShadow: '5px 10px 8px 10px #888888'
                            }} 
                    />
            </Grid>
            <Grid item 
                  xs={4}
                  justifyContent='center'
                  alignItems={'center'}
                  directions="column"
                  sx={{
                    backgroundColor: '#F5F5F5',
                    padding: 3,
                    height: `${heightBox}px`,
                    borderRadius: '0px 50px 50px 0px',
                    boxShadow: '5px 10px 8px 10px #888888'
                  }}>
                    <Typography variant="h5" sx={{
                      textAlign: 'center',
                      mb: 1
                    }}> 
                      {title}
                    </Typography>

                   {children}
            </Grid>


      </Grid>
    </>
  )
}
