# React + AG Grid + Django + RAG-based Application

This project is a **full-stack RAG (Retrieval-Augmented Generation) system** that integrates:

- **Frontend:** React.js with AG Grid for interactive data input and display.
- **Backend:** Django + Django REST Framework + JWTS for APIs.
- **RAG Pipeline:** SentenceTransformers for embeddings + retrieval based on category.
- **Database:** NEON (with vector embeddings stored).
- **Signals:** Django signals for automatically updating embeddings when new data is added.

---

## 🚀 Features

- **React Frontend**
  - AG Grid used to capture:
    - `inputValue`
    - `derivedOptions`
    - `category`
  - Sends this structured data to Django backend.
  - Displays results based on category searches using the RAG pipeline.

- **Django Backend**
  - REST APIs to handle grid data.
  - Stores `inputValue`, `derivedOptions`, `category`, and embedding vectors.
  - Endpoint to trigger retrieval based on category query.
  - Uses signals to update embeddings when new data is saved.

- **RAG Pipeline**
  - Powered by **SentenceTransformers**.
  - Embeds category text into vectors.
  - Retrieves relevant entries based on semantic similarity.

---

## 🛠️ Tech Stack

- **Frontend:** React.js, AG Grid, Axios, Tailwind (optional)
- **Backend:** Django, Django REST Framework
- **AI/ML:** SentenceTransformers, PostgreSQL (pgvector)
- **Database:** NEON (with vector extension)

---


