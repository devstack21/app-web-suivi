
// material-ui
import { CardContent, Grid, Typography } from '@mui/material';

// project imports
import Avatar from 'components/@extended/Avatar';

import { FormattedMessage } from 'react-intl'
import EmptyUserCard from 'components/cards/skeleton/EmptyUserCard';
import { useSelector } from 'react-redux';
import { CarOutlined } from '@ant-design/icons';



const TransportItinary = () => {

  const { result } = useSelector((state) => state.transport.detail);

  return (
    <CardContent maxWidth="xl">
      <Grid
        container
        spacing={2.75}
        alignItems="center"
        sx={{
          position: 'relative',
          '&>*': {
            position: 'relative',
            zIndex: '5'
          },
          '&:after': {
            content: '""',
            position: 'absolute',
            top: 10,
            left: 38,
            width: 2,
            height: '100%',
            background: '#ebebeb',
            zIndex: '1'
          }
        }}
      >

        {result.length > 0 ?
          <>
            {result.map((item) => (
              <Grid item xs={12} md={12} key={item.pk}>
                <Grid container spacing={2}>
                  <Grid item>
                    <Avatar type="filled" color="success" size="sm" sx={{ top: 10 }}>
                      <CarOutlined />
                    </Avatar>
                  </Grid>
                  <Grid item xs zeroMinWidth>
                    <Grid container spacing={0}>
                      <Grid item xs={12}>
                        <Typography align="left" variant="caption" color="secondary">
                          {new Date(item.date).toLocaleDateString()}

                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography align="left" variant="body2">
                          {item.nom_ckpt}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography align="left" variant="body2">
                          {item.betails.map((betail) => `${betail.animal}: ${betail.effectif}`).join(', ')}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </>
          :
          <EmptyUserCard title={<FormattedMessage id='itineraire-no-deplacement' />} />
        }

      </Grid>
    </CardContent>
  )

}



export default TransportItinary;
