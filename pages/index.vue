<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 card">
        <h1>Create</h1>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="username">Username</label>
            <input
              id="username"
              v-model="form.username.text"
              type="text"
              class="form-control"
              placeholder="Enter username"
              :class="form.username.isInvalid ? 'is-invalid' : ''"
            >
          </div>
          <div class="form-group col-md-6">
            <label for="email">Email address</label>
            <input
              id="email"
              v-model="form.email.text"
              type="email"
              class="form-control"
              placeholder="Enter email"
              :class="form.email.isInvalid ? 'is-invalid' : ''"
            >
          </div>
        </div>
        <div class="form-group">
          <label for="text">Text</label>
          <textarea id="text" v-model="form.text.text" class="form-control" placeholder="Enter text" :class="form.text.isInvalid ? 'is-invalid' : ''" />
        </div>
        <button type="submit" class="btn btn-primary" @click="create()">
          Create
        </button>
      </div>
      <div class="col-md-6 card">
        <h1>Edit</h1>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="edit-username">Username</label>
            <input id="edit-username" v-model="editForm.username" :disabled="true" type="text" class="form-control">
          </div>
          <div class="form-group col-md-6">
            <label for="edit-email">Email address</label>
            <input id="edit-email" v-model="editForm.email" :disabled="true" type="email" class="form-control">
          </div>
        </div>
        <div class="form-group">
          <label for="text">Text</label>
          <textarea id="text" :value="editForm.text" class="form-control" placeholder="Enter text" @input="updateText" />
        </div>
        <button type="submit" class="btn btn-success" @click="edit()">
          Edit
        </button>
      </div>
    </div>
    <hr>
    <!-- Button to open the modal login form -->
    <div class="row">
      <div class="col">
        <button v-show="!$cookies.get('username') && !isLoggedIn" onclick="document.getElementById('id01').style.display='block'" class="btn btn-success">
          Log In
        </button>
        <button v-show="$cookies.get('username') && isLoggedIn" class="btn btn-danger" @click="logout()">
          ({{ $cookies.get('username') }}) Log Out
        </button>
      </div>
    </div>
    <!-- The Modal -->
    <div id="id01" class="modal">
      <span onclick="document.getElementById('id01').style.display='none'" class="close" title="Close Modal">&times;</span>

      <!-- Modal Content -->
      <div class="modal-content animate">
        <div class="container">
          <h1 class="text-center">
            Log In
          </h1>
          <div class="form-group">
            <label for="auth-username">Username</label>
            <input id="auth-username" v-model="auth.username.text" type="text" class="form-control" :class="auth.username.isInvalid ? 'is-invalid' : ''">
          </div>
          <div class="form-group">
            <label for="auth-password">Password</label>
            <input id="auth-password" v-model="auth.password.text" type="password" class="form-control" :class="auth.password.isInvalid ? 'is-invalid' : ''">
          </div>
          <div class="form-group">
            <button class="btn btn-success" @click="login()">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>

    <hr>
    <table class="table">
      <thead>
        <tr>
          <th>Id</th>
          <th>
            <a href="javascript:void(0);" @click="sort('username')">
              Username
            </a>
          </th>
          <th>
            <a href="javascript:void(0);" @click="sort('email')">
              Email
            </a>
          </th>
          <th>Text</th>
          <th>
            <a href="javascript:void(0);" @click="sort('status')">
              Status
            </a>
          </th>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks" :key="task.id">
          <td>{{ task.id }}</td>
          <td>{{ task.username }}</td>
          <td>{{ task.email }}</td>
          <td>{{ task.text }}</td>
          <td>
            <b-button
              v-b-tooltip.hover
              title="Выполнить"
              :class="statusClasses[task.status]"
              class="btn"
              href="javascript:void(0)"
              @click="setStatusDone(task)"
            >
              {{ statuses[task.status] }}
            </b-button>
          </td>
          <td>
            <div class="edit-buttons">
              <button class="btn btn-success" @click="editBtn(task)">
                <p>Изменить</p>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :page-count="pageCount" />
  </div>
</template>
<script>
import Pagination from '@/components/Pagination.vue'
export default {
  components: { Pagination },
  data () {
    return {
      text: '',
      isLoggedIn: this.$cookies.get('username'),
      statuses: {
        0: 'задача не выполнена',
        1: 'задача не выполнена, отредактирована админом',
        10: 'задача выполнена',
        11: 'задача отредактирована админом и выполнена'
      },
      statusClasses: {
        0: 'btn-danger',
        1: 'btn-warning',
        10: 'btn-info',
        11: 'btn-primary'
      },
      form: {
        username: {
          text: '',
          isInvalid: false
        },
        email: {
          text: '',
          isInvalid: false
        },
        text: {
          text: '',
          isInvalid: false
        }
      },
      auth: {
        username: {
          text: '',
          isInvalid: false
        },
        password: {
          text: '',
          isInvalid: false
        }
      },
      editForm: {
        username: '',
        email: '',
        text: '',
        status: 0
      },
      sortField: '',
      sortDirection: 'asc',
      pages: []
    }
  },
  async fetch ({ store }) {
    if (store.getters['tasks/allTasks'].length === 0) {
      await store.dispatch('tasks/fetch', {
        sortField: '',
        sortDirection: ''
      })
    }
  },
  computed: {
    tasks () {
      return this.$store.getters['tasks/allTasks']
    },
    currentPage () {
      return this.$store.getters['tasks/getCurrentPage']
    },
    pageCount () {
      return this.$store.getters['tasks/getPageCount']
    }
  },
  methods: {
    fetchTasks () {
      return this.$store.getters['tasks/allTasks']
    },
    editBtn (task) {
      this.editForm = task
    },
    logout () {
      this.$store.dispatch('tasks/logout')
      this.isLoggedIn = false
    },
    validateLoginForm () {
      if (this.auth.username.text.trim() !== 'admin') {
        this.$toast.error('Ошибка: Не верный логин!').goAway(2000)
        this.auth.username.isInvalid = true
        return false
      }
      if (this.auth.password.text.trim() !== '123') {
        this.$toast.error('Ошибка: Не верный пароль!').goAway(2000)
        this.auth.password.isInvalid = true
        return false
      }
      return true
    },
    login () {
      if (!this.validateLoginForm()) {
        document.getElementById('id01').style.display = 'block'
        return false
      }
      this.$store.dispatch('tasks/login', {
        form: {
          username: this.auth.username.text,
          password: this.auth.password.text
        }
      })
      this.isLoggedIn = true
      document.getElementById('id01').style.display = 'none'
    },
    updateText (e) {
      // Что-бы не выходила changing not in mutation
      this.text = e.target.value
    },
    edit () {
      this.$toast.show('Редактирование...').goAway(1000)
      this.$store.dispatch('tasks/editTask', {
        taskId: this.editForm.id,
        text: this.text,
        status: this.editForm.status,
        editing: true
      })
    },
    setStatusDone (task) {
      if (task.status >= 10) {
        this.$toast.error('Задача уже выполнена!').goAway(1000)
        return false
      }
      this.$toast.show('Выполнение...').goAway(1000)
      this.$store.dispatch('tasks/editTask', {
        taskId: task.id,
        status: task.status,
        editing: false
      })
    },
    validate (formData) {
      if (formData.username.text.trim() === '') {
        this.form.username.isInvalid = true
        return false
      }
      if (formData.email.text.trim() === '') {
        this.form.email.isInvalid = true
        return false
      }
      if (formData.text.text.trim() === '') {
        this.form.text.isInvalid = true
        return false
      }
      this.form.username.isInvalid = false
      this.form.email.isInvalid = false
      this.form.text.isInvalid = false
      return true
    },
    create () {
      this.$toast.show('Добавление...').goAway(1000)
      if (!this.validate(this.form)) {
        this.$toast.error('Ошибка: Заполните все поля!').goAway(2000)
        return false
      }
      this.$store.dispatch('tasks/createTask', {
        form: {
          username: this.form.username.text,
          email: this.form.email.text,
          text: this.form.text.text
        },
        onTaskCreated: this.onTaskCreated
      })
    },
    onTaskCreated (data) {
      if (data === 'ok') {
        this.$toast.success('Добавлен!').goAway(2000)
      } else {
        this.$toast.error('Ошибка!').goAway(2000)
      }
    },
    sort (by = '') {
      if (this.sortDirection === 'asc') {
        this.sortDirection = 'desc'
      } else {
        this.sortDirection = 'asc'
      }
      this.$store.dispatch('tasks/fetch', {
        sortField: by,
        sortDirection: this.sortDirection
      })
      this.tasks = this.$store.getters['tasks/allTasks']
    }
  }
}
</script>
<style scoped>
/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  padding-top: 60px;
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 5px auto; /* 15% from the top and centered */
  border: 1px solid #888;
  width: 50%; /* Could be more or less, depending on screen size */
}

/* The Close Button */
.close {
  /* Position it in the top right corner outside of the modal */
  position: absolute;
  right: 25px;
  top: 0;
  color: #000;
  font-size: 35px;
  font-weight: bold;
}

/* Close button on hover */
.close:hover,
.close:focus {
  color: red;
  cursor: pointer;
}

/* Add Zoom Animation */
.animate {
  -webkit-animation: animatezoom 0.6s;
  animation: animatezoom 0.6s
}

@-webkit-keyframes animatezoom {
  from {-webkit-transform: scale(0)}
  to {-webkit-transform: scale(1)}
}

@keyframes animatezoom {
  from {transform: scale(0)}
  to {transform: scale(1)}
}
</style>
