// Task Manager App - Clean and Organized Code

class TaskManager {
    constructor() {
        this.tasks = this.loadTasks();
        this.currentFilter = 'all';
        this.init();
    }

    // Initialize the app
    init() {
        this.cacheElements();
        this.attachEventListeners();
        this.renderTasks();
    }

    // Cache DOM elements for better performance
    cacheElements() {
        this.form = document.getElementById('taskForm');
        this.taskList = document.getElementById('taskList');
        this.emptyState = document.getElementById('emptyState');
        this.titleInput = document.getElementById('taskTitle');
        this.descriptionInput = document.getElementById('taskDescription');
        this.statusSelect = document.getElementById('taskStatus');
        this.filterButtons = document.querySelectorAll('.filter-btn');
    }

    // Attach all event listeners
    attachEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', () => this.handleFilter(btn));
        });
    }

    // Handle form submission
    handleSubmit(e) {
        e.preventDefault();

        const task = {
            id: Date.now(),
            title: this.titleInput.value.trim(),
            description: this.descriptionInput.value.trim(),
            status: this.statusSelect.value,
            createdAt: new Date().toISOString()
        };

        this.addTask(task);
        this.form.reset();
        this.titleInput.focus();
    }

    // Add a new task
    addTask(task) {
        this.tasks.unshift(task);
        this.saveTasks();
        this.renderTasks();
        this.showNotification('Task added successfully!');
    }

    // Delete a task
    deleteTask(id) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.tasks = this.tasks.filter(task => task.id !== id);
            this.saveTasks();
            this.renderTasks();
            this.showNotification('Task deleted successfully!');
        }
    }

    // Handle filter button clicks
    handleFilter(button) {
        // Update active state
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Set current filter and re-render
        this.currentFilter = button.dataset.filter;
        this.renderTasks();
    }

    // Get filtered tasks based on current filter
    getFilteredTasks() {
        if (this.currentFilter === 'all') {
            return this.tasks;
        }
        return this.tasks.filter(task => task.status === this.currentFilter);
    }

    // Render all tasks
    renderTasks() {
        const filteredTasks = this.getFilteredTasks();

        if (filteredTasks.length === 0) {
            this.showEmptyState();
            return;
        }

        this.hideEmptyState();
        this.taskList.innerHTML = filteredTasks.map(task => this.createTaskHTML(task)).join('');

        // Attach delete event listeners
        this.attachDeleteListeners();
    }

    // Create HTML for a single task
    createTaskHTML(task) {
        const statusText = task.status.replace('-', ' ');
        
        return `
            <div class="task-item" data-status="${task.status}">
                <div class="task-header">
                    <h3 class="task-title">${this.escapeHtml(task.title)}</h3>
                </div>
                <p class="task-description">${this.escapeHtml(task.description)}</p>
                <div class="task-footer">
                    <span class="task-status ${task.status}">
                        <span class="task-status-dot"></span>
                        ${statusText}
                    </span>
                    <button class="btn btn-danger" data-id="${task.id}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
                        </svg>
                        Delete
                    </button>
                </div>
            </div>
        `;
    }

    // Attach delete button listeners
    attachDeleteListeners() {
        const deleteButtons = document.querySelectorAll('.btn-danger');
        deleteButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                this.deleteTask(id);
            });
        });
    }

    // Show empty state
    showEmptyState() {
        this.taskList.innerHTML = '';
        this.emptyState.classList.add('show');
    }

    // Hide empty state
    hideEmptyState() {
        this.emptyState.classList.remove('show');
    }

    // Escape HTML to prevent XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Save tasks to localStorage
    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    // Load tasks from localStorage
    loadTasks() {
        const tasks = localStorage.getItem('tasks');
        return tasks ? JSON.parse(tasks) : this.getDefaultTasks();
    }

    // Get default tasks for first-time users
    getDefaultTasks() {
        return [
            {
                id: Date.now(),
                title: 'Welcome to Task Manager Pro!',
                description: 'This is a sample task. You can add, filter, and delete tasks. Try adding your own task above!',
                status: 'pending',
                createdAt: new Date().toISOString()
            }
        ];
    }

    // Show notification (simple alert for now, can be enhanced)
    showNotification(message) {
        // You can enhance this with a toast notification library
        console.log(message);
    }
}

const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "auth.html";
}

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "auth.html";
});

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new TaskManager();
});
function showLoader() {
  document.getElementById("loader").style.display = "flex";
}

function hideLoader() {
  document.getElementById("loader").style.display = "none";
}
