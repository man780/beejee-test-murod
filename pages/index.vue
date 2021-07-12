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
    <button onclick="document.getElementById('id01').style.display='block'" class="btn btn-success">
      Login
    </button>
    <!-- The Modal -->
    <div id="id01" class="modal">
      <span onclick="document.getElementById('id01').style.display='none'" class="close" title="Close Modal">&times;</span>

      <!-- Modal Content -->
      <form class="modal-content animate">
        <div class="container">
          <h1 class="text-center">
            Log In
          </h1>
          <div class="form-group">
            <label for="auth-username">Username</label>
            <input id="auth-username" type="text" class="form-control">
          </div>
          <div class="form-group">
            <label for="auth-password">Password</label>
            <input id="auth-password" type="password" class="form-control">
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-success">
              Login
            </button>
          </div>
        </div>
      </form>
    </div>

    <div class="row">
      <div class="col">
        <a href="javascript:void(0);" class="btn btn-info" @click="login()">
          Log in
        </a>
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
            <svg
              v-if="task.status==0"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              class="bi bi-journal-x"
              viewBox="0 0 24 24"
              style="color:red"
            >
              <path fill-rule="evenodd" d="M6.146 6.146a.5.5 0 0 1 .708 0L8 7.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 8l1.147 1.146a.5.5 0 0 1-.708.708L8 8.707 6.854 9.854a.5.5 0 0 1-.708-.708L7.293 8 6.146 6.854a.5.5 0 0 1 0-.708z" />
              <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
              <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
            </svg>
            <svg
              v-if="task.status==10"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              class="bi bi-journal-check"
              viewBox="0 0 24 24"
              style="color:green"
            >
              <path fill-rule="evenodd" d="M10.854 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 8.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
              <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
              <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
            </svg>
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
    login () {
      this.$store.dispatch('tasks/login')
    },
    updateText (e) {
      // Что-бы не выходила changing not in mutation
      this.text = e.target.value
    },
    edit () {
      this.$toast.show('Редактирование...').goAway(1000)
      this.$store.dispatch('tasks/editTask', {
        taskId: this.editForm.id,
        text: this.text
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
