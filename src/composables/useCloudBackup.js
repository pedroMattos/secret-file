import { ref, computed, watch } from 'vue'
import { useStore } from "vuex";
import * as cloud from '@/models/services/cloud'
import * as local from '@/models/services/localFile'
import * as user from '@/models/services/localUserData'

export function useCloudBakcup() {
  const store = useStore()
  const filesInCloud = ref([])
  const filesInLocal = ref(null)
  const userId = ref(null)

  user.getUserData().then((userData) => {
    userId.value = userData.at(0).uuid
    cloud.getFiles(userId.value).then((cloudFiles) => {
      filesInCloud.value = cloudFiles
    })
  })

  local.getData().then((data) => {
    filesInLocal.value = data
  })

  const startRefetch = computed(() => store.getters.refetchCloudItems)

  watch(startRefetch, (value) => {
    if (value) {
      user.getUserData().then((userData) => {
        userId.value = userData.at(0).uuid
        cloud.getFiles(userId.value).then((cloudFiles) => {
          filesInCloud.value = cloudFiles
        })
      })
    
      local.getData().then((data) => {
        filesInLocal.value = data
      })

      store.commit("refetchCloudItems", false)
    }
  })

  return { filesInCloud, filesInLocal }
}