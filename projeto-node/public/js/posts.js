document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!token) {
        window.location.href = '/login';
        return;
    }
    
    // Exibir nome do usuário
    if (user) {
        const userElement = document.getElementById('userName');
        if (userElement) {
            userElement.textContent = user.name;
        }
    }
    
    // Logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/';
        });
    }
    
    // Carregar posts
    loadPosts();
    
    // Formulário de criação de posts
    const postForm = document.getElementById('postForm');
    if (postForm) {
        postForm.addEventListener('submit', handleCreatePost);
    }
});

async function loadPosts() {
    try {
        showLoading();
        const token = localStorage.getItem('token');
        const response = await fetch('/api/posts', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (response.ok) {
            const posts = await response.json();
            displayPosts(posts);
        } else if (response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        } else {
            showAlert('Erro ao carregar posts', 'danger');
        }
    } catch (error) {
        showAlert('Erro ao carregar posts', 'danger');
    }
}

function displayPosts(posts) {
    const postsList = document.getElementById('postsList');
    if (!postsList) return;
    
    if (posts.length === 0) {
        postsList.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-inbox fa-3x text-muted mb-3"></i>
                <p class="text-muted">Nenhum post encontrado. Seja o primeiro a postar!</p>
            </div>
        `;
        updatePostsCount(posts);
        return;
    }
    
    postsList.innerHTML = '';
    
    const user = JSON.parse(localStorage.getItem('user'));
    
    posts.forEach(post => {
        const isOwner = user && post.user_id === user.id;
        
        const postElement = document.createElement('div');
        postElement.className = 'post-card fade-in';
        postElement.innerHTML = `
            <div class="d-flex justify-content-between align-items-start mb-3">
                <h5 class="post-title mb-0">${post.title}</h5>
                ${isOwner ? `
                <div class="btn-group">
                    <button class="btn btn-sm btn-outline-primary edit-post" data-id="${post.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger delete-post" data-id="${post.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                ` : ''}
            </div>
            <div class="post-author">
                <i class="fas fa-user me-1"></i>Por: ${post.author}
            </div>
            <p class="post-content">${post.content}</p>
            <div class="post-date">
                <i class="fas fa-calendar me-1"></i>
                Criado em: ${new Date(post.created_at).toLocaleDateString('pt-BR')}
                ${post.created_at !== post.updated_at ? 
                ` • <i class="fas fa-sync-alt me-1"></i>Editado em: ${new Date(post.updated_at).toLocaleDateString('pt-BR')}` : ''}
            </div>
        `;
        
        postsList.appendChild(postElement);
    });
    
    // Adicionar event listeners para editar e excluir
    addPostEventListeners();
    updatePostsCount(posts);
}

function addPostEventListeners() {
    // Botões de editar
    document.querySelectorAll('.edit-post').forEach(button => {
        button.addEventListener('click', function() {
            const postId = this.getAttribute('data-id');
            editPost(postId);
        });
    });
    
    // Botões de excluir
    document.querySelectorAll('.delete-post').forEach(button => {
        button.addEventListener('click', function() {
            const postId = this.getAttribute('data-id');
            deletePost(postId);
        });
    });
}

async function editPost(postId) {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/posts/${postId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (response.ok) {
            const post = await response.json();
            
            // Preencher formulário com dados atuais
            document.getElementById('title').value = post.title;
            document.getElementById('content').value = post.content;
            
            // Alterar formulário para modo edição
            const form = document.getElementById('postForm');
            form.setAttribute('data-edit-mode', 'true');
            form.setAttribute('data-post-id', postId);
            
            // Alterar botão
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.innerHTML = '<i class="fas fa-save me-2"></i>Salvar Edição';
            submitButton.className = 'btn btn-warning';
            
            // Scroll para o formulário
            form.scrollIntoView({ behavior: 'smooth' });
            
            showAlert('Preencha os campos e clique em "Salvar Edição" para atualizar o post', 'info');
        } else {
            showAlert('Erro ao carregar post para edição', 'danger');
        }
    } catch (error) {
        showAlert('Erro ao carregar post para edição', 'danger');
    }
}

async function deletePost(postId) {
    if (!confirm('Tem certeza que deseja excluir este post? Esta ação não pode ser desfeita.')) {
        return;
    }
    
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/posts/${postId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (response.ok) {
            showAlert('Post excluído com sucesso!', 'success');
            loadPosts(); // Recarregar a lista
        } else {
            const data = await response.json();
            showAlert(data.message || 'Erro ao excluir post', 'danger');
        }
    } catch (error) {
        showAlert('Erro ao excluir post', 'danger');
    }
}

async function handleCreatePost(e) {
    e.preventDefault();
    
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const token = localStorage.getItem('token');
    
    const isEditMode = e.target.getAttribute('data-edit-mode') === 'true';
    const postId = e.target.getAttribute('data-post-id');
    
    try {
        let response;
        
        if (isEditMode) {
            // Modo edição
            response = await fetch(`/api/posts/${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ title, content })
            });
        } else {
            // Modo criação
            response = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ title, content })
            });
        }
        
        if (response.ok) {
            const message = isEditMode ? 'Post atualizado com sucesso!' : 'Post criado com sucesso!';
            showAlert(message, 'success');
            
            // Resetar formulário
            resetForm();
            
            // Recarregar posts
            loadPosts();
        } else {
            const data = await response.json();
            showAlert(data.message || 'Erro ao processar post', 'danger');
        }
    } catch (error) {
        showAlert('Erro ao processar post', 'danger');
    }
}

function resetForm() {
    document.getElementById('postForm').reset();
    document.getElementById('postForm').removeAttribute('data-edit-mode');
    document.getElementById('postForm').removeAttribute('data-post-id');
    
    const submitButton = document.querySelector('#postForm button[type="submit"]');
    submitButton.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Publicar Post';
    submitButton.className = 'btn btn-gradient';
}

function updatePostsCount(posts) {
    const postsCount = document.getElementById('postsCount');
    if (postsCount) {
        postsCount.textContent = `${posts.length} ${posts.length === 1 ? 'post' : 'posts'}`;
    }
}

function showLoading() {
    const postsList = document.getElementById('postsList');
    if (postsList) {
        postsList.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-spinner fa-spin fa-2x text-primary mb-3"></i>
                <p>Carregando posts...</p>
            </div>
        `;
    }
}

function showAlert(message, type) {
    // Remover alertas existentes
    const existingAlerts = document.querySelectorAll('.alert');
    existingAlerts.forEach(alert => alert.remove());
    
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.role = 'alert';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    const container = document.querySelector('.container');
    container.insertBefore(alertDiv, container.firstChild);
    
    // Auto-close after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}