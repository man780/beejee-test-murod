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
            <label for="username">Username</label>
            <input id="username" v-model="editForm.username" :disabled="true" type="text" class="form-control">
          </div>
          <div class="form-group col-md-6">
            <label for="email">Email address</label>
            <input id="email" v-model="editForm.email" :disabled="true" type="email" class="form-control">
          </div>
        </div>
        <select v-model="editForm.status" class="form-control form-control-lg">
          <option value="">
            ...
          </option>
          <option v-for="status in statuses" :key="status.id" :value="status.id">
            {{ status.text }}
          </option>
        </select>
        <div class="form-group">
          <label for="text">Text</label>
          <textarea id="text" v-model="editForm.text" class="form-control" placeholder="Enter text" />
        </div>
        <button type="submit" class="btn btn-primary" @click="edit()">
          Edit
        </button>
      </div>
    </div>
    <table class="table">
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
      <tr v-for="task in tasks" :key="task.id">
        <td>{{ task.id }}</td>
        <td>{{ task.username }}</td>
        <td>{{ task.email }}</td>
        <td>{{ task.text }}</td>
        <td>{{ task.status }}</td>
        <td>
          <div class="edit-buttons">
            <button class="btn btn-success" @click="editBtn(task)">
              <p>Изменить</p>
            </button>
          </div>
        </td>
      </tr>
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
      alertData: {
        status: '',
        class: '',
        show: false
      },
      statuses: [
        {
          id: 0, text: 'задача не выполнена'
        },
        {
          id: 1, text: 'задача не выполнена, отредактирована админом'
        },
        {
          id: 10, text: 'задача выполнена'
        },
        {
          id: 11, text: 'задача отредактирована админом и выполнена'
        }
      ],
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
  async mounted () {
    // this.tasks = await this.$store.getters['tasks/allTasks']
  },
  methods: {
    fetchTasks () {
      return this.$store.getters['tasks/allTasks']
    },
    editBtn (task) {
      this.editForm = task
    },
    edit (task) {
      this.$toast.show('Редактирование...').goAway(1000)
      // this.$store.dispatch('tasks/editTask', {
      //   task: task,
      //   form: this.editForm,
      //   onTaskEdited: this.onTaskEdited
      // })
    },
    onTaskEdited (data) {
      if (data === 'ok') {
        this.$toast.success('Изминен!').goAway(2000)
      } else {
        this.$toast.error('Ошибка!').goAway(2000)
      }
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
