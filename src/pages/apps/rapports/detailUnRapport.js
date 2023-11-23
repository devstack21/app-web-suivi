import React from 'react';
import { Card, CardContent, Typography, CardMedia, Grid, Chip,
  ListItemButton,
  ListItemText, List, ListItem} from '@mui/material';
  import { FormattedMessage, useIntl } from 'react-intl';
  import MainCard from 'components/MainCard';

function DetailUnRapport({ data }) {


  return (
    <Card>
  <Grid container direction="row">
    <Grid item xs={6}>
      <CardMedia
        component="img"
        // height="140"
        image={data.url}
        alt="Image"
      />
    </Grid>
    <Grid item xs={6}>
      <CardContent>
        <Grid container direction="row">
        <Grid container>
          <Grid item xs={6}>
              {/* <Typography variant="h6"><span  style={{fontWeight: 'bold', textTransform: 'uppercase'}}>Status: </span></Typography> */}
            </Grid>
            <Grid item xs={6} container justifyContent="flex-end">
              <Chip color={data.status == 'VALIDE'?'success':'warning'} label={data.status} size="small" />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <List>
              <ListItem>
                <ListItemText primary={<Typography variant="h6"><span  style={{fontWeight: 'bold', textTransform: 'uppercase'}}><FormattedMessage id='detailrapport-matricule' /> : </span>{data.matricule}</Typography>} />
              </ListItem>
              <ListItem>
                <ListItemText primary={<Typography variant="body2"><span  style={{fontWeight: 'bold', textTransform: 'uppercase'}}><FormattedMessage id='detailrapport-date' /> : </span>{new Date(data.heure).toLocaleDateString()}</Typography>} />
              </ListItem>
              <ListItem>
                <ListItemText primary={<Typography variant="body2"><span  style={{fontWeight: 'bold', textTransform: 'uppercase'}}><FormattedMessage id='detailrapport-Agent' /> : </span>{data.agent}</Typography>} />
              </ListItem>
              <ListItem>
                <ListItemText primary={<Typography variant="body2"><span  style={{fontWeight: 'bold', textTransform: 'uppercase'}}><FormattedMessage id='detailrapport-Validateur' /> : </span>{data.validateur}</Typography>} />
              </ListItem>
              <ListItem>
                <ListItemText primary={<Typography variant="body2"><span  style={{fontWeight: 'bold', textTransform: 'uppercase'}}><FormattedMessage id='detailrapport-type-transport' /> : </span>{useIntl().locale == 'fr'? data.type_trans: data.type_trans_en}</Typography>} />
              </ListItem>
              <ListItem>
                <ListItemText primary={<Typography variant="body2"><span  style={{fontWeight: 'bold', textTransform: 'uppercase'}}><FormattedMessage id='detailrapport-ville-provenance' /> : </span>{data.supply?.ville}</Typography>} />
              </ListItem>
              <ListItem>
                <ListItemText primary={<Typography variant="body2"><span  style={{fontWeight: 'bold', textTransform: 'uppercase'}}><FormattedMessage id='detailrapport-ville-destination' /> : </span>{data.delivery}</Typography>} />
              </ListItem>
            </List>
          </Grid>


          <Grid item xs={12} md={5} lg={4}>
            {/* <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="h5"><FormattedMessage id='detailrapport-list-animaux' /></Typography>
              </Grid>
              <Grid item />
            </Grid> */}
            <MainCard sx={{ mt: 2 }} content={false}>
              <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 0.5 } }}>
                {data.betails?.map((row, key) => {
                  return (
                    <ListItemButton divider key={key}>
                      <ListItemText primary={row.animal} />
                      <Typography variant="h5">{row.effectif}</Typography>
                    </ListItemButton>
                  );
                })}
              </List>
            </MainCard>
          </Grid>

        </Grid>
      </CardContent>
    </Grid>
  </Grid>
</Card>

  );
}
{/* <span  style={{fontWeight: 'bold', textTransform: 'uppercase'}}></span> {data.status.toLowerCase()} */}
export default DetailUnRapport;
