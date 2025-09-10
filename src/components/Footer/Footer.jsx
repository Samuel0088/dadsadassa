import React from 'react'
import styles from './Footer.module.css'
import logoMobiliza from '../../assets/Imagens/Logo.png'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* Primeira seção */}
      <div className={`${styles.container} ${styles.sides}`}>
        <div className={styles.leftSide}>
          <div className={styles.logo}>
            <img 
              src={logoMobiliza} 
              style={{ height: "70px", width: "auto" }} 
              alt="Logo Mobiliza Vida" 
            />
            <div style={{ color: "#2c2c2c" }}>Mobiliza Vida</div>
          </div>

          <p className={styles.p}>
            <a className={styles.linkFooter} href="../linhaEMTU/linhaEMTU.html">EMTU</a>
            <a className={styles.linkFooter} href="../linhaSOU/linhaSOU.html">SOU</a>
            <a className={styles.linkFooter} href="">Status</a>
            <a className={styles.linkFooter} href="">Cartões</a>
          </p>
        </div>

        <div className={styles.rightSide}>
          <ul className={styles.menu}>
            <li><a href="#">Companhia</a></li> 
            <li><a href="#">Ajuda</a></li> 
            <li><a href="#">Suporte</a></li> 
            <li><a href="#">Serviços</a></li>
            <li><a href="#">Política&nbsp;de&nbsp;Privacidade</a></li>
          </ul>
        </div>
      </div>

      {/* Segunda seção (copyright) */}
      <div className={styles.container}>
        <div className={styles.rightSide}>
          <p>&copy; Mobiliza Vida copyright 2025. Todos os direitos reservados</p>
        </div>
        <div className={`${styles.rightSide} ${styles.center}`}>
          <p>Termos e Condições</p>
        </div>
      </div>
    </footer>
  )
}

export { Footer }