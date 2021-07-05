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
          this.$axios.defaults.baseURL + '?developer=admin&sort_field=' + sortField + '&sort_direction=' + sortDirection + '&page=' + page
        )
      )
      commit('setTasksData', tasksData)
      commit('setCurrentPage', page)
    },
    async createTask ({ commit }, { form, onTaskCreated }) {
      try {
        const created = await this.$axios.post(
          this.$axios.defaults.baseURL + 'create?developer=admin',
          form
        )
        commit('createTask', created.message)
        onTaskCreated(created.message)
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
