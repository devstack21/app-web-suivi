import React from 'react';
import { Card, CardContent, Typography, CardMedia, Grid, Chip } from '@mui/material';

function DetailUnRapport({ data }) {

  console.log("le data", data);

  return (
    <Card>
      <Grid container direction="column" alignItems="center">
        <CardMedia
          component="img"
          height="140"
          image={data.url}
          alt="Image"
        />

        <CardContent>
          <Grid container direction="row">
          <Grid item xs={12}>
            <Typography variant="h6"><span  style={{fontWeight: 'bold', textTransform: 'uppercase'}}>Matricule: </span>{data.matricule}</Typography>
            <Typography variant="body2"><span  style={{fontWeight: 'bold', textTransform: 'uppercase'}}>Heure: </span>{data.heure}</Typography>
            <Typography variant="body2"><span  style={{fontWeight: 'bold', textTransform: 'uppercase'}}>Agent: </span>{data.agent}</Typography>
            <Typography variant="body2"><span  style={{fontWeight: 'bold', textTransform: 'uppercase'}}>Validateur: </span>{data.validateur}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2"><span  style={{fontWeight: 'bold', textTransform: 'uppercase'}}>Type de transport: </span>{data.type_transport}</Typography>
            <Typography variant="body2"><span  style={{fontWeight: 'bold', textTransform: 'uppercase'}}>Quantite: </span>{data.quantity}</Typography>
            {/* <Typography variant="body2"><span  style={{fontWeight: 'bold', textTransform: 'uppercase'}}>Pays d approvisionnement: </span> {data.supply.pays.name}</Typography> */}
            {/* <Typography variant="body2"><span  style={{fontWeight: 'bold', textTransform: 'uppercase'}}>Ville approvisionnement: </span> {data.supply.ville}</Typography> */}
            {/* <Typography variant="body2"><span  style={{fontWeight: 'bold', textTransform: 'uppercase'}}>Pays de destination:</span> {data.delivery.pays.name}</Typography> */}
            {/* <Typography variant="body2"><span  style={{fontWeight: 'bold', textTransform: 'uppercase'}}>Ville destination: </span>{data.delivery.ville}</Typography> */}
            <Typography variant="body2"><span  style={{fontWeight: 'bold', textTransform: 'uppercase'}}>Status: </span>
              <Chip color={data.status == 'VALIDE'?'success':'warning'} label={data.status} size="small" />
            </Typography>
          </Grid>
          </Grid>
        </CardContent>
      </Grid>
    </Card>
  );
}
{/* <span  style={{fontWeight: 'bold', textTransform: 'uppercase'}}></span> {data.status.toLowerCase()} */}
export default DetailUnRapport;
