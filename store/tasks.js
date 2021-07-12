export default {
  state () {
    return {
      task: {},
      tasks: [],
      pageCount: 1,
      currentPage: 1,
      sortField: '',
      sortDirection: '',
      token: ''
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
        commit('createTask', created.data.message)
        onTaskCreated(created.data.status)
        if (created.data.status !== 'ok') {
          this.$toast.error('Ошибка при добавлении задачи: ' + created.data.message).goAway(5000)
        }
      } catch (error) {
        this.$toast.error('Ошибка... ' + error).goAway(10000)
      }
    },
    async login ({ commit }, { form }) {
      try {
        const formData = new FormData()
        formData.append('username', form.username)
        formData.append('password', form.password)
        const loginData = await this.$axios.post(
          this.$axios.defaults.baseURL + 'login?developer=murod',
          formData,
          {
            headers: {
              accept: 'application/json'
            }
          }
        )
        if (loginData.data.status === 'ok') {
          this.$cookies.set('token', loginData.data.message.token, {
            path: '/',
            maxAge: 60 * 60 * 24
          })
          this.$cookies.set('username', 'admin', {
            path: '/',
            maxAge: 60 * 60 * 24
          })
          this.$toast.success('Вы вошли как murod').goAway(5000)
        } else {
          this.$toast.error('Ошибка авторизации... ' + loginData.data.message).goAway(10000)
        }
      } catch (error) {
        this.$toast.error('Ошибка авторизации... ' + error).goAway(10000)
      }
    },
    logout ({ commit }) {
      this.$cookies.remove('token')
      this.$cookies.remove('username')
    },
    async editTask ({ commit }, { taskId, text }) {
      if (this.$cookies.get('token') === undefined) {
        this.$toast.error('Авторизуйтесь').goAway(10000)
        return
      }
      try {
        const formData = new FormData()
        formData.append('text', text)
        formData.append('status', 10)
        formData.append('token', this.$cookies.get('token'))
        const edited = await this.$axios.post(
          this.$axios.defaults.baseURL + 'edit/' + taskId + '?developer=murod',
          formData,
          {
            headers: {
              accept: 'application/json'
            }
          }
        )
        if (edited.data.status !== 'ok') {
          this.$toast.error('Ошибка при редактирование задачи: ' + edited.data.message.token).goAway(5000)
        } else {
          this.$toast.success('Изминен!').goAway(2000)
        }
      } catch (error) {
        this.$toast.error('Ошибка... ' + error).goAway(10000)
      }
    }
  },

  mutations: {
    setTasksData (state, tasksData) {
      state.tasks = tasksData.message.tasks
      if (tasksData.message.total_task_count % 3 === 0) {
        state.pageCount = tasksData.message.total_task_count / 3
      } else {
        state.pageCount = Math.ceil(tasksData.message.total_task_count / 3)
      }
      // console.log(state.pageCount)
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
