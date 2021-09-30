import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store-redux';
import s from './statisticCards.module.scss';
import coffeImg from '../../assets/coffee.png';

interface IProps {
  idCurrentIssue: number | undefined;
}

const Statistic = ({ idCurrentIssue }: IProps): JSX.Element => {
  const scores = useSelector((state: RootState) => state.allData.scores);

  const scoreForCurrentIssue = scores.map((item) => {
    if (item.issueId === idCurrentIssue) return item.score;
  });

  const res: { [TScore: string]: number } = {};

  scoreForCurrentIssue.forEach((item) => {
    if (item !== undefined) {
      if (res[item] !== undefined) {
        res[item] = res[item] + 1;
      } else res[item] = 1;
    }
  });

  const listRes = () => {
    const cards: JSX.Element[] = [];
    let summVoices = 0;
    for (const key in res) {
      summVoices += res[key];
    }
    for (const key in res) {
      const percent = (res[key] / summVoices) * 100;
      cards.push(
        <div className={s.cardWrapper}>
          <div className={s.playingCard}>
            {key === 'cof' ? <img src={coffeImg} alt='coffee' /> : key}
          </div>
          <div className={s.statisticPercents}>{percent}%</div>
        </div>);
    }
    return cards;
  };

  return <div className={s.statisticCardWrapper}>{listRes()} </div>;
};

export default Statistic;
