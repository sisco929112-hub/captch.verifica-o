const REDIRECT_URL = "https://www.jornaldeangola.ao/";
const VERIFY_DELAY_MS = 1100;
const REDIRECT_DELAY_MS = 900;

const captchaBox = document.getElementById("captchaBox");
const captchaCheck = document.getElementById("captchaCheck");
const captchaLabel = document.getElementById("captchaLabel");
const verifyBtn = document.getElementById("verifyBtn");
const statusText = document.getElementById("statusText");
const sessionIdEl = document.getElementById("sessionId");
const fallbackLink = document.getElementById("fallbackLink");

let isProcessing = false;

function generateSessionId() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let id = "";
  for (let i = 0; i < 10; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return `VER-${id}`;
}

function startVerification() {
  if (isProcessing) return;
  isProcessing = true;

  captchaCheck.disabled = true;
  verifyBtn.disabled = true;
  captchaBox.classList.add("is-verifying");
  captchaLabel.textContent = "Verificando...";
  verifyBtn.textContent = "Verificando...";
  statusText.textContent = "Validando sua sessão de segurança...";
  statusText.classList.remove("is-success");

  setTimeout(() => {
    captchaBox.classList.remove("is-verifying");
    captchaBox.classList.add("is-verified");
    captchaCheck.setAttribute("aria-pressed", "true");
    captchaLabel.textContent = "Verificado com sucesso";

    verifyBtn.classList.add("is-done");
    verifyBtn.textContent = "Redirecionando...";
    statusText.textContent = "Verificação concluída! Redirecionando...";
    statusText.classList.add("is-success");
    fallbackLink.href = REDIRECT_URL;
    fallbackLink.hidden = false;

    setTimeout(() => {
      try {
        if (window.top && window.top !== window.self) {
          window.top.location.href = REDIRECT_URL;
        } else {
          window.location.href = REDIRECT_URL;
        }
      } catch {
        window.location.href = REDIRECT_URL;
      }
    }, REDIRECT_DELAY_MS);
  }, VERIFY_DELAY_MS);
}

sessionIdEl.textContent = generateSessionId();

captchaBox.addEventListener("click", startVerification);
verifyBtn.addEventListener("click", startVerification);
