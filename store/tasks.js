export default {
  state () {
    return {
      task: {},
      tasks: [],
      pageCount: 1,
      currentPage: 1,
      sortField: '',
      sortDirection: ''
    }
  },

  actions: {
    async fetch ({ commit }, { sortField = '', sortDirection = '', page = 1 }) {
      const tasksData = (
        await this.$axios.$get(
          this.$axios.defaults.baseURL + '?developer=murod&sort_field=' + sortField + '&sort_direction=' + sortDirection + '&page=' + page
        )
      )
      commit('setTasksData', tasksData)
      commit('setCurrentPage', page)
    },
    async createTask ({ commit }, { form, onTaskCreated }) {
      try {
        const formData = new FormData()
        formData.append('username', form.username)
        formData.append('email', form.email)
        formData.append('text', form.text)
        const created = await this.$axios.post(
          this.$axios.defaults.baseURL + 'create?developer=murod',
          formData,
          {
            headers: {
              accept: 'application/json'
            }
          }
        )
        // console.log(created)
        commit('createTask', created.data.message)
        onTaskCreated(created.data.status)
      } catch (error) {
        console.error(error)
      }
    },
    async editTask ({ commit }, { task, taskEditForm, onTaskEdited }) {
      try {
        const edited = await this.$axios.post(
          this.$axios.defaults.baseURL + '/api/examination/' + task.id,
          taskEditForm
        )
        console.log(edited)
        onTaskEdited(edited.status)
      } catch (error) {
        console.log(error)
      }
    }
  },

  mutations: {
    setTasksData (state, tasksData) {
      state.tasks = tasksData.message.tasks
      if (tasksData.message.total_task_count % 3 === 0) {
        // state.pageCount = tasksData.message.total_task_count / 3
        this.commit('setPageCount', tasksData.message.total_task_count / 3)
      } else {
        state.pageCount = Math.ceil(tasksData.message.total_task_count / 3)
        // this.commit('setPageCount', Math.ceil(tasksData.message.total_task_count / 3))
      }
    },
    setCurrentPage (state, currentPage) {
      state.currentPage = currentPage
    },
    setPageCount (state, pageCount) {
      state.pageCount = pageCount
    },
    createTask (state, newTask) {
      console.log(newTask)
      state.tasks.unshift(newTask)
    }
  },

  getters: {
    allTasks (state) {
      return state.tasks
    },
    getPageCount (state) {
      return state.pageCount
    },
    getCurrentPage (state) {
      return state.currentPage
    }
  }
}
