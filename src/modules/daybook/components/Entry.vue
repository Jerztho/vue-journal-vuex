<template>
  <div class="entry-container mb-3 pointer p-2" @click="$router.push({name:'entry', params:{id:10}})">
    <div class="entry-title d-flex">
        <span class="text-success f-5 fw-bold">15</span>
        <span class="mx-1 fs-5">Julio</span>
        <span class="mx-2 fw-light">2021, Jueves</span>
    </div>
    <div class="entry-description">
        Aute id commodo aliquip excepteur duis reprehenderit veniam labore pariatur consectetur. Consequat est incididunt eu culpa elit mollit dolore voluptate sunt Lorem tempor nulla fugiat voluptate. Aliqua labore ex ad non aliqua duis exercitation. Cupidatat laboris nisi nostrud anim. Culpa aute voluptate do veniam aliquip eu cillum enim Lorem pariatur minim fugiat.
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.entry-container{
    border-bottom: 1px solid #2c3e50;
    transition: 0.2s all ease-in;

    &:hover{
        background-color: lighten($color: grey, $amount: 45);
        transition: 0.2s all ease-in;
    }

    .entry-description{
        font-size: 12px;
    }
}
</style>