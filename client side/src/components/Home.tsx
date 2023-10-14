import React, { FunctionComponent, useEffect, useState } from 'react';
import Card from '../interfaces/Card';
import { getCard, deleteCard } from '../services/CardService';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { getFav, addRemoveFavorites } from '../services/favoriteService';
import { successMsg } from '../services/feedbackServicw';

interface HomeProps {
  userInfo: any;
  cards: Card[];
}

const Home: FunctionComponent<HomeProps> = ({ userInfo, cards }) => {
  const [cardsList, setCardsList] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [favoriteCards, setFavoriteCards] = useState<string[]>([]);
  let [dataChanged, setDataChanged] = useState<boolean>(false);
  let navigate = useNavigate();



  useEffect(() => {
    if (userInfo.userId) {
      getFav(userInfo.userId)
        .then((res) => {
          let defaultCardIds: string[] = res.data?.cards.map((card: any) => card._id) || [];
          setFavoriteCards(defaultCardIds);
        })
        .catch((err) => console.log(err));
    }
    getCard().then((res) => setCardsList(res.data)).catch((err) => console.log(err));


  }, []);

  let handleaddToFav = (card: Card) => {
    if (favoriteCards.includes(card._id as string)) {
      addRemoveFavorites(card._id as string)
        .then((res) => {

          setFavoriteCards(favoriteCards.filter((id) => id !== card._id));


          successMsg(`${card.title}  card was removed  favorites!`);
        })
        .catch((err) => { console.log(err); });
    } else {
      addRemoveFavorites(card._id as string)
        .then((res) => {


          setFavoriteCards([...favoriteCards, card._id as string]);

          successMsg(`${card.title}  card was added to favorites!`);

        })
        .catch((err) => { console.log(err); });
    }
  };
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure?')) {
      deleteCard(id)
        .then((res) => {
          setCardsList(cardsList.filter((card) => card._id !== id));
          successMsg('Card deleted successfully!');
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      <h1>BCards</h1>
      <h3>Welcome to My business Cards</h3>
      <div className='d-flex justify-content-left' id='add-card'>
        {userInfo.role === 'business' || userInfo.role === 'admin' ? (
          <Link to="/AddCard" className="btn btn-primary my-2" >
            <i className="fa-regular fa-plus"> Add New Card</i>
          </Link>
        ) : null}
      </div>

      {cardsList.length ? (
        <div className="container-fluid mb-2">
          <div className="row d-flex justify-content-center">
            {cardsList.map((card: Card) => (
              <div
                key={card._id}
                className="card col-md-4 mx-2 mb-3"
                style={{
                  width: '18rem',
                  boxShadow: '0px 4px 12px rgba(255, 255, 255, 0.5)',
                  borderRadius: '8px',
                  padding: '16px',
                }}
              >
                <Link to={`/CardShow/${card._id}`}>
                  <img
                    src={card.image}
                    className="card-img-top"
                    alt={card.title}
                    style={{ width: '100%', height: '16.5rem' }}
                  />
                </Link>

                <hr />

                <div className="card-body">
                  <h5 className="card-title">{card.title}</h5>
                  <hr />
                  <p className="card-text "> {card.sutitle}</p>
                  <hr />
                  <p className="card-text text-success">Phone: {card.phone}</p>
                  <hr />
                  <p className="card-text">
                    Address: {card.country} {card.city} {card.street} {card.Hosenumber}
                  </p>
                  <hr />
                  {userInfo.role === 'admin' || (userInfo.role === 'business' && userInfo.email === card.owner) ? (
                    <>
                      <p className="card-text">Card Number: {card.zip}</p>
                      <Link to={`/update/Card/${card._id}`} className="btn btn-warning mx-1">
                        <i className="fa-solid fa-pen-to-square"></i>
                      </Link>
                      <Link
                        to=""
                        className="btn btn-danger"
                        onClick={() => handleDelete(card._id as string)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </Link>
                    </>
                  ) : null}

                  {(userInfo.role === 'regular' || userInfo.role === 'admin' || userInfo.role === 'business') && !favoriteCards.includes(card._id as string) && !isLoading && (

                    <button
                      className="btn btn-primary mx-1"
                      onClick={() => handleaddToFav(card)}
                      disabled={isLoading}
                    >
                      <i className="far fa-heart"></i>
                      <span className="sr-only">Add to Favorites</span>
                    </button>
                  )}

                  {favoriteCards.includes(card._id as string) && !isLoading && (
                    <button
                      className="btn btn-danger mx-1"
                      onClick={() => handleaddToFav(card)}
                    >
                      <i className="far fa-heart"></i>
                      <span className="sr-only">Remove from Favorites</span>
                    </button>
                  )}

                  <button className="btn btn-success">
                    <a href={`tel:${card.phone}`} style={{ color: 'white', textDecoration: 'none' }}>
                      <i className="fa-solid fa-phone"></i>
                    </a>
                  </button>

                </div>

              </div>
            ))}

          </div>
        </div>

      ) : (
        <p>No cards</p>
      )}

    </>
  );
};

export default Home;
