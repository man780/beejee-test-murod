<template>
  <div>
    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" href="#" @click="goPrevPage(page)">Previous</a>
        </li>
        <li v-for="page in pageNumbers" :key="page" class="page-item">
          <a class="page-link active" href="#" @click="goToPage(page)">{{ page }}</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#" @click="goNextPage(page)">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  data () {
    return {
      prevPage: null,
      nextPage: null,
      pageNumbers: [],
      pageNumberCount: 0
    }
  },
  computed: {
    currentPage () {
      return this.$store.getters['tasks/getCurrentPage']
    },
    pageCount () {
      // console.log(this.$route.params.pageCount)
      return this.$store.getters['tasks/getPageCount']
    }
  },
  mounted () {
    // console.log(this.$route)
    this.setPages()
  },
  methods: {
    setPages () {
      const currentPage = this.currentPage
      // console.log(this.$route.params)
      // const totalPageCount = this.$route.params.pageCount
      const totalPageCount = 65
      this.prevPage = currentPage > 1 ? (currentPage - 1) : null
      if (!totalPageCount) {
        this.nextpage = currentPage ? (parseInt(currentPage) + 1) : 2
      } else {
        this.nextpage = currentPage < totalPageCount ? (parseInt(currentPage) + 1) : null
      }
      let _p = 0
      for (let i = 0; i < 7; i++) {
        if (currentPage > 4) {
          _p = ((parseInt(currentPage) - 4) + i)
        } else {
          _p++
        }
        if (_p > 0 && _p <= totalPageCount) {
          this.pageNumbers.push(_p)
          // this.pageNumberCount++
        } else {
          this.pageNumbers.push(null)
        }
      }
      // console.log(this.pageNumbers)
    },
    goToPage (pageNumber) {
      this.$store.dispatch('tasks/fetch', {
        sortField: this.sortField,
        sortDirection: this.sortDirection,
        page: pageNumber
      })
      this.tasks = this.$store.getters['tasks/allTasks']
    },
    goPrevPage () {
      this.$store.dispatch('tasks/fetch', {
        sortField: this.sortField,
        sortDirection: this.sortDirection,
        page: this.prevPage
      })
      this.tasks = this.$store.getters['tasks/allTasks']
    },
    goNextPage () {
      this.$store.dispatch('tasks/fetch', {
        sortField: this.sortField,
        sortDirection: this.sortDirection,
        page: this.nextPage
      })
      this.tasks = this.$store.getters['tasks/allTasks']
    }
  }
}
</script>
