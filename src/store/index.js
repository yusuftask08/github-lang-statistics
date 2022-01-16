import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    search: [],
    profile: [],
  },
  mutations: {
    setSearchData(state, item) {
      state.search = item
    },
    setProfileData(state, item) {
      state.profile = item
    },
  },
  actions: {
    getData(context, credentials) {
      axios
        .get(`https://api.github.com/search/users?q=${credentials}`) // user aranıyor..
        .then((res) => {
          context.commit('setProfileData', res?.data?.items[0]) // user bilgileri ilgili mutasyona aktarıldı.
          const detailUrl = res?.data?.items[0]?.repos_url;
          axios.get(`${detailUrl}`).then((res) => { // kullanıcının reposunun detayları için istek atıldı.
            const lang = res.data.filter(y => y.language !== null) // repo içerisinde null dönen veriler vardı onları filtreleyerek ayırdım.
            const isLang = lang.map(y => y.language)
            const langScore = isLang.reduce((a, b) => ({ // Kullanılan dili ve toplamını aldım.
              ...a,
              [b]: (a[b] || 0) + 1
            }), {});
            const sortable = Object.entries(langScore) // En çok kullanılan dilden en az kullanılan dile göre sıralandı.
              .sort(([, a], [, b]) => b - a)
              .reduce((r, [k, v]) => ({
                ...r,
                [k]: v
              }), {});
            context.commit('setSearchData', sortable) // ilgili mutasyona aktarıldı ve componente dogru yola çıkıyor.
          })
        }).catch(err => {
          console.log('err :>> ', err);
        })
    }
  },
  getters: {
    getSearchData(state) {
      return state.search;
    },
    getProfileData(state) {
      return state.profile;
    }
  },
})