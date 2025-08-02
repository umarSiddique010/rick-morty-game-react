import React from 'react';
import Styles from './Card.module.css';
import GameSounds from '../../GameSounds';
export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.gameSounds = new GameSounds();
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    const { charImg, charName, cardID } = this.props;

    return (
      <button
        data-id={cardID}
        onClick={(e) => this.handleClick(e)}
        className={Styles.cards}
      >
        <div className={Styles.char_img_container}>
          <img src={charImg} alt={charName} />
        </div>

        <h2 className={Styles.char_name}>{charName}</h2>
      </button>
    );
  }

  handleClick(e) {
    this.props.shuffleFetchedValue();
    const dataID = Number(e.currentTarget.dataset.id);
    this.gameSounds.playCardClickSound();
    if (this.props.clickedCards.includes(dataID)) {
      this.props.setGameOver(true);
    } else {
      this.props.setClickedCards(dataID);
    }
  }
}
