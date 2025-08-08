import React from 'react';
import Card from '../Card/Card.js';
import styles from './CardContainer.module.css';
import {motion} from 'motion/react';
export default class CardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.gameSounds = this.props.gameSounds;
    this.API_URL = `https://rickandmortyapi.com/api/character/`;
    this.shuffleFetchedValue = this.shuffleFetchedValue.bind(this);
  }

  render() {
    const {error, shuffleCards, setClickedCards, clickedCards, setGameOver} = this.props;

    return (
      <motion.section
        className={styles.cardSection}
        initial={{y: 100, opacity: 0}}
        animate={{y: 0, opacity: 1}}
        transition={{duration: 0.5, ease: 'easeInOut'}}
      >
        {error && <h2 className={styles.errorPara}>Error: {error.message}</h2>}

        {!error && shuffleCards.length <= 0 && (
          <h2 className={styles.loadingHeading}>Loading...</h2>
        )}

        {shuffleCards.map(card => (
          <Card
            shuffleFetchedValue={this.shuffleFetchedValue}
            key={card.id}
            cardID={card.id}
            charImg={card.image}
            charName={card.name}
            setClickedCards={setClickedCards}
            clickedCards={clickedCards}
            setGameOver={setGameOver}
            gameSounds={this.gameSounds}
          />
        ))}
      </motion.section>
    );
  }

  componentDidMount() {
    this.ignore = false;
    fetch(this.API_URL)
      .then(res => res.json())
      .then(result => {
        if (!this.ignore) {
          this.props.setFetchedDataState(result.results, this.shuffleFetchedValue);
        }
      })
      .catch(err => {
        if (!this.ignore) {
          this.props.setErrorState(err);
        }
      });
  }

  componentWillUnmount() {
    this.ignore = true;
  }

  shuffleFetchedValue() {
    const ShufflingArray = this.props.fetchedData;
    for (let i = ShufflingArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [ShufflingArray[i], ShufflingArray[j]] = [ShufflingArray[j], ShufflingArray[i]];
    }

    this.props.setShuffleCardsState(ShufflingArray);
  }
}
