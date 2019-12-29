import {Button, Grid, Paper} from '@material-ui/core';
import React from 'react';
import {useDispatch} from 'react-redux';

import Player from '../../../players/player';
import {ChangeScore} from '../../../players/player.actions';

import './player-score-card.scss';

interface PlayerScoreCardProps {
  player:Player;
}

const PlayerScoreCard:React.FC<PlayerScoreCardProps> = ({player}) => {
  const dispatch = useDispatch();
  const onScoreChange = (amount:number) => dispatch(ChangeScore(player, amount));

  return (
    <Paper className={'player-score-card'}>
      <Grid container spacing={1}>
        <Grid item xs={12} className={'player-info'}>
          <span className={'player-name'}>
            {player.name}
          </span>
        </Grid>

        <Grid item xs={12} className={'score-actions'}>
          <Button
            variant={'outlined'} className={'score-action-btn'} size={'small'}
            onClick={() => onScoreChange(-10)}
          >
            -10
          </Button>
          <Button
            variant={'outlined'} className={'score-action-btn'} size={'small'}
            onClick={() => onScoreChange(-1)}
          >
            -1
          </Button>
          <span className={'cur-score'}>
            {player.score}
          </span>
          <Button
            variant={'outlined'} className={'score-action-btn'} size={'small'}
            onClick={() => onScoreChange(+1)}
          >
            +1
          </Button>
          <Button
            variant={'outlined'} className={'score-action-btn'} size={'small'}
            onClick={() => onScoreChange(+10)}
          >
            +10
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PlayerScoreCard;
