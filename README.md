# 🌆 STRΛTA OVΞRSE — Smart City Dashboard

Este projeto é uma plataforma completa de monitoramento urbano baseada em sensores, integrando **backend Django REST** com um **frontend React moderno**, voltada para escolas e cidades inteligentes.

---

## 📦 Tecnologias

### 🔙 Backend
- Django
- Django REST Framework
- Django Filters
- Simple JWT
- Pandas (exportação de dados)

### 🔜 Frontend
- React
- Axios
- React Router DOM
- Tailwind CSS
- React Icons
- Vite
- Yarn

---

## ⚙️ Pré-requisitos

- Python 3.10+
- Node.js + Yarn
- Git
- (Opcional) Visual Studio Code

---

## 🔧 Instalação do Projeto

### 🔙 Backend (Django)

> Caminho: `integradorPWBE/`

1. **Criar ambiente virtual:**

   python -m venv env


2. **Ativar o ambiente virtual:**
 
     env\Scripts\activate
     ``
3. **Instalar dependências:**
 
   pip install -r requirements.txt
   ```

5. **Usuário admin já criado:**
   ```
   Usuário: lin
   Senha:   123
   ```

6. **Iniciar o servidor:**

   python manage.py runserver
   ```

---

### 🔜 Frontend (React)

> Caminho: cd front

1. **Instalar as dependências:**

   yarn install
   ```

2. **Iniciar o servidor:**

   yarn dev
   ```

---

## 🔗 Endpoints

- **Frontend:** `http://localhost:5173`
- **Backend (API):** `http://127.0.0.1:8000/api/`

---



## 📝 Observações

- Certifique-se de que os arquivos `.xlsx` de histórico estejam na pasta `data/` no backend.
- Se o `node_modules/` do frontend for apagado, basta executar novamente:
  ```bash
  yarn install
  ```

- Caso a `env/` seja excluída no backend, recrie com os passos descritos acima.

---

## 👤 Desenvolvido por

**Maria Eduarda Perez** — Projeto de Integrador
