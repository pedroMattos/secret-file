import { ref } from 'vue'
import * as cloud from '@/models/services/cloud'
import * as local from '@/models/services/localFile'
import * as user from '@/models/services/localUserData'

export function useCloudBakcup() {
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

  return { filesInCloud, filesInLocal }
}