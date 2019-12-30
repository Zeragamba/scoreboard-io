import {Button, Grid} from '@material-ui/core';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import PlayerSelectors from '../../../players/player.selectors';
import {EndRound} from '../../game.actions';
import PlayerScoreCard from './player-score-card';

const CurrentGamePage:React.FC = () => {
  const dispatch = useDispatch();
  const players = useSelector(PlayerSelectors.all());
  const onEndRound = () => dispatch(EndRound());

  return (
    <Grid container spacing={1}>
      {players.map((player) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={player.id}>
          <PlayerScoreCard player={player} />
        </Grid>

      ))}
      <Grid item xs={12}>
        <Button variant={"contained"} color={"secondary"} fullWidth onClick={onEndRound}>End Round</Button>
      </Grid>
    </Grid>
  );
};

export default CurrentGamePage;
