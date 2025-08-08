import React from 'react';
import styles from './Card.module.css';

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.gameSounds = this.props.gameSounds;
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    const {charImg, charName, cardID} = this.props;

    return (
      <button
        data-id={cardID}
        data-testid="card"
        onClick={e => this.handleClick(e)}
        className={styles.cards}
      >
        <div className={styles.charImgContainer}>
          <img src={charImg} alt={charName} />
        </div>

        <h2 className={styles.charName}>{charName}</h2>
      </button>
    );
  }

  handleClick(e) {
    const dataID = Number(e.currentTarget.dataset.id);
    if (this.props.clickedCards.includes(dataID)) {
      this.props.setGameOver(true);
    } else {
      this.gameSounds.playCardClickSound();
      this.props.setClickedCards(dataID);
      this.props.shuffleFetchedValue();
    }
  }
}
