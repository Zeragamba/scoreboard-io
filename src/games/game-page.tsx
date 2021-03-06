import {Button, Divider, Grid} from '@material-ui/core';
import NextRoundIcon from '@material-ui/icons/NavigateNext';
import {push} from 'connected-react-router';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PageTitle from '../common/page-title';
import State, {useGame, useGameSettings} from '../store/state';
import {EndRound, SetDealer} from './game.actions';
import LeaderBoard from './leaderboard';
import PlayerScoreCard from './player-score-card';

const GamePage:React.FC = () => {
  const dispatch = useDispatch();
  const players = useSelector((state:State) => state.players);
  const round = useSelector((state:State) => state.game.round);

  const useDealer = useGameSettings((state) => state.useDealer);
  const dealerId = useGame((state) => state.dealerId);

  const onEndRound = () => {
    dispatch(EndRound());

    if (useDealer) {
      let playerIds = Object.values(players);
      let currentDealerIndex = playerIds.findIndex((p) => p.id === dealerId);
      let nextDealer = playerIds[currentDealerIndex + 1] || playerIds[0];
      dispatch(SetDealer(nextDealer.id));
    }
  };

  if (Object.values(players).length === 0) {
    const onAddPlayer = () => dispatch(push('/players/new'));

    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <PageTitle>No players found</PageTitle>
        </Grid>

        <Grid item xs={12}>
          <Button onClick={onAddPlayer} fullWidth variant={'outlined'}>Add Player</Button>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <PageTitle>Round {round}</PageTitle>
      </Grid>

      <Grid item xs={12}>
        <LeaderBoard />
      </Grid>

      <Grid item xs={12}>
        <Divider />
      </Grid>

      {Object.values(players).map((player) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={player.id}>
          <PlayerScoreCard player={player} />
        </Grid>
      ))}

      <Grid item xs={12}>
        <Button color={'secondary'} variant="contained" fullWidth onClick={onEndRound}>
          End Round
          <NextRoundIcon />
        </Button>
      </Grid>
    </Grid>
  );
};

export default GamePage;
