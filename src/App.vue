<template>
  <router-view />
  <!-- <router-view v-if="authStatus==='authenticated'"/> -->
</template>

<script>
import useAuth from "@/modules/auth/composables/useAuth"

export default({
  setup() {
    const { authStatus, checkAuthStatus } = useAuth()

    checkAuthStatus()

    return {
      authStatus
    }
  },
})
</script>
