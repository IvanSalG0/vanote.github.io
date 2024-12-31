let users = [];
let currentUser = null;
let darkMode = false;
let notes = []; // Lista de notas

// Navegación entre secciones
function showRegister() {
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('register-section').style.display = 'block';
}

function showLogin() {
    document.getElementById('register-section').style.display = 'none';
    document.getElementById('auth-section').style.display = 'block';
}

// Autenticación
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        currentUser = user;
        document.getElementById('auth-section').style.display = 'none';
        document.getElementById('note-section').style.display = 'block';
        document.getElementById('welcome-message').innerText = `Bienvenido, ${user.nickname}!`;
    } else {
        alert("Usuario o contraseña incorrectos.");
    }
}

function register() {
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;
    const nickname = document.getElementById('nickname').value;

    if (users.some(u => u.username === username)) {
        alert("El usuario ya existe.");
        return;
    }

    users.push({ username, password, nickname });
    alert("Registro exitoso! Ahora puedes iniciar sesión.");
    showLogin();
}

// Funcionalidades de notas
function createNote() {
    document.getElementById('note-editor').style.display = 'block';
}

function saveNote() {
    const noteInput = document.getElementById('note-input').value.trim();
    const noteDate = document.getElementById('note-date').value;

    if (noteInput) {
        const newNote = {
            id: Date.now(),
            text: noteInput,
            date: noteDate,
        };

        notes.push(newNote);
        document.getElementById('note-input').value = '';
        document.getElementById('note-date').value = '';
        alert("Nota guardada!");

        renderNotes();
    } else {
        alert("Por favor escribe una nota.");
    }
}

function renderNotes() {
    const notesList = document.getElementById('notes-list');
    notesList.innerHTML = ''; // Limpiar lista antes de volver a renderizar

    notes.forEach(note => {
        const noteItem = document.createElement('div');
        noteItem.className = 'note-item';

        noteItem.innerHTML = `
            <p><strong>Nota:</strong> ${note.text}</p>
            <p><strong>Fecha:</strong> ${note.date || "Sin fecha"}</p>
            <button onclick="editNote(${note.id})">Editar</button>
            <button onclick="deleteNote(${note.id})">Eliminar</button>
        `;

        notesList.appendChild(noteItem);
    });
}

function editNote(noteId) {
    const noteToEdit = notes.find(note => note.id === noteId);

    if (noteToEdit) {
        document.getElementById('note-input').value = noteToEdit.text;
        document.getElementById('note-date').value = noteToEdit.date || '';
        deleteNote(noteId); // Eliminamos la nota original para que la versión editada se reemplace
    }
}

function deleteNote(noteId) {
    notes = notes.filter(note => note.id !== noteId);
    renderNotes();
}

// Modo oscuro
function toggleTheme() {
    darkMode = !darkMode;
    document.body.classList.toggle('dark-mode', darkMode);
}