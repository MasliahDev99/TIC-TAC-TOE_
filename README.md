# Proyecto RIA: Ta-Te-Ti Futbolero
![TicTacToe](/ticTacToe.png)

Este es un proyecto de una Aplicación de Internet Rica (RIA) que reinventa el clásico juego del Ta-Te-Ti (Tic-Tac-Toe) con una temática de fútbol. En lugar de simplemente colocar una "X" o una "O", los jugadores deben nombrar a un futbolista que cumpla con las dos categorías que se cruzan en la casilla seleccionada (una de la fila y otra de la columna).



## 🚀 Características Principales

-   **Tablero Dinámico**: Cada vez que se inicia una "Nueva Partida", el juego selecciona 3 categorías de filas y 3 de columnas de forma aleatoria, garantizando que no haya dos partidas iguales.
-   **Base de Datos de Jugadores**: Incluye una base de datos con futbolistas (principalmente uruguayos y de la región) y sus respectivas trayectorias para validar las respuestas.
-   **Temporizador por Turno**: Cada jugador dispone de 45 segundos para realizar su jugada. Si el tiempo se agota, pierde el turno automáticamente, añadiendo un elemento de presión y agilidad.
-   **Interfaz Interactiva**: Utiliza un cuadro de diálogo para que los jugadores ingresen sus respuestas y notificaciones "toast" para dar feedback instantáneo (respuesta correcta, incorrecta, tiempo agotado, etc.).
-   **Funcionalidad de "Saltar Turno"**: Si un jugador no conoce una respuesta o prefiere ceder su turno, puede hacerlo con el botón "Saltar Turno".
-   **Diseño Responsivo**: La interfaz se adapta a diferentes tamaños de pantalla, permitiendo jugar cómodamente tanto en escritorio como en dispositivos móviles.

## 🛠️ Tecnologías Utilizadas

-   **HTML5**: Para la estructura semántica del contenido.
-   **CSS3**: Para todo el diseño visual, las animaciones y la apariencia del juego. Se utilizan variables CSS para un fácil mantenimiento del tema.
-   **JavaScript (ES6+)**: Para toda la lógica del juego, la manipulación del DOM, el manejo de eventos y la gestión del estado.
-   **jQuery**: Utilizado para simplificar la manipulación del DOM y el manejo de eventos.

## 🎮 ¿Cómo Jugar?

1.  **Inicia el Juego**: Abre el archivo `index.html` en tu navegador.
2.  **Nueva Partida**: Haz clic en el botón **"Nueva Partida"**. El tablero se generará con categorías aleatorias.
3.  **Haz tu Jugada**: El jugador 1 (❌) comienza. Haz clic en una casilla vacía del tablero.
4.  **Ingresa un Jugador**: Aparecerá un cuadro de diálogo. Escribe el nombre de un futbolista que creas que cumple con la categoría de la fila Y la categoría de la columna de la casilla que seleccionaste.
5.  **Valida tu Respuesta**:
    -   Si el nombre es **correcto**, la casilla se marcará con tu símbolo (❌ o ⭕) y será el turno del siguiente jugador.
    -   Si es **incorrecto** o el **tiempo se agota**, perderás el turno.
6.  **Gana la Partida**: El primer jugador que logre alinear tres de sus símbolos en una fila, columna o diagonal, ¡gana la partida!
7.  **Empate**: Si todas las casillas se llenan y nadie ha ganado, el juego termina en empate.

## 📂 Estructura del Proyecto

\`\`\`
TicTacToeRia/
├── js/
│   └── app.js          # Contiene toda la lógica, datos y UI del juego
├── public/
│   └── assets/
│       ├── afa.png
│       ├── auf.png
│       ├── laliga.png
│       ├── premier.png
│       ├── seriea.png
│       └── sudamericana.png
├── styles/
│   └── styles.css      # Estilos visuales del juego
├── index.html  # Archivo Principal 
│   
└── README.md           # Este archivo
\`\`\`






## 🔮 Posibles Mejoras a Futuro

-   **Contador de Puntuación**: Añadir un marcador que lleve la cuenta de las victorias de "X" y "O" a lo largo de varias partidas.
-   **Autocompletado de Jugadores**: Mejorar el campo de texto para que sugiera nombres de la base de datos a medida que el usuario escribe.
-   **Efectos de Sonido**: Incorporar sonidos para eventos clave como hacer una jugada, ganar, perder o cuando el tiempo se está acabando.
-   **Modo Oscuro/Claro**: Implementar un interruptor para que el usuario pueda elegir entre diferentes temas visuales.