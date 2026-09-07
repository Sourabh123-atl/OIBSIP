// TaskFlow State Management & Interactive DOM Logic
class TaskApp {
  constructor() {
    this.STORAGE_KEY = 'taskflow_tasks_v1';
    this.tasks = this.loadTasks();

    this.taskForm = document.getElementById('task-form');
    this.taskInput = document.getElementById('task-input');
    this.taskPriority = document.getElementById('task-priority');
    this.taskCategory = document.getElementById('task-category');

    this.pendingList = document.getElementById('pending-task-list');
    this.completedList = document.getElementById('completed-task-list');

    this.pendingCountBadge = document.getElementById('pending-count-badge');
    this.completedCountBadge = document.getElementById('completed-count-badge');

    this.pendingEmpty = document.getElementById('pending-empty-state');
    this.completedEmpty = document.getElementById('completed-empty-state');

    this.statTotal = document.getElementById('stat-total');
    this.statRate = document.getElementById('stat-rate');

    this.btnClearAllCompleted = document.getElementById('btn-clear-all-completed');

    this.init();
  }

  loadTasks() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to load tasks from localStorage', e);
    }
    // Default initial seed tasks for first-time visitors
    return [
      {
        id: 'seed-1',
        text: 'Review Oasis Infobyte project specifications and guidelines',
        priority: 'high',
        category: 'Engineering',
        completed: true,
        createdAt: new Date(Date.now() - 3600000 * 24).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
        completedAt: new Date(Date.now() - 3600000 * 12).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })
      },
      {
        id: 'seed-2',
        text: 'Implement responsive CSS Grid architecture for task dashboard',
        priority: 'medium',
        category: 'Design',
        completed: false,
        createdAt: new Date(Date.now() - 3600000 * 4).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
        completedAt: null
      },
      {
        id: 'seed-3',
        text: 'Test cross-browser localStorage persistence and inline edit handlers',
        priority: 'low',
        category: 'Engineering',
        completed: false,
        createdAt: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
        completedAt: null
      }
    ];
  }

  saveTasks() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.tasks));
    } catch (e) {
      console.error('Failed to save tasks', e);
    }
  }

  addTask(text, priority, category) {
    const newTask = {
      id: 'task_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      text: text.trim(),
      priority,
      category,
      completed: false,
      createdAt: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
      completedAt: null
    };

    this.tasks.unshift(newTask);
    this.saveTasks();
    this.render();
  }

  triggerCelebration() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
      osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.1); // E5
      osc.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.2); // G5
      osc.frequency.setValueAtTime(1046.50, audioCtx.currentTime + 0.3); // C6
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.6);
    } catch(e) {}

    // Canvas Confetti
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '99999';
    document.body.appendChild(canvas);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    const colors = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#ec4899', '#38bdf8'];
    const particles = Array.from({ length: 65 }, () => ({
      x: window.innerWidth * (0.4 + Math.random() * 0.2),
      y: window.innerHeight * 0.5,
      vx: (Math.random() - 0.5) * 16,
      vy: -Math.random() * 14 - 4,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 12,
      opacity: 1
    }));

    let frame = 0;
    function anim() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.45; // gravity
        p.rotation += p.vRot;
        p.opacity -= 0.015;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });
      frame++;
      if (frame < 70) {
        requestAnimationFrame(anim);
      } else {
        canvas.remove();
      }
    }
    requestAnimationFrame(anim);
  }

  toggleComplete(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      task.completedAt = task.completed
        ? new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })
        : null;
      if (task.completed) {
        this.triggerCelebration();
      }
      this.saveTasks();
      this.render();
    }
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.saveTasks();
    this.render();
  }

  editTask(id, newText) {
    const task = this.tasks.find(t => t.id === id);
    if (task && newText.trim() !== '') {
      task.text = newText.trim();
      this.saveTasks();
      this.render();
    }
  }

  clearCompleted() {
    if (confirm('Are you sure you want to delete all completed tasks?')) {
      this.tasks = this.tasks.filter(t => !t.completed);
      this.saveTasks();
      this.render();
    }
  }

  renderTaskElement(task) {
    const item = document.createElement('div');
    item.className = `task-item ${task.completed ? 'completed' : ''}`;
    item.id = `task-item-${task.id}`;

    item.innerHTML = `
      <div class="task-item-main">
        <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} aria-label="Mark task complete">
        <div class="task-text" id="task-text-${task.id}">${this.escapeHtml(task.text)}</div>
        <div class="task-item-actions">
          <button class="btn-icon btn-edit" title="Edit task" aria-label="Edit task">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          </button>
          <button class="btn-icon delete btn-delete" title="Delete task" aria-label="Delete task">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
          </button>
        </div>
      </div>
      <div class="task-meta">
        <div class="task-tags-group">
          <span class="tag-badge tag-priority-${task.priority}">${task.priority.toUpperCase()}</span>
          <span class="tag-badge tag-category">${task.category}</span>
        </div>
        <span class="task-time">${task.completed ? `✓ Completed: ${task.completedAt}` : `⏱ Added: ${task.createdAt}`}</span>
      </div>
    `;

    // Toggle complete
    const checkbox = item.querySelector('.task-checkbox');
    checkbox.addEventListener('change', () => this.toggleComplete(task.id));

    // Delete
    const btnDelete = item.querySelector('.btn-delete');
    btnDelete.addEventListener('click', () => this.deleteTask(task.id));

    // Inline Edit
    const btnEdit = item.querySelector('.btn-edit');
    const textElem = item.querySelector(`#task-text-${task.id}`);

    btnEdit.addEventListener('click', () => {
      if (item.classList.contains('editing')) return;
      item.classList.add('editing');

      const currentText = task.text;
      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'inline-edit-input';
      input.value = currentText;

      textElem.replaceWith(input);
      input.focus();

      const save = () => {
        const updated = input.value.trim();
        this.editTask(task.id, updated || currentText);
      };

      input.addEventListener('blur', save);
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          input.blur();
        } else if (e.key === 'Escape') {
          input.value = currentText;
          input.blur();
        }
      });
    });

    return item;
  }

  escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  render() {
    const pendingTasks = this.tasks.filter(t => !t.completed);
    const completedTasks = this.tasks.filter(t => t.completed);

    // Update Badges
    this.pendingCountBadge.textContent = `${pendingTasks.length} pending`;
    this.completedCountBadge.textContent = `${completedTasks.length} completed`;

    // Update Header Global Stats
    const total = this.tasks.length;
    this.statTotal.textContent = total;
    const rate = total > 0 ? Math.round((completedTasks.length / total) * 100) : 0;
    this.statRate.textContent = `${rate}%`;

    // Render Pending
    this.pendingList.innerHTML = '';
    if (pendingTasks.length === 0) {
      this.pendingEmpty.classList.add('visible');
    } else {
      this.pendingEmpty.classList.remove('visible');
      pendingTasks.forEach(task => {
        this.pendingList.appendChild(this.renderTaskElement(task));
      });
    }

    // Render Completed
    this.completedList.innerHTML = '';
    if (completedTasks.length === 0) {
      this.completedEmpty.classList.add('visible');
    } else {
      this.completedEmpty.classList.remove('visible');
      completedTasks.forEach(task => {
        this.completedList.appendChild(this.renderTaskElement(task));
      });
    }
  }

  init() {
    this.taskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = this.taskInput.value.trim();
      if (!text) return;

      const priority = this.taskPriority.value;
      const category = this.taskCategory.value;

      this.addTask(text, priority, category);
      this.taskInput.value = '';
      this.taskInput.focus();
    });

    if (this.btnClearAllCompleted) {
      this.btnClearAllCompleted.addEventListener('click', () => this.clearCompleted());
    }

    this.render();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.taskApp = new TaskApp();
});
