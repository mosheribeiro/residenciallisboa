import Vue from 'vue'

export const baseApiUrl = 'http://localhost:8081'
export const userKey = '__residencial_lisboa_user'

export function showError(e) {
    if (e && e.response && e.response.data) {
        Vue.toasted.global.defaultError({ msg: e.response.data })
    } else if (typeof e === 'string') {
        Vue.toasted.global.defaultError({ msg: e })
    } else {
        Vue.toasted.global.defaultError()
    }
}
export function showSuccess(payload) {
    Vue.toasted.global.defaultSuccess(payload)

}

export default { baseApiUrl, showError, userKey }