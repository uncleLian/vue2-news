/**
 * Created by yzj on 2017/7/19.
 */
// import { get_local_cache, set_local_cache } from '@/config/cache'
import { getGeolocation, baidumap_location, device_uuid, updateInstalled, updateLoadFailed } from '@/config/cordova_list'
export default {
  namespaced: true,
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    // ios 定位
    cordova_getGeolocation() {
      let latitude = getGeolocation()
      return latitude
    },
    // android 定位
    cordova_baidumap_location() {
      let latitude = baidumap_location()
      return latitude
    },
    // 设备ID
    cordova_device_uuid() {
      let deviceUuid = device_uuid()
      return deviceUuid
    },

    // 热更新
    cordova_updateInstalled() {
      updateInstalled()
    },

    // 版本更新
    cordova_updateLoadFailed() {
      let error
      error = updateLoadFailed()
      return error
    }
  }
}
