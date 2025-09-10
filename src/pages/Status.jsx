import { useState, useEffect } from 'react';
import styles from './Status.module.css';
import CabecalhoSou from '../components/CabecalhoSou/CabecalhoSou.jsx';
import { Footer } from '../components/Footer/Footer.jsx';
import { styleFooter } from '../components/Footer/Footer.module.css';

export default function RatingApp() {
  const [reviews, setReviews] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 0,
    message: ''
  });

  useEffect(() => {
    const savedReviews = JSON.parse(localStorage.getItem('avaliacoes')) || [];
    setReviews(savedReviews);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.rating) {
      showToast('Por favor, selecione uma classificação com estrelas', 'error');
      return;
    }
    
    const newReview = {
      id: Date.now(),
      ...formData,
      date: new Date().toLocaleDateString('pt-BR')
    };
    
    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem('avaliacoes', JSON.stringify(updatedReviews));
    
    setFormData({
      name: '',
      email: '',
      rating: 0,
      message: ''
    });
    
    showToast('Avaliação enviada com sucesso!', 'success');
  };

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 3000);
  };

  const ReviewCard = ({ review, delay }) => {
    const initials = review.name.split(' ').map(n => n[0]).join('').toUpperCase();
    
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className={`fas fa-star ${i <= review.rating ? styles.filled : ''}`}
        ></i>
      );
    }

    return (
      <div 
        className={styles.avaliacaoCard}
        style={{ animationDelay: `${delay * 0.1}s` }}
      >
        <div className={styles.avaliacaoHeader}>
          <div className={styles.avaliacaoAvatar}>{initials}</div>
          <div className={styles.avaliacaoInfo}>
            <h4>{review.name}</h4>
            <p>{review.date}</p>
          </div>
        </div>
        <div className={styles.avaliacaoRating}>
          {stars}
        </div>
        <div className={styles.avaliacaoTexto}>
          <p>{review.message}</p>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.app}>
      {/* Header */}
      <>
      <CabecalhoSou />
    
    </>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1>Deixe sua Avaliação</h1>
            <p>Sua opinião é muito importante para nós. Compartilhe sua experiência e ajude-nos a melhorar!</p>
          </div>
        </div>
      </section>
      
      {/* Avaliação Form */}
      <section className={styles.avaliacao}>
        <div className={styles.container}>
          <div className={styles.sectionTitle}>
            <h2>Avalie Nossos Serviços</h2>
            <p>Conte-nos o que você achou da sua experiência conosco</p>
          </div>
          <div className={styles.avaliacaoForm}>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Seu Nome</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={styles.formControl}
                  placeholder="Digite seu nome completo"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Seu E-mail</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={styles.formControl}
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Sua Avaliação</label>
                <div className={styles.ratingContainer}>
                  <div className={styles.stars}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <label key={star} className={styles.starLabel}>
                        <input
                          type="radio"
                          name="rating"
                          value={star}
                          checked={formData.rating === star}
                          onChange={() => handleRatingChange(star)}
                          className={styles.starInput}
                        />
                        <span className={`${styles.star} ${formData.rating >= star ? styles.filled : ''}`}>
                          ★
                        </span>
                      </label>
                    ))}
                  </div>
                  <div className={styles.ratingText}>
                    {formData.rating > 0 ? `${formData.rating} estrela${formData.rating > 1 ? 's' : ''}` : 'Selecione uma avaliação'}
                  </div>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="message">Seu Comentário</label>
                <textarea
                  id="message"
                  name="message"
                  className={styles.formControl}
                  placeholder="Compartilhe detalhes sobre sua experiência..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>
                Enviar Avaliação
              </button>
            </form>
          </div>
        </div>
      </section>
      
      {/* Avaliações */}
      <section className={styles.avaliacoes}>
        <div className={styles.container}>
          <div className={styles.sectionTitle}>
            <h2>Avaliações Recentes</h2>
            <p>Veja o que outros clientes estão dizendo sobre nós</p>
          </div>
          <div className={styles.avaliacoesGrid}>
            {reviews.length === 0 ? (
              <div className={styles.emptyState}>
                <i className="fas fa-comment-slash"></i>
                <p>Nenhuma avaliação ainda. Seja o primeiro a avaliar!</p>
              </div>
            ) : (
              reviews.map((review, index) => (
                <ReviewCard key={review.id} review={review} delay={index} />
              ))
            )}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer className={styles.styleFooter} />
    
      {/* Toast Notification */}
      {toast.show && (
        <div className={`${styles.toast} ${styles[toast.type]} ${styles.show}`}>
          <i className={toast.type === 'error' ? 'fas fa-exclamation-circle' : 'fas fa-check-circle'}></i>
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}