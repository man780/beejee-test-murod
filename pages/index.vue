<template>
  <div>
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
            <button class="btn btn-success" @click="edit(task)">
              <p>Изменить</p>
            </button>
          </div>
        </td>
      </tr>
    </table>
    {{ pageCount }}
    <Pagination :page-count="pageCount" />
  </div>
</template>
<script>
import Pagination from '../components/Pagination.vue'
export default {
  components: { Pagination },
  data () {
    return {
      sortField: '',
      sortDirection: 'asc',
      pages: []
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
    this.tasks = await this.fetchTasks()
  },
  methods: {
    fetchTasks () {
      this.pages = []
      for (let page = 1; page <= this.pageCount; page++) {
        if (page > this.currentPage - 5 && page < this.currentPage + 5) {
          this.pages.push(page)
        }
      }
      return this.$store.getters['tasks/allTasks']
    },
    edit (task) {
      console.log(task)
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
    },
    goToPage (pageNumber) {
      this.$store.dispatch('tasks/fetch', {
        sortField: this.sortField,
        sortDirection: this.sortDirection,
        page: pageNumber
      })
      this.pages = []
      for (let page = 1; page <= this.pageCount; page++) {
        if (page > pageNumber - 5 && page < pageNumber + 5) {
          this.pages.push(page)
        }
      }
    }
  }
}
</script>
<style scoped>

</style>
