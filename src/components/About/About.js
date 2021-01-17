import React from 'react';
// import CurrentUserContext from '../contexts/currentUserContext';
import avatar_img from '../../images/avatar.jpg';
import './About.css';

const About = () => {
  // const currentUser = React.useContext(CurrentUserContext);

  return (
    <section className='about'>
      <div className='about__container'>
        <img className='about__avatar' src={avatar_img} alt='аватар автора' />
        <div className='about__description-container'>
        <p className='about__title'>Об авторе</p>
        <p className='about__paragraf'>Это блок с описанием автора проекта. Здесь следует указать, как вас зовут, чем вы занимаетесь, какими технологиями разработки владеете.</p>
          <p className='about__paragraf'>Также можно рассказать о процессе обучения в Практикуме, чему вы тут научились, и чем можете помочь потенциальным заказчикам.</p>
        </div>
      </div>
    </section>
  );

};

export default About;