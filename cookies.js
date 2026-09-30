document.addEventListener('DOMContentLoaded', () => {
  // 1. Captura os elementos do banner e os dois botões
  const bannerCookies = document.getElementById('banner-cookies');
  const btnAceitar = document.getElementById('btn-aceitar-cookies');
  const btnRecusar = document.getElementById('btn-recusar-cookies');

  // 2. Função para salvar a decisão do usuário ("sim" ou "nao")
  function salvarResposta(resposta) {
    // Grava no localStorage (garante funcionamento no VS Code)
    try {
      localStorage.setItem('cookiesAceitos', resposta);
    } catch (e) {
      console.warn('LocalStorage indisponível.');
    }

    // Grava no cookie nativo por 365 dias
    try {
      const expira = new Date();
      expira.setTime(expira.getTime() + (365 * 24 * 60 * 60 * 1000));
      document.cookie = `cookiesAceitos=${resposta}; expires=${expira.toUTCString()}; path=/; SameSite=Lax`;
    } catch (e) {
      console.warn('Cookie indisponível localmente.');
    }

    // Oculta o banner de aviso
    bannerCookies.classList.add('oculto');
  }

  // 3. Verifica se o usuário já fez uma escolha anterior
  function verificarConsentimento() {
    const respostaSalva = localStorage.getItem('cookiesAceitos');
    const temCookieSalvo = document.cookie.includes('cookiesAceitos=');

    // Se houver qualquer registro (aceito ou recusado), mantém o banner oculto
    if (respostaSalva || temCookieSalvo) {
      bannerCookies.classList.add('oculto');
    }
  }

  // Executa a verificação ao abrir a página
  verificarConsentimento();

  // Evento do botão "Entendi e Aceito"
  if (btnAceitar) {
    btnAceitar.addEventListener('click', () => {
      salvarResposta('sim');
    });
  }

  // Evento do botão "Recusar"
  if (btnRecusar) {
    btnRecusar.addEventListener('click', () => {
      salvarResposta('nao');
    });
  }
});