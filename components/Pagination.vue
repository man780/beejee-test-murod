<template>
  <div>
    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" href="javascript:void(0);" @click="goPrevPage()">Previous</a>
        </li>
        <li v-for="page in pageNumbers" :key="page" :class="{ active: (currentPage == page) }" class="page-item">
          <a class="page-link active" href="javascript:void(0);" @click="goToPage(page)">{{ page }}</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="javascript:void(0);" @click="goNextPage()">Next</a>
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
      return this.$store.getters['tasks/getPageCount']
    }
  },
  mounted () {
    this.setPages(1)
  },
  methods: {
    setPages (choosedPage = 1) {
      const totalPageCount = this.pageCount
      const maxLoopInt = (totalPageCount > 19) ? 19 : totalPageCount
      let _p = 0
      this.pageNumbers = []
      for (let i = 0; i < maxLoopInt; i++) {
        if (choosedPage > 9) {
          _p = (choosedPage - 9) + i
        } else {
          _p++
        }
        if (_p > 0 && _p <= totalPageCount) {
          this.pageNumbers.push(_p)
        } else {
          this.pageNumbers.push(null)
        }
      }
    },
    fetchTasks (pageNumber) {
      this.$store.dispatch('tasks/fetch', {
        sortField: this.sortField,
        sortDirection: this.sortDirection,
        page: pageNumber
      })
      this.tasks = this.$store.getters['tasks/allTasks']
    },
    goToPage (pageNumber) {
      this.fetchTasks(pageNumber)
      this.setPages(pageNumber)
    },
    goPrevPage () {
      this.prevPage = this.currentPage > 1 ? (this.currentPage - 1) : null
      this.fetchTasks(this.prevPage)
      this.setPages(this.prevPage)
    },
    goNextPage () {
      const currentPage = this.currentPage
      const totalPageCount = this.pageCount
      if (!totalPageCount) {
        this.nextPage = currentPage ? (parseInt(currentPage) + 1) : 2
      } else {
        this.nextPage = currentPage < totalPageCount ? (parseInt(currentPage) + 1) : null
      }
      this.fetchTasks(this.nextPage)
      this.setPages(this.nextPage)
    }
  }
}
</script>
