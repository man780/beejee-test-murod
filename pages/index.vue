<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 card">
        <h1>Create</h1>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="username">Username</label>
            <input id="username" v-model="form.username" type="text" class="form-control" placeholder="Enter username">
          </div>
          <div class="form-group col-md-6">
            <label for="email">Email address</label>
            <input id="email" v-model="form.email" type="email" class="form-control" placeholder="Enter email">
          </div>
        </div>
        <div class="form-group">
          <label for="text">Text</label>
          <textarea id="text" v-model="form.text" class="form-control" placeholder="Enter text" />
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
      alertData: {
        status: '',
        class: '',
        show: false
      },
      form: {
        username: '',
        email: '',
        text: ''
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
      // Что-бы не выходила changingnot in mutation
      this.text = e.target.value
    },
    edit () {
      this.$toast.show('Редактирование...').goAway(1000)
      this.$store.dispatch('tasks/editTask', {
        taskId: this.editForm.id,
        text: this.text
      })
    },
    create () {
      this.$toast.show('Добавление...').goAway(1000)
      this.$store.dispatch('tasks/createTask', {
        form: this.form,
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

</style>
